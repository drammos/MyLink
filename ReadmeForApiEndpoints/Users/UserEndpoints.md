# Users Controller

Set the Url from Api:
For example the BackEnd Api url is: http://localhost:5175


## Login
**Post**
`/Users/LoginUser`
The Request is **application/json**

**Request**
```
{
  "username": "string",
  "password": "string"
}
```

**Response**
The Response is **application/json**
```
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "phoneNumber": "string",
  "pictureURL": "string",
  "email": "string",
  "role": "string",
  "token": "string"
}
```


**For example**

***First Example***

*If Request is*
```
{
  "username": "jrammos",
  "password": "1234@Password"
}
```
*The Response is*
```
{
  "id": "56bf253f-382a-4d10-8c54-dc32cc534b88",
  "firstName": "Dimitris",
  "lastName": "Rammos",
  "username": "jrammos",
  "phoneNumber": "1234567890",
  "pictureURL": "rammos.com",
  "email": "jrammos@outlook.com.gr",
  "role": "Admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoianJhbW1vcyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImpyYW1tb3NAb3V0bG9vay5jb20uZ3IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcyNDQyMzk0Nn0.8aH4yDN1akc4PpWANfubd5YCrp5KyToqgj8JO2WCMC8"
}
```
The token expired after 24Hours


***Second Example***

*If Request is*
```
{
  "username": "jr",
  "password": "1234@Password"
}
```

*The Response is*
```
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.2",
    "title": "Unauthorized",
    "status": 401,
    "traceId": "00-d877863164c8ba194d50538d0acf56d7-c0ce818fdb88e49c-00"
}
```



## Register
**Post** 
`/Users/RegisterUser`


**Request**
The Request is **multipart/form-data**

![alt text](image-1.png)

**Response**
The Response is **application/json**
```
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "phoneNumber": "string",
  "pictureURL": "string",
  "email": "string",
  "role": "string"
}
```



**For example**

***First Example***

*If Request is*

![alt text](image.png)

*The Response is*

```
{
    "id": "4a4b1ff2-2f9b-49ba-8657-f0ed3fa13493",
    "firstName": "Thodoris",
    "lastName": "Minaiidis",
    "username": "tmina",
    "phoneNumber": "12324141441",
    "pictureURL": null,
    "email": "tmina@gmail.com",
    "role": "Admin"
}
```

***Second Example***
For different username, wrong password

*If Request is*
![alt text](image-2.png)

*The Response is*
```
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
        "PasswordTooShort": [
            "Passwords must be at least 6 characters."
        ],
        "PasswordRequiresLower": [
            "Passwords must have at least one lowercase ('a'-'z')."
        ],
        "PasswordRequiresUpper": [
            "Passwords must have at least one uppercase ('A'-'Z')."
        ],
        "PasswordRequiresNonAlphanumeric": [
            "Passwords must have at least one non alphanumeric character."
        ]
    },
    "traceId": "00-23c9019cd067802b455a119d16e46a6a-b46e8946f232a6a8-00"
}
```

## Get User
**Get** 
`/Users/GetUser`


**Request**
The Request is **Query Params**

![alt text](image-3.png)

**Response**
The Response is **application/json**
```
{
  "id": "string",
  "userName": "string",
  "normalizedUserName": "string",
  "email": "string",
  "normalizedEmail": "string",
  "emailConfirmed": true,
  "passwordHash": "string",
  "securityStamp": "string",
  "concurrencyStamp": "string",
  "phoneNumber": "string",
  "phoneNumberConfirmed": true,
  "twoFactorEnabled": true,
  "lockoutEnd": "2024-08-11T08:28:44.077Z",
  "lockoutEnabled": true,
  "accessFailedCount": 0,
  "firstName": "string",
  "lastName": "string",
  "pictureURL": "string"
}
```

**For example**

***First Example***

*If Request is*

![alt text](image-4.png)

*The Response is*

