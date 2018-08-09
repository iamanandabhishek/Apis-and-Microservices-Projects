# URL Shortener

A fullstack app which registers a user and keeps track of added exercise logs.

## Table of Contents

- [Installation](#installation)
- [User Stories](#UserStories)
- [Example Usage](#ExampleUsage)
- [Example Output](#ExampleOutput)
- [Live Preview](#LivePreview)

## Installation

### Quick Setup

This webapp uses nodemon, so make sure you have that installed, if not then run this command:

```
npm install -g nodemon
```

After installing nodemon, run these commands:

```
npm install
npm start
```

In the terminal it should say which port the server it's running on, if it's local server then you can head to `localhost:1337`

You'll also need to create your own database, head over to [mlab](https://mlab.com) to make a quick DB. After setting DB up add the URI in the `server.js` inside `mongoose.connect(<db URI>)`.

## User Stories:

- User can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and \_id.
- User can get an array of all users by getting api/exercise/users with the same info as when creating a user.
- User can add an exercise to any user by posting form data userId(\_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.
- User can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(\_id). Return will be the user object with added array log and count (total exercise count).
- User can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

## Example Usage:

- POST `http://localhost:1337/api/exercise/log?userId=7WIPsFRGa&limit=1`

## Example Output:

```
{
    _id: "7WIPsFRGa",
    username: "monkaS",
    log: [
            {
            date: "2018-02-02T00:00:00.000Z",
            description: "asad",
            duration: 2
            }
        ],
    count: 4
}
```

## Live Preview:

The live preview of the app can be found here => https://sore-birch.glitch.me/
