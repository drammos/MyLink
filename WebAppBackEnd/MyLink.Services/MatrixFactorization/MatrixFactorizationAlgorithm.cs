﻿using Microsoft.Extensions.DependencyInjection;
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
        
        // For posts
        private Matrix<double>? PostsDataMatrix;
        private Matrix<double>? PostsProposedMatrix;
        
        // For jobs
        private Matrix<double>? JobsDataMatrix;
        private Matrix<double>? JobsProposedMatrix;
        
        public MatrixFactorizationAlgorithm(IServiceProvider service)
        {
            _serviceProvider = service;
        }

        public void CalculateForJobs()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                int userPoint = 0;
                var _unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                List<User> users = _userManager.Users.ToList();
                List<Job> jobs = _unitOfWork.Job.GetAll().ToList();
                JobsDataMatrix = Matrix<double>.Build.Dense(users.Count, jobs.Count);

                foreach (var usr in users)
                {
                    List<ViewedJobs> viewedJobs = _unitOfWork.ViewedJobs.GetAll().Where(vj => vj.Username == usr.UserName).ToList();
                    List<JobApplication> jobApplications = _unitOfWork.JobApplications.GetAll().Where(vj => vj.Username == usr.UserName).ToList();
                    // calculate for clicks
                    foreach (var viewedJob in viewedJobs)
                    {
                        int jobIndex = jobs.FindIndex(j => j.Id == viewedJob.JobId);
                        double val = JobsDataMatrix[userPoint, jobIndex] + 1;
                        JobsDataMatrix[userPoint, jobIndex] = val;
                    }
                    
                    // calculate for applied in jobs, for every applied job I add 2 points
                    foreach (var jobApplication in jobApplications)
                    {
                        int jobIndex = jobs.FindIndex(j => j.Id == jobApplication.JobId);
                        double val = JobsDataMatrix[userPoint, jobIndex] + 2;
                        JobsDataMatrix[userPoint, jobIndex] = val;
                    }
                    
                    userPoint++;
                }
                
                int num = 3;
                List<double> list_tables = new List<double> { 0.01, 0.001, 0.0001, 0.00001 };
                double min_error = 999999;
                double best_h = 0.01;
                var rand = new System.Random();
                Matrix<double> best_matrix = null;
                
                foreach (double table in list_tables)
                {
                    var random = new Random();
                    var V = Matrix<double>.Build.Dense(
                        JobsDataMatrix.RowCount, 
                        num, 
                        (i, j) => random.NextDouble() * 4 + 1
                    );
                    
                    var F = Matrix<double>.Build.Dense(
                        num, 
                        JobsDataMatrix.ColumnCount, 
                        (i, j) => random.NextDouble() * 4 + 1
                    );

                    var tuple = Algorithm(JobsDataMatrix, V, F, num, table);
                    var error = tuple.Item2;

                    if (error < min_error)
                    {
                        min_error = error;
                        best_h = table;
                        best_matrix = tuple.Item1;
                    }
                }
                
                JobsProposedMatrix = best_matrix;
                Console.WriteLine("All it's gooddddddddddddddddddddddddd FOR JOBS");
            }
        }
        public void CalculateForPosts()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                int userPoint = 0;
                var _unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                List<User> users =_userManager.Users.ToList();
                List<Post> posts = _unitOfWork.Post.GetAll().ToList();
                PostsDataMatrix = Matrix<double>.Build.Dense(users.Count, posts.Count);

                foreach (var usr in users)
                {
                    
                    List<Comment> comments = _unitOfWork.Comment.GetAll(c => c.Username == usr.UserName).ToList();
                    List<Reaction> reactions = _unitOfWork.Reaction.GetAll(r => r.Username == usr.UserName ).ToList();
                    List<ViewedPosts> viewedPosts = _unitOfWork.ViewedPosts.GetAll(vp => vp.Username == usr.UserName).ToList();
                    
                    // For every viewPost(clicked it) I add 1 point for it
                    foreach (var viewPost in viewedPosts)
                    {
                        int postIndex = posts.FindIndex(p => p.Id == viewPost.PostId);
                        double val = PostsDataMatrix[userPoint, postIndex] + 1;
                        PostsDataMatrix[userPoint, postIndex] = val;
                    }
                    
                    // For every Comment I add 2 points for it
                    foreach (var comment in comments)
                    {
                        int postIndex = posts.FindIndex(p => p.Id == comment.PostId);
                        double val = PostsDataMatrix[userPoint, postIndex] + 2;
                        PostsDataMatrix[userPoint, postIndex] = val;
                    }
                    
                    // For every Reaction I add 1 point for it
                    foreach (var reaction in reactions)
                    {
                        int postIndex = posts.FindIndex(r => r.Id == reaction.PostId);
                        double val = PostsDataMatrix[userPoint, postIndex] + 1;
                        PostsDataMatrix[userPoint, postIndex] = val;
                        
                    }
                    
                    userPoint++;
                }

                int num = 3;
                List<double> list_tables = new List<double> { 0.01, 0.001, 0.0001, 0.00001 };
                double min_error = 999999;
                double best_h = 0.01;
                var rand = new System.Random();
                Matrix<double> best_matrix = null;
                
                foreach (double table in list_tables)
                {
                    var random = new Random();
                    var V = Matrix<double>.Build.Dense(
                        PostsDataMatrix.RowCount, 
                        num, 
                        (i, j) => random.NextDouble() * 4 + 1
                        );
                    
                    var F = Matrix<double>.Build.Dense(
                        num, 
                        PostsDataMatrix.ColumnCount, 
                        (i, j) => random.NextDouble() * 4 + 1
                        );

                    var tuple = Algorithm(PostsDataMatrix, V, F, num, table);
                    var error = tuple.Item2;

                    if (error < min_error)
                    {
                        min_error = error;
                        best_h = table;
                        best_matrix = tuple.Item1;
                    }
                }
                
                PostsProposedMatrix = best_matrix;
                Console.WriteLine("All it's gooddddddddddddddddddddddddd FOR POSTS");
            }
        }
        
        private Tuple<Matrix<double>, double> Algorithm(Matrix<double> dataMatrix, Matrix<double> V, Matrix<double> F, int k, double h)
        {
            int max_iters = 1000;
            double err = 999999;
            double prev_err;
            double x_;

            for (int iter = 0; iter <= max_iters; iter++)
            {
                for (int i = 0; i < dataMatrix.RowCount; i++)
                {
                    for (int j = 0; j < dataMatrix.ColumnCount; j++)
                    {
                        if (dataMatrix[i, j] > 0)
                        {
                            x_ = 0;

                            for (int n = 0; n < k; n++)
                            {
                                x_ += V[i, n] * F[n, j];
                            }

                            double e = dataMatrix[i, j] - x_;

                            for (int n = 0; n < k; n++)
                            {
                                V[i, n] = V[i, n] + h * 2 * e * F[n, j];
                                F[n, j] = F[n, j] + h * 2 * e * V[i, n];
                            }
                        }
                    }
                }

                prev_err = err;
                err = 0;

                for (int i = 0; i < dataMatrix.RowCount; i++)
                {
                    for (int j = 0; j < dataMatrix.ColumnCount; j++)
                    {
                        if (dataMatrix[i, j] > 0)
                        {
                            x_ = 0;

                            for (int n = 0; n < k; n++)
                            {
                                x_ += V[i, n] * F[n, j];
                            }

                            err += Math.Pow(dataMatrix[i, j] - x_, 2);
                        }
                    }
                }

                if (prev_err <= err)
                {
                    Console.WriteLine("Iter: " + iter);
                    break;
                }
            }

            Matrix<double> recommendationsMatrix = V.Multiply(F);
            return Tuple.Create(recommendationsMatrix, err);
        }

        public async Task<List<Post>> GetProposedPosts(string userId)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                int userPoint = 0;
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var _unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                List<User> users = _userManager.Users.ToList();
                List<Post> posts =  await _unitOfWork.Post.GetAllPosts();

                foreach (var usr in users)
                {
                    if (userId == usr.Id) break;
                    userPoint++;
                }
                Dictionary<int, double> postDictionary = new Dictionary<int, double>();
                for (int i = 0; i < PostsProposedMatrix.ColumnCount; i++)
                {
                    if(PostsProposedMatrix[userPoint, i]!=0) postDictionary[i] = PostsDataMatrix[userPoint, i];
                }
                
                // For the Deletet Posts
                var sorted = postDictionary.OrderByDescending(p => p.Value);
                List<Post> sortedPosts = new List<Post>();
                foreach (var p in sorted)
                {
                    if (p.Key >= 0 && p.Key < posts.Count && posts[p.Key] != null)
                    {
                        sortedPosts.Add(posts[p.Key]);
                    }
                }
                // List<Post> sortedPosts = sorted.Select(p => posts[p.Key]).ToList();
                Console.WriteLine(string.Join(",   ", sortedPosts));
                
                // Check the new post where in algorithm not exist
                User currentUser = await _userManager.FindByIdAsync(userId);
                var allPosts = await _unitOfWork.Post.GetPostsForMatrix(currentUser);
                foreach (var post in allPosts)
                {
                    if (!sortedPosts.Any(sp => sp.Id == post.Id))
                    {
                        sortedPosts.Add(post);
                    }
                }
                
                return sortedPosts;
            }
        }

        public async  Task<List<Job>> GetProposedJobs(string userId)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                int userPoint = 0;
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var _unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                List<User> users = _userManager.Users.ToList();
                List<Job> jobs = await _unitOfWork.Job.LoadAllJobs();
                
                foreach (var usr in users)
                {
                    if (userId == usr.Id) break;
                    userPoint++;
                }
                Dictionary<int, double> jobsDictionary = new Dictionary<int, double>();
                for (int i = 0; i < JobsProposedMatrix.ColumnCount; i++)
                {
                    if(JobsProposedMatrix[userPoint, i]!=0) jobsDictionary[i] = JobsDataMatrix[userPoint, i];
                }

                var sorted = jobsDictionary.OrderByDescending(p => p.Value);
                List<Job> sortedJobs = new List<Job>();
                foreach (var j in sorted)
                {
                    if (j.Key >= 0 && j.Key < jobs.Count && jobs[j.Key] != null)
                    {
                        sortedJobs.Add(jobs[j.Key]);
                    }
                }
                
                List<Job> newSortedjobslist = new List<Job>();
                foreach(var job in sortedJobs){
                    if (job.IsActive && job.UserId != userId)
                    {
                        newSortedjobslist.Add(job);
                    }
                }
                
                // Check the new post where in algorithm not exist
                var allJobs = await _unitOfWork.Job.GetJobsForMatrix(userId);
                foreach (var job in allJobs)
                {
                    if (!sortedJobs.Any(sj => sj.Id == job.Id))
                    {
                        sortedJobs.Add(job);
                    }
                }
                Console.WriteLine(string.Join(",   ", newSortedjobslist));
                return newSortedjobslist;
            }
        }
    }
}