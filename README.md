# Social Network API ![alt text](https://img.shields.io/badge/License-MIT-blue.svg)

## Description:

This project involves building an API for a social networking web application where users can share their thoughts, react to friend's thoughts, and create a friend list. The application will use Express.js for routing, a MongoDB database, and the Mongoose ODM, with a focus on handling large amounts of unstructured data. The API will have several routes for users and thoughts, including GET, POST, PUT, and DELETE routes. Users will have a unique username and email, and they will be able to create, update, and delete their own thoughts, as well as react to the thoughts of others. Users will also be able to create and delete their own friend lists, and the API will be able to retrieve data for all users and thoughts, as well as for a single user or thought by its ID.

&nbsp; AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Table of Contents:

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Badges](#badges)
- [How_to_Contribute](#how_to_contribute)
- [Questions](#questions)
- [License](#license)

## Installation:

1. Start by opening a terminal or command prompt and navigating to the directory where the code is located.
   <br>
2. Run 'npm i' install to install the required packages.
   <br>

```
npm i
```

3. Run the following commands to create the database and seed with values.

```
node seeds/seed.js
```

4. Start the server and begin sending API requests over the localhost port.

```
node server.js
```

## Usage:

The API will have several routes for users and thoughts, including GET, POST, PUT, and DELETE routes

GET: retrieve all users
`localhost:3001/api/users/`

GET: retrieve a user
`localhost:3001/api/users/:id`

POST: create a user
`localhost:3001/api/users`

DETETE: delete a user
`localhost:3001/api/users/:id`

PUT: update a user
`localhost:3001/api/users/:id`

POST: create a user's friends
`localhost:3001/api/users/:id/friends/:friendId`

DELETE: remove a user's friends
`localhost:3001/api/users/:id/friends/:friendId`

GET: retrieve all thoughts
`localhost:3001/api/thoughts/`

GET: retrieve a thought
`localhost:3001/api/thoughts/:thoughtId`

POST: create a thought
`localhost:3001/api/thoughts`

DELETE: delete a thought
`localhost:3001/api/thoughts/:thoughtId`

POST: create a user's reaction to a thought
`localhost:3001/api/thoughts/:thoughtId/reactions`

DELETE: remove a user's reaction to a thought
`localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId`

In addition to the main features, the API will have several virtuals and subdocuments created with the reactionSchema. The User model will have a virtual called friendCount that retrieves the length of the user's friends array field on query. The Thought model will have a virtual called reactionCount that retrieves the length of the thought's reactions array field on query, as well as a subdocument schema for the reactions field. The project also includes creating a walkthrough video that demonstrates its functionality and all acceptance criteria being met.

&nbsp; The github can be found at: https://github.com/arishorts/social-network-api

## Tests:

&nbsp; no

## Badges:

![badmath](https://img.shields.io/badge/JavaScript-100%25-purple)

## How_to_Contribute:

&nbsp; If you would like to contribute, refer to the [Contributor Covenant](https://www.contributor-covenant.org/)

## Questions:

&nbsp; My GitHub profile can be found at: https://github.com/arishorts
<br>&nbsp; Reach me with additional questions at : arieljschwartz@gmail.com

## License:

&nbsp; http://choosealicense.com/licenses/mit/

---

© 2022 Ariel Schwartz LLC. Confidential and Proprietary. All Rights Reserved.
