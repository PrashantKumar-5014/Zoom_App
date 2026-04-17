const express = require('express');
const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("welcome to backend")
})

app.listen(port, () => {
    console.log("server is running on 3000 port");
})