```
{
    "firstName": "Dimitris",
    "lastName": "Rammos",
    "pictureURL": null,
    "id": "e3ac8dd0-1c5e-45e7-a7dd-61c75e5045d4",
    "userName": "jrammos",
    "normalizedUserName": "JRAMMOS",
    "email": "jrammos@outlook.com.gr",
    "normalizedEmail": "JRAMMOS@OUTLOOK.COM.GR",
    "emailConfirmed": false,
    "passwordHash": "AQAAAAIAAYagAAAAEHxNO99M5DSar6Afwhr/mPhGPEc02XnHBVZNbDoWzCM722T9/FtR/xTnAXknb9IgqA==",
    "securityStamp": "UF2BLBPJIBSTCL6CIGSYAUYFYHLSULZQ",
    "concurrencyStamp": "63096f68-a4a3-40ef-b98a-30d10f3d8772",
    "phoneNumber": "1234567890",
    "phoneNumberConfirmed": false,
    "twoFactorEnabled": false,
    "lockoutEnd": null,
    "lockoutEnabled": true,
    "accessFailedCount": 0
}
```

***Second Example***

*If Request is*

![alt text](image-5.png)

*The Response is*

```
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-35ea4f8543ca2463f0392813e321dcfa-2e8cefdba37079dc-00"
}
```

## Get Role For User
**Get** 
`/Users/GetRoleForUser`

**Request**
The Request is **Query Params**

![alt text](image-6.png)

**Response**
The Response is **application/json**
```
"string"
```

**For example**

***First Example***

*If Request is*

![alt text](image-8.png)

*The Response is*

```
Admin
```

***Second Example***

*If Request is*

![alt text](image-7.png)

*The Response is*

```
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-a35f23690812a0aa6110082a5083617b-1e9c7c96c092f8a8-00"
}
```

## Update The User details
**Put** 
`/Users/UpdateUser`


**Request**
The Request is **multipart/form-data**
![alt text](image-9.png)

**Response**
The Response is **application/json**
```
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "phoneNumber": "string",
  "pictureURL": "string",
  "email": "string",
  "role": "string"
}
```


## Get all Users
**Get** 
`/Users/GetAllUsers`

**Request**
No Parameters

**Response**
The Response is **application/json**
```
[
  {
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2024-08-11T08:59:20.922Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0,
    "firstName": "string",
    "lastName": "string",
    "pictureURL": "string"
  }
]
```

**For example**

***First Example***

*If Request is*

No Parameters

*The Response is*

```
[
    {
        "firstName": "Thodoris",
        "lastName": "Minaiidis",
        "pictureURL": null,
        "id": "361a7d3b-8352-40c0-8808-dedc1843e9ca",
        "userName": "tmina",
        "normalizedUserName": "TMINA",
        "email": "t@gmail.com",
        "normalizedEmail": "T@GMAIL.COM",
        "emailConfirmed": false,
        "passwordHash": "AQAAAAIAAYagAAAAEJyUfrtKSxRjhmt1+tVfWly2ERJn4JzJMv2OKtiG+oZE1E4Zpr9z5CyjSyfeVM/IsQ==",
        "securityStamp": "7SNQOMKULSHW7TWC7RTHXRTT3WEI3EOR",
        "concurrencyStamp": "fd945f5e-1cea-4e17-9248-aa4b1a412932",
        "phoneNumber": "12324141441",
        "phoneNumberConfirmed": false,
        "twoFactorEnabled": false,
        "lockoutEnd": null,
        "lockoutEnabled": true,
        "accessFailedCount": 0
    },
    {
        "firstName": "Dimitris",
        "lastName": "Rammos",
        "pictureURL": null,
        "id": "76555ae0-df5f-49ff-a748-2285bbf076a2",
        "userName": "jrammos",
        "normalizedUserName": "JRAMMOS",
        "email": "jrammos@outlook.com.gr",
        "normalizedEmail": "JRAMMOS@OUTLOOK.COM.GR",
        "emailConfirmed": false,
        "passwordHash": "AQAAAAIAAYagAAAAEGF6c17r7vNLbivv2KrETi0ZVes/F+tU2LJXHCDIDA6n59+bACp37nho7KSZCkyvRg==",
        "securityStamp": "YCJ7MOSDAIW3LXNY2YSL32DTOT6Z26PD",
        "concurrencyStamp": "d8517f6e-9d26-4493-832f-7fd67bcdd671",
        "phoneNumber": "1234567890",
        "phoneNumberConfirmed": false,
        "twoFactorEnabled": false,
        "lockoutEnd": null,
        "lockoutEnabled": true,
        "accessFailedCount": 0
    }
]
```

## Add Education
**Post** 
`/Users/AddEducation`

**Request**
The Request is **multipart/form-data**
![alt text](image-17.png)

**Response**
The Response is **application/json**
![alt text](image-18.png)

