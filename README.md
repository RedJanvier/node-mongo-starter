<div syle="text-align: center; width: 100%;">
  <img syle="margin: 0 auto;" src="https://images.squarespace-cdn.com/content/v1/55e06d0ee4b0718764fcc921/1507805805238-M8XG4RMCMWITZ7LJGEEF/ke17ZwdGBToddI8pDm48kETUuxmp5xHjxR_mq0kKQipZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7XbdY2v8mR--EcMEe2KaFSVzNBu9Qs0q6qR3QzqKFtHJVM6oy5K0EEbGe9v0FXNpEg/slidebank+login.gif" alt="hero-cover" />
  <h1>Node Mongo Starter (NMS) BY RedJanvier</h1>
</div>

This is a REST API based on Node Js, Express, Mongodb with mongoose, email verification, swagger documentation and tests with Mocha and Chai and a secure JWT authentication and deals with managing users.

## PREREQUISITES

- NodeJs installed. [Download it](https://nodejs.org/en/)
- PostgreSQL installed. [Download it](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Text Editor of your choice. [My recommendation](https://code.visualstudio.com/)

## Features

- ✔ User(any) should be able to register and verify email
- ✔ User(any) should be able to login into his/her account
- ✔ User(logged in) should be able to see all users on the app
- ❌ User(logged in) should be able to logout of his/her account
- ✔ User(logged in) should be able to get all details of any User

## Initial setup

Run the following commands

```
npm install
touch .env

```

Copy all content from `.env.example` file to `.env` file then fill it with proper info

Run `npm run dev` to start the server in development or

Run `npm start` for production mode

## Routes

#### List all users (require login)

```
[GET] /api/v1/users

:body: none
```

#### User login

```
[POST] /api/v1/users/login

:body: {
  email "STRING",
  password "STRING"
}
```

#### User register

```
[POST] /api/v1/users/signup

:body: {
  name "STRING",
  password "STRING",
  email "STRING",
}
```

## Tech stack

- bcryptjs
- Node JS
- Express JS
- jsonwebtoken
- mocha & chai
- MongoDB with Mongoose

## Author

### **RedJanvier**

## Contacts

[Github](https://github.com/RedJanvier)

[Twitter](https://twitter.com/red_janvier)

[YouTube](https://www.youtube.com/channel/UCrQBNajZa-ibHBerJQ0kAiQ)

[Facebook](https://facebook.com/jan.h.red)
