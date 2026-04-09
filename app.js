const express = require("express");
const app = express();
const mailRoute = require("./src/routes/gmailRoutes")

app.use(express.json());

app.use("/web/send",mailRoute)

app.listen(3000, ()=>{
    console.log("server is listining on port: 3000");
})