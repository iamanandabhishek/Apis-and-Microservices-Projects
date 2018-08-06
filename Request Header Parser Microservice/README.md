# Request Header Parser

A simple backend app which shows client details such as IP, browser details as well as language preference.

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

- The API endpoint is `localhost:1337/api/whoami`
- Users can get their IP address, browser details and their browser set language.

## Example Usage:

- [localhost:1337/api/whoami](http://localhost:1337/api/whoami)

## Example Output:

```
{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5", "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64;rv:50.0) Gecko/20100101 Firefox/50.0"}
```

## Live Preview:

The live preview of the site can be found here https://puzzled-organ.glitch.me/
