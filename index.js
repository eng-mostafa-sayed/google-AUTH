const express = require("express");
const Passport = require("passport");
//express application instance
const app = express();
//custome port
const port = 5000;

//calling my auth file here
require("./auth");

//default GET
app.get("/", (req, res) => {
    res.send('<a href="/auth/google.com">Authentecation with google </a>');
});

//here is the part which autherized Admins can see only
app.get("/adminpanel2", (req, res) => {
    res.send("<p>here is admin panale</p><p> hello</p>");
});

app.get("/adminpanel", Passport.authenticate("google"));

//excuted while listening
const listening = () => {
    console.log(`server running on port: ${port}`);
};
//app runner
app.listen(port, listening);