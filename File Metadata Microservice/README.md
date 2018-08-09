# File Metadata

A fullstack app which gives details about the user uploaded file.

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

* User can submit a form that includes a file upload.
* The from file input field has the "name" attribute set to "upfile". We rely on this in testing.
* When user submit something, they will receive the file name and name, type and size in bytes within the JSON response.

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
