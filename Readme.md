# MonoRepo example using NestJs Microservices and NextJS

## How to Run the code

### Start services dependencies

First you need to start required services :

- MongoDB
- NATS streaming, which used as microservice transporter

In root folder run `docker-compose up -d` command

### Start API

Then you need to start the api server.
As the architecture is microservices oriented you need to start 3 services.

#### In api/gateway folder

Api gateway is responsible of client request, this service is kind of "microservice router". This service will deal with authentication.

In `api/gateway` folder, first duplicate `.env.sample` file, then put your own config on it, then run `npm run start:dev` command

#### In api/posts-service folder

Post service is responsible of posts. In this service we will persist and get the posts from DB

In `api/posts-service` folder, first duplicate `.env.sample` file, then put your own config on it, then run `npm run start:dev` command

#### In api/users-service folder

USer service is responsible of users. In this service we will persist and get the users from DB

In `api/users-service` folder, first duplicate `.env.sample` file, then put your own config on it, then run `npm run start:dev` command

### Start Front End

Front end is based on NextJs framework https://nextjs.org/

On `app` folder first duplicate `.env.sample` file as `.env.local` and replace the configuration values by yours.

Wen you are ready, run `npm run dev` command to start

## How the project works

This project is just an implementation example of microservices using nestJs and front end using NextJs with ISG strategy.
Both Back End and Front End use TypeScript.

To be able to create some post, you need to be loggin in, you will find "login" button on the topbar.
You cannot create an account from the interface.
To do it, you should POST user as following

```
{
    "email": "email@example.com",
    "plainPassword": "your password",
    "firstName": "John",
    "lastName: "Doe"
}
```

on the following address `http://localhost:3000/auth/register` of course replace `localhost` and `port` by yours

### About loggin

When you login as admin, API create httponly token that contains JWT token.
Custom passport in API gateway, hanhle the cookie, check if it's valid or not and give access to the protected roads.

In NextJs project, a request on `/auth/profile` route is send every 5 minutes, it will refresh the JWT token (by defaut this token is valid 1 hour)

Of course if the use leave the website during 1 hour, he will have to login again

# TODO

- Replace all `any` type on code by propre one
- Improve a bit UX/UI especially the post detail page
