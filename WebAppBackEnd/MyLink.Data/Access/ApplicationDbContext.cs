using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MyLink.Models;
using System.Reflection.Emit;


namespace MyLink.Data.Access
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions): base(dbContextOptions)
        {

        }
        
        public DbSet<Message> Messages { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<ViewedPosts> ViewedPosts { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Reaction> Reaction { get; set; }
        public DbSet<ViewedJobs> ViewedJobs { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN"},
                    new IdentityRole { Name = "Professional", NormalizedName = "PROFESSIONAL"}
                );

            builder.Entity<User>()
               .HasMany(e => e.Educations)
               .WithOne(e => e.User)
               .HasForeignKey(e => e.UserId)
               .IsRequired();

            builder.Entity<User>()
               .HasMany(e => e.Experiences)
               .WithOne(e => e.User)
               .HasForeignKey(e => e.UserId)
               .IsRequired();

            builder.Entity<User>()
                .HasMany(e => e.ConnectedUsers)
                .WithMany()
                .UsingEntity(x => x.ToTable("UserConnections"));

            builder.Entity<User>()
                .HasMany(e => e.PendingRequestUsers)
                .WithMany()
                .UsingEntity(x => x.ToTable("UserPendingReqeusts"));

            builder.Entity<User>()
                .HasMany(e => e.InComingRequestUsers)
                .WithMany()
                .UsingEntity(x => x.ToTable("UserInComingRequests"));

            builder.Entity<User>()
                .HasMany(u => u.Messages)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            // Posts
            builder.Entity<User>()
               .HasMany(e => e.Posts)
               .WithOne(e => e.User)
               .HasForeignKey(e => e.UserId)
               .IsRequired();

            builder.Entity<Post>()
                .HasMany(e => e.Comments)
                .WithOne(e => e.Post)
                .HasForeignKey(e => e.PostId)
                .IsRequired();

            builder.Entity<Post>()
                .HasMany(e => e.Reactions)
                .WithOne(e => e.Post)
                .HasForeignKey(e => e.PostId)
                .IsRequired();

            // 1. Σχέση User -> PostedJobs (One-to-Many)
            builder.Entity<User>()
                .HasMany(u => u.PostedJobs)
                .WithOne(j => j.User)
                .HasForeignKey(j => j.UserId)
                .IsRequired();

            // 3. Σχέση Job -> JobApplications (One-to-Many)
            builder.Entity<Job>()
                .HasMany(j => j.JobApplications)
                .WithOne(ja => ja.Job)
                .HasForeignKey(ja => ja.JobId)
                .IsRequired();

            builder.Entity<JobApplication>()
                .HasOne(ja => ja.Job)
                .WithMany(j => j.JobApplications)
                .HasForeignKey(ja => ja.JobId);

            builder.Entity<Post>()
                .HasMany(u=> u.ViewedPosts)
                .WithOne(p => p.Post)
                .HasForeignKey(p => p.PostId);
            
            builder.Entity<Job>()
                .HasMany(u=> u.ViewedJobs)
                .WithOne(j => j.Job)
                .HasForeignKey(p => p.JobId);

        }
    }
}
