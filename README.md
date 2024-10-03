# MyLink

![image](https://github.com/user-attachments/assets/b9271311-2257-404c-9e26-71bff310d5fd)


Welcome to **MyLink**, a LinkedIn-inspired social network for professionals. This project is a full-stack web application developed using **ASP.NET Core** for the backend and **React** for the frontend.

[Ηere](https://www.linkedin.com/posts/dimitrisrammos_csharp-dotnet-aspnetcore-activity-7246869870447869954-Apju?utm_source=share&utm_medium=member_desktop) is a short demo 𝐯𝐢𝐝𝐞𝐨 showcasing the app's functionalities.

---

## 🛠️ Technologies Used 

### Backend:
- **ASP.NET Core 8.0.401** (C#)
- **Entity Framework Core** for database access
- **SQL Server Management Studio** for the database
- **JWT Authentication** for securing API endpoints
- **Matrix Factorization Algorithm** for recommending jobs and posts

### Frontend:
- **React** (JavaScript library for building UI)
- **React Router** for client-side routing
- **HTML and CSS** for styling

### Other:
- **IIS Express** web server
- **SSL Certificate** with token in developer mode for HTTPS

---

## 📑 Features

- **User Authentication:** Users can sign up, log in, and authenticate via JWT.
- **Job Posting:** Users can view, create, and delete job postings.
- **Matrix Factorization:** Provides personalized job and post recommendations based on user preferences and activity.
- **Pagination:** Supports pagination for large datasets to reduce memory usage.
- **Professional Networking:** Users can connect, share posts, and interact with others in a professional setting.

---



## 🚀 Project Setup

### Clone the repository

To set up the project locally, first clone this repository:

```bash
git clone https://github.com/drammos/LinkedIn.git
cd MyLink
```

---

### Prerequisites
Make sure you have the following installed:

.NET Core SDK (8.0.401): Install .NET SDK
Node.js & npm: Install Node.js
SQL Server: Install SQL Server and SQL Server Management Studio (SSMS) for managing your database.

---

## 🔧 Backend Setup (ASP.NET Core)
1. Install .NET Dependencies
After cloning, navigate to the backend project directory:

```
cd LinkedIn/WebAppBackEnd
```

Then, restore the .NET dependencies using:

```
dotnet restore
```


2. Database Connection
Update the appsettings.json file to connect to your local SQL Server instance:

```
"ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=MyLinkDB;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```


3. Migrate the Database
Run the following commands to apply migrations and seed the database:

```
update-database
dotnet ef database update
```


4. Run the Backend
Start the backend server:

```
dotnet run
```

The API will be accessible at https://localhost:5001/ (or the IIS Express port if running from Visual Studio).

---

## 🎨 Frontend Setup (React)
1. Install npm dependencies
Navigate to the frontend directory:

bash
```
cd LinkedIn/MyLinkFrontEnd
```

Install the necessary packages:
```
npm install
```

2. Run the Frontend
To start the frontend development server, run:

```
npm start
```
The React app will be accessible at http://localhost:4173/.

---

## 🗄️ Database Setup (SQL Server)
1. Install SQL Server Management Studio (SSMS) if you haven't already.
2. Create a new database named MyLinkDB in SQL Server.
3. Make sure to update the connection string in the appsettings.json file in the backend project, as shown above, to point to your SQL Server instance.

Once the database is set up and migrations have been applied, your tables will be automatically created.

---

## 📊 Running the Application
Once both the backend and frontend are running:

1. Backend will be available at https://localhost:44329/ (IIS).
2. Frontend will be accessible at http://localhost:4173/.

Make sure both applications are running concurrently.

---

## 📜 API Documentation
The backend API provides several endpoints for interacting with the platform's functionality. You can access and explore the API documentation through Swagger once the backend is running:

```
https://localhost:44329/swagger/index.html
```

---

## ⚙️ Pagination with IQueryable
The project utilizes pagination with IQueryable in order to efficiently handle large datasets. Instead of fetching all records at once, only a subset of records, based on the page size and current page number, is fetched from the database, reducing memory usage and improving performance. This ensures that users interacting with large datasets (like 1,000,000+ posts or users) only load the necessary data.

For example, the backend code implements this with PagedList<T> as follows:


```csharp
public async Task<PagedList<UserDTO>> GetAllUsers([FromQuery] Params paginationParams)
{
    var users = _userManager.Users;

    var userListPaged = await PagedList<User>.ToPagedList(users, paginationParams.PageNumber, paginationParams.PageSize);
    List<UserDTO> userDTOList = new List<UserDTO>();

    foreach (var user in userListPaged)
    {
        UserDTO userDTO = _mapper.Map<UserDTO>(user);
        
        var listfromroles = await _userManager.GetRolesAsync(user);
        List<string> roles = new List<string>(listfromroles);
        userDTO.Role = roles[0];
        
        userDTOList.Add(userDTO);
    }

    var userDTOPaginationList = new PagedList<UserDTO>(userDTOList, userListPaged.Metadata.TotalCount, userListPaged.Metadata.CurrentPage, userListPaged.Metadata.PageSize);
    Response.AddPaginationHeader(userDTOPaginationList.Metadata);
    return userDTOPaginationList;
}

```

This approach ensures only the required data for each page is loaded from the database, improving application performance.

---

## 👤 Authors
[Rammos Dimitrios](https://github.com/drammos)

[Theodoros Minaidis](https://github.com/tminaidis9)

---

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
