# CRUD Web Services in NodeJS - Client in ReactJS

[Demo Heroku](https://crud-ws-node.herokuapp.com/)

## Instructions

Clone the repository.

~~~
git clone git@github.com:Cuchu/crud_ws_node.git
~~~

Define your config in config.js and client/config.js or use environment variables.

Prepare project:

~~~
npm install

npm build

npm run dev 
or
npm run start
~~~

When you run `npm run rev` the backend runs on port 8000 and frontend on 3000. 

If you use `npm run start` the app runs directly on port 8000.

Observation: I don't use dotenv in the client so I set in client/config.js the `web_service` variable to url of the app in Heroku because Heroku has a little problem to use the environment variables (with dotenv we can resolve this problem).

## Web Service

- **/list-account**: The method returns a list with accounts.

- **/create-account**: The method receives an email and create an account with this email.

- **/update-account**: The method receives an email, id and newEmail and replace the email to newEmail.

- **/delete-account**: The method receives an email and id and delete an account with this two values.

## Client

Is only a list with accounts and an input to create new accounts. When you insert a valid email the button to submit value be enable. You can an account when you insert a valid email and click on the blue button of some accounts.

## Test

For practicality, I define the page of the test to the app on heroku. 
The test has 3 steps and is very simple:

- 1° create an account, check if this new account exists.

- 2° find the account created in step 1° and edit the email and check if this change was fine.

- 3° find the account with email edited, delete it and check if this account doesn't exist.

~~~
testcafe chrome test.js
~~~

## Improves

Create an npm package to use the services of the backend. With the API in npm we can use it in the React Client and replace the functions getAccounts, createAccount, updateAccount, and deleteAccount to the methods of the package.
