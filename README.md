# Applicants

## Installation
npm install

## Running the application
The application natively runs on port 8081.
You start it by running npm start.

## Modifying the code
The code consists of multiple parts, the application is split up into different parts using MVC structure.
| Folder/File        | Description          |
| ------------- |:------------- |
| app.js | This simply connects all the pieces together, barely anything should be implemented here. |
| MQ/ | This folder contains all code for the message queue connection. |
| sql/ | These are where the longer sql statements are stored to be read into the integration layer |
| controller.js | Controller for managing the queue message requests. |
| | Adding new functions for calling from the queue is done in the controller. |
| model.js  | This is the model layer and contains all code for business logic. |
| integration.js  | The integration file manages the database connection and the functionality associated with this service.  |
## [The project wiki](https://microrecruitment.github.io/)
The Applicats service provides backend support for applying for jobs and handeling applications. e.g. when an admin wants to retrieve all applications or an applicant submits his/hers application.

app.js starts the application
