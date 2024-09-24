using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyLink.Data.Access;
using MyLink.Models;

namespace MyLink.Data.Initialize
{
    public class InitializerDb
    {
        public static async Task Initialize(ApplicationDbContext db, UserManager<User> users)
        {
            // Create Users
            if (!users.Users.Any())
            {
                //Test dimitris rammos user
                User user = new User()
                {
                    FirstName = "Dimitris",
                    LastName = "Rammos",
                    PhoneNumber = "1234567890",
                    UserName = "jrammos",
                    Email = "jrammos@outook.com.gr",
                    PictureURL = "https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png",
                    Birthday = "2001-06-12"
                };
                var result = await users.CreateAsync(user, "1234@Password");
                await users.AddToRoleAsync(user, "Admin");

                User user2 = new User()
                {
                    FirstName = "Teo",
                    LastName = "Minaidis",
                    PhoneNumber = "1234567890",
                    UserName = "tminaidis9",
                    Email = "teomin2001@gmail.com",
                    PictureURL = "https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(user2, "1234@Password");
                await users.AddToRoleAsync(user2, "Admin");

                User drammos = new User()
                {
                    FirstName = "Dimitris",
                    LastName = "Rammos",
                    PhoneNumber = "1234567890",
                    UserName = "drammos",
                    Email = "drammos@outlook.com.gr",
                    PictureURL = "https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(drammos, "1234@Password");
                await users.AddToRoleAsync(drammos, "Professional");

                User frammos = new User()
                {
                    FirstName = "Dimitris",
                    LastName = "Rammos",
                    PhoneNumber = "1234567890",
                    UserName = "frammos",
                    Email = "frammos@outlook.com.gr",
                    PictureURL = "https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(frammos, "1234@Password");
                await users.AddToRoleAsync(frammos, "Professional");

                User prammos = new User()
                {
                    FirstName = "Dimitris",
                    LastName = "Rammos",
                    PhoneNumber = "1234567890",
                    UserName = "prammos",
                    Email = "prammos@outlook.com.gr",
                    PictureURL = "https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(prammos, "1234@Password");
                await users.AddToRoleAsync(prammos, "Professional");
                
                frammos.ConnectedUsers.Add(prammos);
                prammos.ConnectedUsers.Add(frammos);

                // Σύνδεση prammos με drammos
                prammos.ConnectedUsers.Add(drammos); // drammos
                drammos.ConnectedUsers.Add(prammos);
                await db.SaveChangesAsync();
                // Αποθήκευση των αλλαγών
                // db.Users.Update(frammos);
                // db.Users.Update(prammos);
                // db.Users.Update(drammos);


                for (int i = 1; i <= 20; i++)
                {
                    User newUser = new User
                    {
                        FirstName = "UserFirstName" + i,
                        LastName = "UserLastName" + i,
                        PhoneNumber = "123456789" + i,
                        UserName = "user" + i,
                        Email = "user" + i + "@example.com",
                        PictureURL = "https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png",
                        Birthday = "2000-01-01"
                    };
                    await users.CreateAsync(newUser, "1234@Password");
                    await users.AddToRoleAsync(newUser, "Professional");
                }

                // Δημιουργία post από τον drammos
                var postByDrammos = new Post
                {
                    Title = "New Technologies in AI",
                    Content = "Exploring the latest advancements in artificial intelligence.",
                    CreatedAt = DateTime.Now,
                    UpdateAt = DateTime.Now.AddHours(2),
                    PictureUrls = new List<string> { "https://example.com/drammos_post_image.jpg" },
                    VideoUrls = new List<string>(),
                    VoiceUrls = new List<string>(),
                    ReactionsCount = 50,
                    CommentsCount = 1,
                    IsLikedByCurrentUser = false,
                    UserId = drammos.Id, // drammos
                    IsPublic = true
                };
                db.Posts.Add(postByDrammos);
                
                await db.SaveChangesAsync();

                // Δημιουργία comment από τον prammos στο post του drammos
                var commentByPrammos = new Comment
                {
                    Content = "Great insights! Looking forward to more updates on AI advancements.",
                    CreatedAt = DateTime.Now.AddMinutes(5),
                    PostId = postByDrammos.Id,
                    Username = prammos.UserName // prammos
                };
                postByDrammos.Comments.Add(commentByPrammos);
                postByDrammos.CommentsCount++;

                // Αποθήκευση του comment
                await db.SaveChangesAsync();
                
                
                // Add Educations
                var educations = new List<Education>
                {
                    new Education { School = "University of Athens", Degree = "Bachelor's", FieldOfStudy = "Computer Science", StartDate = new DateTime(2015, 9, 1), EndDate = new DateTime(2019, 6, 30), Grade = "8.5", Description = "Focused on software engineering and data structures", UserId = frammos.Id , IsPublic = true},
                    new Education { School = "Stanford University", Degree = "Master's", FieldOfStudy = "Artificial Intelligence", StartDate = new DateTime(2019, 9, 1), EndDate = new DateTime(2021, 6, 30), Grade = "3.9", Description = "Specialized in machine learning and natural language processing", UserId = frammos.Id , IsPublic = true},
                    new Education { School = "Coursera", Degree = "Certificate", FieldOfStudy = "Web Development", StartDate = new DateTime(2022, 1, 1), EndDate = new DateTime(2022, 3, 31), Grade = "Pass", Description = "Completed full-stack web development course", UserId = frammos.Id , IsPublic = true},
                    new Education { School = "MIT OpenCourseWare", Degree = "Online Course", FieldOfStudy = "Algorithms", StartDate = new DateTime(2022, 6, 1), EndDate = new DateTime(2022, 8, 31), Grade = "N/A", Description = "Self-paced study of advanced algorithms", UserId = frammos.Id , IsPublic = true},
                    new Education { School = "Google Developers Certification", Degree = "Professional Certificate", FieldOfStudy = "Android Development", StartDate = new DateTime(2023, 1, 1), EndDate = new DateTime(2023, 4, 30), Grade = "Pass", Description = "Certified Android developer", UserId = frammos.Id , IsPublic = true}
                };
                db.Educations.AddRange(educations);

                // Add Experiences
                var experiences = new List<Experience>
                {
                    new Experience { Title = "Software Engineer", EmploymentType = "Full-time", CompanyName = "TechCorp", Location = "Athens, Greece", LocationType = "On-site", StartDate = new DateTime(2019, 7, 1), EndDate = new DateTime(2021, 8, 31), CurrentJob = false, Description = "Developed and maintained web applications using .NET Core and Angular", UserId = frammos.Id , IsPublic = true},
                    new Experience { Title = "AI Research Assistant", EmploymentType = "Part-time", CompanyName = "Stanford AI Lab", Location = "Stanford, CA", LocationType = "On-site", StartDate = new DateTime(2020, 1, 1), EndDate = new DateTime(2021, 6, 30), CurrentJob = false, Description = "Assisted in natural language processing research projects", UserId = frammos.Id , IsPublic = true},
                    new Experience { Title = "Freelance Web Developer", EmploymentType = "Contract", CompanyName = "Self-employed", Location = "Remote", LocationType = "Remote", StartDate = new DateTime(2021, 9, 1), EndDate = new DateTime(2022, 12, 31), CurrentJob = false, Description = "Developed custom websites for small businesses", UserId = frammos.Id , IsPublic = true},
                    new Experience { Title = "Mobile App Developer", EmploymentType = "Full-time", CompanyName = "InnoTech Solutions", Location = "Berlin, Germany", LocationType = "Hybrid", StartDate = new DateTime(2023, 1, 1), EndDate = null, CurrentJob = true, Description = "Developing Android applications using Kotlin and Jetpack Compose", UserId = frammos.Id , IsPublic = true},
                    new Experience { Title = "Open Source Contributor", EmploymentType = "Volunteer", CompanyName = "Various Projects", Location = "Remote", LocationType = "Remote", StartDate = new DateTime(2020, 1, 1), EndDate = null, CurrentJob = true, Description = "Contributing to various open-source projects in free time", UserId = frammos.Id , IsPublic = true}
                };
                db.Experiences.AddRange(experiences);

                // Add Posts
                var posts = new List<Post>();
                for (int i = 1; i <= 15; i++)
                {
                    posts.Add(new Post
                    {
                        Title = $"My thoughts on technology trend #{i}",
                        Content = $"This is the content of post #{i}. It discusses various aspects of modern technology and its impact on society.",
                        CreatedAt = DateTime.Now.AddDays(-i * 7), // Each post is a week apart
                        UpdateAt = DateTime.Now.AddDays(-i * 7 + 2), // Updated 2 days after creation
                        PictureUrls = new List<string> { $"https://example.com/image{i}.jpg" },
                        VideoUrls = new List<string>(),
                        VoiceUrls = new List<string>(),
                        ReactionsCount = i * 10, // Just for variation
                        CommentsCount = i * 2,
                        IsLikedByCurrentUser = i % 2 == 0, // Alternating true/false
                        UserId = frammos.Id,
                        IsPublic = true
                    });
                }
                db.Posts.AddRange(posts);
                

                await db.SaveChangesAsync();
            }
        }
    }
}
