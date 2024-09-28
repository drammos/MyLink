using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Writers;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Identity;
using MyLink.Models;
using MathNet.Numerics.LinearAlgebra;
using MyLink.Data.Repository.IRepository;

namespace MyLink.Services.MatrixFactorization
{
    public class MatrixFactorizationAlgorithm
    {
        private readonly IServiceProvider _serviceProvider;
        private Matrix<double>? PostsDataMatrix;
        
        public MatrixFactorizationAlgorithm(IServiceProvider service)
        {
            _serviceProvider = service;
        }

        public void CalculateForJobs()
        {
            
        }
        public void CalculateForPosts()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var _unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                List<User> users =_userManager.Users.ToList();
                List<Post> posts = _unitOfWork.Post.GetAll().ToList();
                PostsDataMatrix = Matrix<double>.Build.Dense(users.Count, posts.Count);

                foreach (var usr in users)
                {
                    
                    List<Comment> comments = _unitOfWork.Comment.GetAll(c => c.Username == usr.UserName).ToList();
                    List<Reaction> reactions = _unitOfWork.Reaction.GetAll(r => r. ).ToList();
                    List<ViewedPosts> viewedPosts = _unitOfWork.ViewedPosts.GetAll().ToList();
                }
            }
        }
    }
}