using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Models;
using MyLink.Models.DTOS;
using MyLink.Data.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using MyLink.Services.JsonWebTokens;
using System.Drawing;
using MyLink.Models.Pagination;
using MyLink.Services.Pagination;
using AutoMapper;
using AutoMapper.Configuration.Annotations;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Token _token;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager, IUnitOfWork unitOfWork, Token token, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _token = token;
            _mapper = mapper;
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserDTO>> LoginUser(LoginUserDTO loginDTO)
        {
            User user = await _userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return Unauthorized();
            }
            var listfromroles = await _userManager.GetRolesAsync(user);
            List<string> roles = new List<string>(listfromroles);
            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PictureURL = user.PictureURL,
                Role = roles[0],
                CoverLetterURL = user.CoverLetterURL,
                WebPage = user.WebPage,
                Token = await _token.GenerateJSONWebToken(user)
            };
        }

        [HttpPost("RegisterUser")]
        public async Task<ActionResult<UserDTO>> RegisterUser([FromForm] RegisterUserDTO registerDTO)
        {
            User user = new User()
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                Email = registerDTO.Email,
                UserName = registerDTO.Username,
                PhoneNumber = registerDTO.PhoneNumber,
                PictureURL = registerDTO.PictureURL,
                Birthday = registerDTO.Birthday,
                CoverLetterURL = registerDTO.CoverLetterURL,
                WebPage = registerDTO.WebPage,
                IsAdmin = (registerDTO.Role == "Admin"),
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded == false)
            {
                foreach (var error in result.Errors)
                {
                    var str = error.ToString();
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }


            result = await _userManager.AddToRoleAsync(user, registerDTO.Role);
            if (result.Succeeded == false)
            {
                foreach (var error in result.Errors)
                {
                    var str = error.ToString();
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PictureURL = user.PictureURL,
                Role = registerDTO.Role,
                Birthday = registerDTO.Birthday,
                CoverLetterURL = registerDTO.CoverLetterURL,
                WebPage = registerDTO.WebPage,
            };
        }

        [HttpGet("GetUser")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
                return NotFound();

            return user;
        }

        [HttpGet("GetRoleForUser")]
        [Authorize]
        public async Task<ActionResult<string>> GetRoleForUser(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
                return NotFound();

            var listfromroles = await _userManager.GetRolesAsync(user);
            List<string> roles = new List<string>(listfromroles);

            return roles[0];
        }

        [HttpPut("UpdateUser")]
        public async Task<ActionResult<UserDTO>> UpdateUser([FromForm] UpdateUserDTO updateUserDTO)
        {
            User user = await _userManager.FindByNameAsync(updateUserDTO.Username);
            if (user == null)
                return NotFound();
            
            if (user == null || !await _userManager.CheckPasswordAsync(user, updateUserDTO.CurrentPassword))
            {
                return ValidationProblem("Wrong Current password");
            }
            
            if (user.Email != updateUserDTO.Email)
            {
                var userWithSameEmail = await _userManager.FindByEmailAsync(updateUserDTO.Email);
                if (userWithSameEmail != null && userWithSameEmail.Id != user.Id)
                {
                    return ValidationProblem("The email is already taken.");
                }
            }
            
            
            user.FirstName = updateUserDTO.FirstName;
            user.LastName = updateUserDTO.LastName;
            user.PhoneNumber = updateUserDTO.PhoneNumber;
            user.Email = updateUserDTO.Email;
            user.PictureURL = updateUserDTO.PictureURL;
            user.CoverLetterURL = updateUserDTO.CoverLetterURL;
            user.WebPage = updateUserDTO.WebPage;

            if (!string.IsNullOrEmpty(updateUserDTO.NewPassword))
            {
                var result = await _userManager.ChangePasswordAsync(user, updateUserDTO.CurrentPassword, updateUserDTO.NewPassword);
                if (result.Succeeded == false)
                {
                    foreach (var error in result.Errors)
                    {
                        var str = error.ToString();
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
            }

            var listfromroles = await _userManager.GetRolesAsync(user);
            List<string> roles = new List<string>(listfromroles);

            //Save the changes in DB
            _unitOfWork.Save();

            //Return the DTO
            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PictureURL = user.PictureURL,
                CoverLetterURL = user.CoverLetterURL,
                WebPage = user.WebPage,
                Role = roles[0]
            };
        }
        
        [HttpGet("GetCommunicationType")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<ResultDTO>> GetCommunicationType([FromQuery] string UserId1, [FromQuery] string UserId2)
        {
            // If is connected
            var isConnected = await IsConnectedUsers(UserId1, UserId2);
            if (isConnected.Value)
            {
                return new ResultDTO()
                {
                    Result = "Connected",
                    User1 = UserId1,
                    User2 = UserId2,
                };
            }
            
            // If the UserId1 have send request Οντως ο χρηστης 1 εχει στειλει να συνδεσθει στο 2
            var isPendingRequest = await IsPendingReqeuest(UserId1, UserId2);
            if(isPendingRequest.Value) {
                return new ResultDTO()
                {
                    Result = "Pending",
                    User1 = UserId1,
                    User2 = UserId2,
                };
            }
            
            // Ο χρηστης 1 εχει δεχθει αιτημα φιλιασ απο τον 2
            var isIncoming = await IsInComingRequest(UserId2, UserId1);
            if(isIncoming.Value) 
            {
                return new ResultDTO()
                {
                    Result = "InComing",
                    User1 = UserId1,
                    User2 = UserId2,
                };
            }
            
            // αλλιως δεν ειναι συνδεδεμενοι
            return new ResultDTO()
            {
                Result = "NotConnected",
                User1 = UserId1,
                User2 = UserId2,
            };
        }
        
        [HttpGet("IsConnectedUsers")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsConnectedUsers([FromQuery] string UserId1, [FromQuery] string UserId2)
        {
            List<User> list = await _unitOfWork.User.GetConnectedUsers(UserId1);
            if (list == null) return false;
            
            var user = list.FirstOrDefault(x => x.Id == UserId2);
            if(user == null) return false;

            return true;
        }

        [HttpGet("IsPendingRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsPendingReqeuest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            var list = await _unitOfWork.User.GetPendingRequestUsers(PendingUserId);
            if (list == null) return false;

            var user = list.FirstOrDefault(x => x.Id == RecipientUserId);
            if (user == null) return false;

            return true;
        }

        [HttpGet("IsInComingRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsInComingRequest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            var list = await _unitOfWork.User.GetInComingRequestUsers(RecipientUserId);
            if (list == null) return false;

            var user = list.FirstOrDefault(x => x.Id == PendingUserId);
            if (user == null) return false;

            return true;
        }

        [HttpPost("RequestToConnection")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult> RequestToConnection([FromQuery] string SenderUserId, [FromQuery] string RecipientUserId)
        {
            User senderUser = await _userManager.FindByIdAsync(SenderUserId);
            User recipientUser = await _userManager.FindByIdAsync(RecipientUserId);

            if (senderUser == null || recipientUser == null)
                return NotFound();

            senderUser.PendingRequestUsers.Add(recipientUser);
            recipientUser.InComingRequestUsers.Add(senderUser);

            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpPost("AcceptRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult> AcceptRequest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            var user = await _userManager.FindByIdAsync(RecipientUserId);
            var userNewConnection = await _userManager.FindByIdAsync(PendingUserId);
            if (user == null || userNewConnection == null)
                return NotFound();

            user.ConnectedUsers.Add(userNewConnection);
            userNewConnection.ConnectedUsers.Add(user);

            bool result = await _unitOfWork.User.DeleteRequest(PendingUserId, RecipientUserId);
            if (!result)
                return NotFound();

            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpDelete("DeleteRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult> DeleteRequest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            bool result = await _unitOfWork.User.DeleteRequest(PendingUserId, RecipientUserId);
            if (!result)
                return NotFound();
                
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpGet("GetListFromConnections")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<User>>> GetListFromConnections([FromQuery] string UserId)
        {
            return await _unitOfWork.User.GetConnectedUsers(UserId);
        }

        [HttpGet("GetListFromInComingRequests")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<User>>> GetListFromInComingRequests([FromQuery] string UserId)
        {
            return await _unitOfWork.User.GetInComingRequestUsers(UserId);
        }

        [HttpGet("GetListFromPendingRequests")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<User>>> GetListFromPendingRequests([FromQuery] string UserId)
        {
            return await _unitOfWork.User.GetPendingRequestUsers(UserId);
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<PagedList<UserDTO>> GetAllUsers([FromQuery] Params paginationParams)
        {
            var users = _userManager.Users;
            
            var userListPaged = await PagedList<User>.ToPagedList(users, paginationParams.PageNumber, paginationParams.PageSize);
            List<UserDTO> userDTOList = new List<UserDTO>();
            foreach (var user in userListPaged)
            {
                //Mapper the use to UserDTO
                UserDTO userDTO = _mapper.Map<UserDTO>(user);
                
                //Take the role
                var listfromroles = await _userManager.GetRolesAsync(user);
                List<string> roles = new List<string>(listfromroles);
                userDTO.Role = roles[0];
                
                //Add useDTO to list
                userDTOList.Add(userDTO);
            }
            var userDTOPaginationList = new PagedList<UserDTO>(userDTOList, userListPaged.Metadata.TotalCount, userListPaged.Metadata.CurrentPage, userListPaged.Metadata.PageSize);
            Response.AddPaginationHeader(userDTOPaginationList.Metadata);
            return userDTOPaginationList;
        }

        [HttpDelete("DeleteUser")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
                return NotFound();

            await _userManager.DeleteAsync(user);
            return StatusCode(200);
        }

        [HttpGet("SearchUsers")]
        [Authorize]
        public async Task<ActionResult<PagedList<UserDTO>>> SearchUsers([FromQuery] string SearchName, [FromQuery] Params paginationParams)
        {
            var users = _unitOfWork.User.SearchUsers(SearchName);
            
            var userListPaged = await PagedList<User>.ToPagedList(users, paginationParams.PageNumber, paginationParams.PageSize);
            List<UserDTO> userDTOList = new List<UserDTO>();
            foreach (var user in userListPaged)
            {
                //Mapper the use to UserDTO
                UserDTO userDTO = _mapper.Map<UserDTO>(user);
                
                //Take the role
                var listfromroles = await _userManager.GetRolesAsync(user);
                List<string> roles = new List<string>(listfromroles);
                userDTO.Role = roles[0];
                
                //Add useDTO to list
                userDTOList.Add(userDTO);
            }
            var userDTOPaginationList = new PagedList<UserDTO>(userDTOList, userListPaged.Metadata.TotalCount, userListPaged.Metadata.CurrentPage, userListPaged.Metadata.PageSize);
            Response.AddPaginationHeader(userDTOPaginationList.Metadata);
            return userDTOPaginationList;
        }

        [HttpPost("AddMessage")]
        [Authorize(Roles = "Professional")]
        public async Task<IActionResult> AddMessage([FromForm] CreateMessageDTO createMessageDTO)
        {
            User recipientUser = await _userManager.FindByNameAsync(createMessageDTO.RecipientUsername);
            if (recipientUser == null) return NotFound();
            Message message = new Message
            {
                UserId = recipientUser.Id,
                MessageBody = createMessageDTO.MessageBody,
                SenderUsername = createMessageDTO.SenderUsername,
                DateCreated = DateTime.Now,
            };
            
            // Add message
            _unitOfWork.Message.Add(message);
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpGet("GetMessage")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<MessageDTO>> GetMessage([FromQuery] int MessageId)
        {
            Message message = _unitOfWork.Message.GetMessageById(MessageId);
            User senderUser = await _userManager.FindByNameAsync(message.SenderUsername);
            MessageDTO messageDto = _mapper.Map<MessageDTO>(message);
            
            messageDto.SenderUsername = senderUser.UserName;
            messageDto.SenderUserId = senderUser.Id;
            messageDto.SenderPictureURL = senderUser.PictureURL;
            
            return messageDto;
        }

        [HttpGet("GetDiscussion")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<PagedList<ChatMessageDTO>>> GetDiscussion([FromQuery] ChatDTO chatDTO)
        {
            User myUser = await _userManager.FindByNameAsync(chatDTO.MyUsename);
            User interlocutorUser = await _userManager.FindByNameAsync(chatDTO.InterlocutorUsername);
            if(myUser == null || interlocutorUser == null) return NotFound();
            
            var messages = _unitOfWork.Message.GetDiscussion(myUser, interlocutorUser);
            var messagesListPaged = await PagedList<Message>.ToPagedList(messages, chatDTO.PageNumber, chatDTO.PageSize);
            List<ChatMessageDTO> messagesDTOList = new List<ChatMessageDTO>();
            foreach (var msg in messagesListPaged)
            {
                User owner = await _userManager.FindByNameAsync(msg.SenderUsername);
                ChatMessageDTO chatMessageDto = new ChatMessageDTO()
                {
                    OwnerId = owner.Id,
                    OwnerUsername = owner.UserName,
                    MessageBody = msg.MessageBody,
                    OwnerPictureURL = owner.PictureURL,
                };
                messagesDTOList.Add(chatMessageDto);
            }
            var messageDTOPaginationList = new PagedList<ChatMessageDTO>(messagesDTOList, messagesListPaged.Metadata.TotalCount, messagesListPaged.Metadata.CurrentPage, messagesListPaged.Metadata.PageSize);
            Response.AddPaginationHeader(messageDTOPaginationList.Metadata);
            return messageDTOPaginationList;
        }
        
        [HttpGet("GetDiscussionWithoutPagination")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<ChatMessageDTO>>> GetDiscussionWithoutPagination([FromQuery] ChatDTO chatDTO)
        {
            User myUser = await _userManager.FindByNameAsync(chatDTO.MyUsename);
            User interlocutorUser = await _userManager.FindByNameAsync(chatDTO.InterlocutorUsername);
            if(myUser == null || interlocutorUser == null) return NotFound();
            
            var messages = _unitOfWork.Message.GetDiscussion(myUser, interlocutorUser).ToList();
            List<ChatMessageDTO> messagesDTOList = new List<ChatMessageDTO>();
            foreach (var msg in messages)
            {
                User owner = await _userManager.FindByNameAsync(msg.SenderUsername);
                ChatMessageDTO chatMessageDto = new ChatMessageDTO()
                {
                    OwnerId = owner.Id,
                    OwnerUsername = owner.UserName,
                    MessageBody = msg.MessageBody,
                    OwnerPictureURL = owner.PictureURL,
                };
                messagesDTOList.Add(chatMessageDto);
            }
            return messagesDTOList;
        }

        [HttpGet("GetUserChats")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<ChatOutDTO>>> GetUserChats([FromQuery] string Username)
        {
            User myUser = await _userManager.FindByNameAsync(Username);
            if(myUser == null) return NotFound();

            var chats = _unitOfWork.Message.GetChats(myUser);
            return chats;
        }
        
        [HttpGet("GetUserConnectedChats")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<ChatOutDTO>>> GetUserConnectedChats([FromQuery] string Username)
        {
            User myUser = await _userManager.FindByNameAsync(Username);
            if(myUser == null) return NotFound();

            var chats = _unitOfWork.Message.GetChats(myUser);
            var connectedUsers = await _unitOfWork.User.GetConnectedUsers(myUser.Id);
            foreach (var user in connectedUsers)
            {
                //If the user don't exit
                if (!chats.Any(c => c.InterlocutorUsername == user.UserName))
                {
                    
                    var newChatOutDTO = new ChatOutDTO
                    {
                        InterlocutorUsername = user.UserName,
                        InterlocutorPictureURL = user.PictureURL,
                        InterlocutorFirstname = user.FirstName,
                        InterlocutorLastname = user.LastName,
                        InterlocutorUserId = user.Id,
                        LastMessage = ""
                    };

                    chats.Add(newChatOutDTO);
                }
            }
            return chats;
        }
        
        [HttpGet("GetUserNotifications")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<UserNotificationsDTO>>> GetUserNotifications([FromQuery] string Username)
        {
            User myUser = await _userManager.FindByNameAsync(Username);
            if(myUser == null) return NotFound();
            
            return await _unitOfWork.User.GetUsersNotificationsDtos(myUser);
        }
    }
}