**For example**

***First Example***

*If Request is*

![alt text](image-10.png)

*The Response is*

![alt text](image-11.png)


***Second Example -- Wrong username***

*If Request is*

![alt text](image-12.png)

*The Response is*

![alt text](image-13.png)



## Get Educations
**Get** 
`/Users/GetEducations`

**Request**
The Request is **Query Params**
![alt text](image-19.png)

**Response**
The Response is **application/json**
```
[
  {
    "id": 0,
    "school": "string",
    "degree": "string",
    "fieldOfStudy": "string",
    "startDate": "string",
    "endDate": "string",
    "grade": "string",
    "description": "string",
    "userId": "string",
    "user": {
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2024-08-19T08:43:31.052Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0,
      "firstName": "string",
      "lastName": "string",
      "pictureURL": "string",
      "educations": [
        "string"
      ]
    }
  }
]
```

**For example**

***First Example***

*If Request is*
![alt text](image-16.png)

*The Response is*

```
[
  {
    "id": 3004,
    "school": "DIT",
    "degree": null,
    "fieldOfStudy": null,
    "startDate": null,
    "endDate": null,
    "grade": null,
    "description": null,
    "userId": "f3261fee-36c8-4034-a16d-c796f491a9c5",
    "user": {
      "firstName": "Dimitris",
      "lastName": "Rammos",
      "pictureURL": "rammos.com",
      "educations": [
        null,
        {
          "id": 3005,
          "school": "MIT comptuter",
          "degree": null,
          "fieldOfStudy": null,
          "startDate": "19/8/2019",
          "endDate": "19/8/2024",
          "grade": "9.5",
          "description": "My desc",
          "userId": "f3261fee-36c8-4034-a16d-c796f491a9c5",
          "user": null
        }
      ],
      "id": "f3261fee-36c8-4034-a16d-c796f491a9c5",
      "userName": "jrammos",
      "normalizedUserName": "JRAMMOS",
      "email": "jrammos@outlook.com.gr",
      "normalizedEmail": "JRAMMOS@OUTLOOK.COM.GR",
      "emailConfirmed": false,
      "passwordHash": "AQAAAAIAAYagAAAAENSu1TceuHc/WaKFwzIcVZGS4/A2gCWJWp/T91d8D2553SCDxlk1oFhCB4T+NmQvZw==",
      "securityStamp": "GELZKA5H5YLSBNP5Z3744D2DCQBAWALE",
      "concurrencyStamp": "89f11a15-2ed3-41ae-98ed-faf85e78e929",
      "phoneNumber": "1234567890",
      "phoneNumberConfirmed": false,
      "twoFactorEnabled": false,
      "lockoutEnd": null,
      "lockoutEnabled": true,
      "accessFailedCount": 0
    }
  },
  {
    "id": 3005,
    "school": "MIT comptuter",
    "degree": null,
    "fieldOfStudy": null,
    "startDate": "19/8/2019",
    "endDate": "19/8/2024",
    "grade": "9.5",
    "description": "My desc",
    "userId": "f3261fee-36c8-4034-a16d-c796f491a9c5",
    "user": {
      "firstName": "Dimitris",
      "lastName": "Rammos",
      "pictureURL": "rammos.com",
      "educations": [
        {
          "id": 3004,
          "school": "DIT",
          "degree": null,
          "fieldOfStudy": null,
          "startDate": null,
          "endDate": null,
          "grade": null,
          "description": null,
          "userId": "f3261fee-36c8-4034-a16d-c796f491a9c5",
          "user": null
        },
        null
      ],
      "id": "f3261fee-36c8-4034-a16d-c796f491a9c5",
      "userName": "jrammos",
      "normalizedUserName": "JRAMMOS",
      "email": "jrammos@outlook.com.gr",
      "normalizedEmail": "JRAMMOS@OUTLOOK.COM.GR",
      "emailConfirmed": false,
      "passwordHash": "AQAAAAIAAYagAAAAENSu1TceuHc/WaKFwzIcVZGS4/A2gCWJWp/T91d8D2553SCDxlk1oFhCB4T+NmQvZw==",
      "securityStamp": "GELZKA5H5YLSBNP5Z3744D2DCQBAWALE",
      "concurrencyStamp": "89f11a15-2ed3-41ae-98ed-faf85e78e929",
      "phoneNumber": "1234567890",
      "phoneNumberConfirmed": false,
      "twoFactorEnabled": false,
      "lockoutEnd": null,
      "lockoutEnabled": true,
      "accessFailedCount": 0
    }
  }
]
```

