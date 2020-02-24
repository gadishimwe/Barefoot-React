# Barefoot Nomad(the Spinners) -- frontend

[![Coverage Status](https://coveralls.io/repos/github/andela/the_spinners-frontend/badge.svg?branch=develop)](https://coveralls.io/github/andela/the_spinners-frontend?branch=develop)
[![Build Status](https://travis-ci.org/andela/the_spinners-frontend.svg?branch=develop)](https://travis-ci.org/andela/the_spinners-frontend)
## Usage example

>This App will be the center piece for travelling. 
Travellers will be able to register online and will see accomodation listing, recommended visits place.
travellers will be able to chat in the app
Selected sellers will be able to list their accomodation and other facilitiesl
Travellers will be able to comment

## Tests setup and execution
The project use JEST Library for testing.  
All tests are located in `./src/App/tests/**.test.js`
First of all run `npm install` to install all packages and then, 
To run tests run `npm run test`. Or `npm run test:watch` So that every time you change source code while developing your application, your tests automatically run again. For more information on `npm run test:watch` follow the instructions that come after your test.

## Technologies used

The project use:  
### Backend
 `Node Express` : the core back end technology  
 `Heroku`: Used to host our app online
 `Es6+` Following ES6 syntax. and AirBnB styling guide  
 `PostgreSQL` Is used as our database management tool  
 `Swagger` Used for API documentation.  
 `Pivotal Tracker` A project management tool used to manage the app.  
 `Npm` Used as the package manager for the app. A fast, reliable, and secure dependency management system.  

### Front end
 `Figma` : Use to protype the User interface  
 `Material UI`: the CSS framework.  
 `React Js`: Front end framework  
 `Redux`: a predictable state container for JavaScript apps.
    
## Online app
You can visit the full integrated app [here](https://spinners-frontend-stage.herokuapp.com/)

## REST API Docs
The Api documentation is done using swagger. click [here](#) to View Barefoot Nomad API Documentation
  

## Installation and usage instructions with React JS

* Clone the repository using: `git clone https://github.com/andela/the_spinners-frontend `  
* Copy the file ***.env.sample*** then rename it to ***.env*** input the right credentials.  
* Run `npm install` To install the project dependencies    
* Run `npm start-dev` To start the application locally
* Run `npm test` to run test  

or visit our online site [Heroku](https://spinners-frontend-stage.herokuapp.com/)

## Installation and usage instructions with Node JS

* Clone the repository using: `git clone https://github.com/andela/the_spinners-backend.git `  
* Copy the file ***.env.sample*** then rename it to ***.env*** input the right credentials.  
* Run `npm install` To install the project dependencies   
* Run `sequelize db:migrate` To create all tables by running migrations  
* Run `npm dev` To start the application in ***development environment***  
* Run `npm start` To start the application in ***production environment***
* Run `npm test` to run test 
 
 ## Run application with Docker
* Install Docker on your machine
* Clone the repository using: `git clone https://github.com/andela/the_spinners-backend.git `  
* Copy the file ***.env.sample*** then rename it to ***.env***.  
* In the `.env file` Set database host as `db`
* Set the following `POSTGRES_USER=your_db_user_name`
      - `POSTGRES_PASSWORD=User_PASSWORD`
      - `POSTGRES_DB=POSTGRES_DB`
* Run `docker-compose up` To run the application with docker   
* wait to see the message `Listening on port 3000.......` 


## Features
* User can sign up
* User can log in
* User can login with facebook and gmail, 
* User can reset password
* User can edit their profile
* User can implement requests
* admin can approve requests
* User can get travel information
* User can get notifications
* Travel admins can create accomodation facilities
* Pre screened suppliers/hosts should be able to create/add their accommodation facilities
* Users can book an accommodation facility
* Users should be able to provide feedback on accommodation
* Users should get stats of trips made in the last X timeframe
* Users should be able to chat on Barefoot Nomad


## Contributors

ABIZEYIMANA Victor – [@victor-abz](https://github.com/victor-abz)

ISHIMWE Gad - [@gadishimwe](https://github.com/gadishimwe)

IRAGENA Eric - [@ericvand](https://github.com/erickvand)

HARINTWARI Gustave - [@higustave-ops](https://github.com/higustave-ops)