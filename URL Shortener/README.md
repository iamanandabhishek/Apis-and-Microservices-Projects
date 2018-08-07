# URL Shortener

A simple fullstack app which validates and shortens a URL passed.

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

* Users can make a POST request to `http://localhost:1337/api/shorturl/new` and will receive a shortened link in response.
* If the link is invalid, the user gets response `{"error":"invalid URL"}`
* When the user visits the shortened link, they are redirected to the original link.

## Example Usage:

- POST `localhost:1337/api/shorturl/new` - `https://www.google.com`

## Example Output:

`localhost:1337/api/shorturl/0` ===redirect===> `https://www.google.com`

## Live Preview:

The live preview of the app can be found here https://dapper-lamprey.glitch.me/