***Second Example -- Wrong username***

*If Request is*
![alt text](image-14.png)

*The Response is*

![alt text](image-15.png)


## Edit Education
**Put** 
`/Users/EditEducation`


**Request**
The Request is **multipart/form-data**
![alt text](image-24.png)

**Response**
The Response is **application/json**
```
{
  "id": 0,
  "school": "string",
  "degree": "string",
  "fieldOfStudy": "string",
  "startDate": "string",
  "endDate": "string",
  "grade": "string",
  "description": "string",
  "userId": "string",
  "user": {
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2024-08-21T08:46:31.195Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0,
    "firstName": "string",
    "lastName": "string",
    "pictureURL": "string",
    "educations": [
      "string"
    ],
    "experiences": [
      {
        "id": 0,
        "title": "string",
        "employmentType": "string",
        "companyName": "string",
        "location": "string",
        "locationType": "string",
        "startDate": "2024-08-21T08:46:31.195Z",
        "endDate": "2024-08-21T08:46:31.195Z",
        "currentJob": true,
        "description": "string",
        "userId": "string",
        "user": "string"
      }
    ]
  }
}
```

**For example**

***First Example***

*If Request is*


*The Response is*

```
```

## Delete Education
**Delete** 
`/Users/DeleteEducation`


**Request**
The Request is **multipart/form-data**
![alt text](image-25.png)

**Response**
The Response is **application/json**
![alt text](image-26.png)


**For example**

***First Example***

*If Request is*


*The Response is*

```
```




## Add Experience
**Post** 
`/Users/AddExperience`

**Request**
The Request is **multipart/form-data**
![alt text](image-23.png)

**Response**
The Response is **application/json**
```
{
  "id": 0,
  "title": "string",
  "employmentType": "string",
  "companyName": "string",
  "location": "string",
  "locationType": "string",
  "startDate": "2024-08-21T08:41:54.527Z",
  "endDate": "2024-08-21T08:41:54.527Z",
  "currentJob": true,
  "description": "string",
  "userId": "string",
  "user": {
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2024-08-21T08:41:54.527Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0,
    "firstName": "string",
    "lastName": "string",
    "pictureURL": "string",
    "educations": [
      {
        "id": 0,
        "school": "string",
        "degree": "string",
        "fieldOfStudy": "string",
        "startDate": "string",
        "endDate": "string",
        "grade": "string",
        "description": "string",
        "userId": "string",
        "user": "string"
      }
    ],
    "experiences": [
      "string"
    ]
  }
}
```

**For example**

***First Example***

*If Request is*

![alt text](image-20.png)

*The Response is*

```
{
  "id": 2,
  "title": "Engineer",
  "employmentType": null,
  "companyName": "Entersoft",
  "location": null,
  "locationType": null,
  "startDate": "2024-09-21T00:00:00",
  "endDate": null,
  "currentJob": true,
  "description": null,
  "userId": "7a29e650-b614-483c-85d1-4f7473a890b0",
  "user": {
    "firstName": "Dimitris",
    "lastName": "Rammos",
    "pictureURL": "rammos.com",
    "educations": [],
    "experiences": [
      null
    ],
    "id": "7a29e650-b614-483c-85d1-4f7473a890b0",
    "userName": "jrammos",
    "normalizedUserName": "JRAMMOS",
    "email": "jrammos@outlook.com.gr",
    "normalizedEmail": "JRAMMOS@OUTLOOK.COM.GR",
    "emailConfirmed": false,
    "passwordHash": "AQAAAAIAAYagAAAAEGm3K4+tQbfQmB2lct5xIpZsvLywueNuNUY+pqUbI5sTzgex7xOjDBxMMM50acjc+w==",
    "securityStamp": "UQLSWPBA7CU3IC4FKMKGONI2J77MUYCE",
    "concurrencyStamp": "ec5ea5ca-6c6e-438e-a3a8-80b2b3043acd",
    "phoneNumber": "1234567890",
    "phoneNumberConfirmed": false,
    "twoFactorEnabled": false,
    "lockoutEnd": null,
    "lockoutEnabled": true,
    "accessFailedCount": 0
  }
}
Response headers
```


## Get Educations
**Get** 
`/Users/GetEducations`

