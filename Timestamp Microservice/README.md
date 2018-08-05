# Timestamp Microservice
A simple backend app which shows timestamp of current time or the date passed.

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

## User Stories:
* The API endpoint is `localhost:1337/api/timestamp/:date_string?`
* A date string if valid can be successfully parsed.
* If the date string is empty, the service uses the current timestamp.
* If the date string is valid the api returns a JSON having the structure
* If the date string is invalid the api returns a JSON having the structure `{"error" : "Invalid Date" }`

## Example Usage:
* [localhost:1337/api/timestamp/2015-12-25](localhost:1337/api/timestamp/2015-12-25)
* [localhost:1337/api/timestamp/1450137600000](localhost:1337/api/timestamp/1450137600000)
* [localhost:1337/api/timestamp/10 10 1000](http://localhost:1337/api/timestamp/10 10 1000)

## Example Output:
`{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`

## Live Preview:
The live preview of the site can be found here https://dandelion-timbale.glitch.me/