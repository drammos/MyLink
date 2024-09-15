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
                    Email = "jrammos@outlook.com.gr",
                    PictureURL = "rammos.com",
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
                    PictureURL = "minaidis.com",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(user2, "1234@Password");
                await users.AddToRoleAsync(user2, "Admin");

                User user3 = new User()
                {
                    FirstName = "Dimitris",
                    LastName = "Rammos",
                    PhoneNumber = "1234567890",
                    UserName = "drammos",
                    Email = "drammos@outlook.com.gr",
                    PictureURL = "rammos.com",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(user3, "1234@Password");
                await users.AddToRoleAsync(user3, "Professional");

                User user4 = new User()
                {
                    FirstName = "Dimitris",
                    LastName = "Rammos",
                    PhoneNumber = "1234567890",
                    UserName = "frammos",
                    Email = "frammos@outlook.com.gr",
                    PictureURL = "rammos.com",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(user4, "1234@Password");
                await users.AddToRoleAsync(user4, "Professional");

                User user5 = new User()
                {
                    FirstName = "Dimitris",
                    LastName = "Rammos",
                    PhoneNumber = "1234567890",
                    UserName = "prammos",
                    Email = "prammos@outlook.com.gr",
                    PictureURL = "rammos.com",
                    Birthday = "2001-06-12"
                };

                result = await users.CreateAsync(user5, "1234@Password");
                await users.AddToRoleAsync(user5, "Professional");


                for (int i = 1; i <= 20; i++)
                {
                    User newUser = new User
                    {
                        FirstName = "UserFirstName" + i,
                        LastName = "UserLastName" + i,
                        PhoneNumber = "123456789" + i,
                        UserName = "user" + i,
                        Email = "user" + i + "@example.com",
                        PictureURL = "", // Empty picture URL
                        Birthday = "2000-01-01"
                    };
                    await users.CreateAsync(newUser, "1234@Password");
                    await users.AddToRoleAsync(newUser, "Professional");
                }

                

                await db.SaveChangesAsync();
            }
        }
    }
}