**Request**
The Request is **Query Params**
![alt text](image-21.png)

**Response**
The Response is **application/json**
```
[
  {
    "id": 0,
    "title": "string",
    "employmentType": "string",
    "companyName": "string",
    "location": "string",
    "locationType": "string",
    "startDate": "2024-08-21T08:11:19.793Z",
    "endDate": "2024-08-21T08:11:19.793Z",
    "currentJob": true,
    "description": "string",
    "userId": "string",
    "user": {
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2024-08-21T08:11:19.793Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0,
      "firstName": "string",
      "lastName": "string",
      "pictureURL": "string",
      "educations": [
        {
          "id": 0,
          "school": "string",
          "degree": "string",
          "fieldOfStudy": "string",
          "startDate": "string",
          "endDate": "string",
          "grade": "string",
          "description": "string",
          "userId": "string",
          "user": "string"
        }
      ],
      "experiences": [
        "string"
      ]
    }
  }
]
```

**For example**

***First Example***

*If Request is*
![alt text](image-22.png)

*The Response is*

```
[
  {
    "id": 1,
    "title": "Engineer",
    "employmentType": null,
    "companyName": "Entersoft",
    "location": null,
    "locationType": null,
    "startDate": "2024-08-19T00:00:00",
    "endDate": null,
    "currentJob": true,
    "description": null,
    "userId": "15edb691-aa6e-41e1-869f-8614c620b411",
    "user": {
      "firstName": "Dimitris",
      "lastName": "Rammos",
      "pictureURL": "rammos.com",
      "educations": [],
      "experiences": [
        null
      ],
      "id": "15edb691-aa6e-41e1-869f-8614c620b411",
      "userName": "jrammos",
      "normalizedUserName": "JRAMMOS",
      "email": "jrammos@outlook.com.gr",
      "normalizedEmail": "JRAMMOS@OUTLOOK.COM.GR",
      "emailConfirmed": false,
      "passwordHash": "AQAAAAIAAYagAAAAEGsaDf+161n39GJclPeYg6TdJBXmJIdj4yAPzmWl+4NaYRcR4LZ1zKzZ4SLMxm+ujQ==",
      "securityStamp": "CZWDHAFSTRZO5XWVAY47AQS5IVNOYUEP",
      "concurrencyStamp": "61df35c3-09a0-4c45-ae7a-9bcf3fdd098e",
      "phoneNumber": "1234567890",
      "phoneNumberConfirmed": false,
      "twoFactorEnabled": false,
      "lockoutEnd": null,
      "lockoutEnabled": true,
      "accessFailedCount": 0
    }
  }
]
```


## Edit Experience
**Put** 
`/Users/EditExperience`


**Request**
The Request is **multipart/form-data**
![alt text](image-31.png)


**Response**
The Response is **application/json**
```
{
  "id": 0,
  "title": "string",
  "employmentType": "string",
  "companyName": "string",
  "location": "string",
  "locationType": "string",
  "startDate": "2024-08-21T08:48:13.110Z",
  "endDate": "2024-08-21T08:48:13.111Z",
  "currentJob": true,
  "description": "string",
  "userId": "string",
  "user": {
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2024-08-21T08:48:13.111Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0,
    "firstName": "string",
    "lastName": "string",
    "pictureURL": "string",
    "educations": [
      {
        "id": 0,
        "school": "string",
        "degree": "string",
        "fieldOfStudy": "string",
        "startDate": "string",
        "endDate": "string",
        "grade": "string",
        "description": "string",
        "userId": "string",
        "user": "string"
      }
    ],
    "experiences": [
      "string"
    ]
  }
}
```

**For example**

***First Example***

*If Request is*
![alt text](image-30.png)

*The Response is*

```
{
  "id": 4,
  "title": "software",
  "employmentType": null,
  "companyName": "intra",
  "location": null,
  "locationType": null,
  "startDate": "2014-06-01T00:00:00",
  "endDate": null,
  "currentJob": true,
  "description": null,
  "userId": "4ab32081-319f-4705-b133-6a4bb3a04432",
  "user": null
}
```

## Delete Experience
**Delete** 
`/Users/DeleteExperience`


**Request**
The Request is **multipart/form-data**
![alt text](image-28.png)

**Response**
The Response is **application/json**
![alt text](image-29.png)

**For example**

*If Request and Response is*
![alt text](image-32.png)

