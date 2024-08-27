using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MyLink.Models;


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
               .HasMany(e => e.Posts)
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


            builder.Entity<Comment>()
                .HasOne(e => e.User)
                .WithMany(e => e.MyComments)
                .HasForeignKey(e => e.UserId)
                .IsRequired();

            builder.Entity<Reaction>()
                .HasOne(e => e.User)
                .WithMany(e => e.MyReactions)
                .HasForeignKey(e => e.UserId)
                .IsRequired();
        }
    }
}
