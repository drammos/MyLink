﻿using Microsoft.EntityFrameworkCore;
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN"},
                    new IdentityRole { Name = "Professional", NormalizedName = "PROFESSIONAL"}
                );
        }
    }
}