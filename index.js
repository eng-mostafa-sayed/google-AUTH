const express = require("express");
const session = require("express-session");
const Passport = require("passport");

//custome port
const port = 5000;

//calling my auth file here
require("./auth");

//express application instance
const app = express();
//here we intialize the express-session
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(Passport.initialize());
app.use(Passport.session());

//middleware function to check if user logged in or not
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

//default GET it redirect to authentication with passport
app.get("/", (req, res) => {
    res.send('<a href="/adminpanel/auth">Authentecation with google </a>');
});

//handel the callback of the google authentication and decide where to go if it sucess or not
app.get(
    "/google/callback",
    Passport.authenticate("google", {
        successRedirect: "/adminpanal",
        failureRedirect: "/auth/failure",
    })
);

//here calling authenticate and retrive some data from it inside {scope[]}
//we get email and profile only
app.get(
    "/adminpanel/auth",
    Passport.authenticate("google", { scope: ["email", "profile"] })
);

//here is the part which autherized Admins can see only if he sucessfully authenticated
app.get("/adminpanal", isLoggedIn, (req, res) => {
    res.send(
        `<p>here is admin panale</p><p> hello MR ${req.user.displayName}</p>`
    );
});

app.get("/auth/failure", (req, res) => {
    res.send(`something went wrong ....`);
});

app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("Goodbye!");
});

//excuted while listening
const listening = () => {
    console.log(`server running on port: ${port}`);
};
//app runner
app.listen(port, listening);