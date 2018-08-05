//Project init, require path for unix + windows path
const express = require("express");
const path = require("path");

const app = express();

//For environments to use env.PORT instead
const PORT = process.env.PORT || 1337;

//middleware which serves static files
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

//main logic, ? makes date_string optional
app.get("/api/timestamp/:date_string?", (req, res) => {
    let dateString = req.params.date_string;
    dateString = (parseInt(dateString) === +dateString) ? +dateString : dateString;
    const date = dateString ? new Date(dateString) : new Date();
    res.send(
        date.toString() === "Invalid Date" ? {
            error: "Invalid Date"
        } : {
            unix: date.getTime(),
            utc: date.toUTCString()
        }
    );
});

//listening to the PORT
app.listen(PORT, () =>
    console.log(`The server is running on the Port: ${PORT}`)
);