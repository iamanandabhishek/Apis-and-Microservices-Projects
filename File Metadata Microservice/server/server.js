const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

const PORT = process.env.PORT || 1337;

const upload = multer({
    dest: "uploads/"
});
app.use(express.static("public"));


let dataToSend;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

app.get("/api/fileanalyse", (req, res) => {
    if (dataToSend) {
        res.send(dataToSend);
    } else {
        res.send("Please choose a file");
    }

})

//upload.single(filename) should be same as in the form, or you'll waste 3hrs ripping your hair apart like me.
app.post("/api/fileanalyse", upload.single("file"), function (req, res) {
    if (req.file) {
        dataToSend = {
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        }
    }
    res.send({
        redirect: "/api/fileanalyse"
    });
});

app.listen(PORT, () => console.log(`Server is running on the PORT ${PORT}`));