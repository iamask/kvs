const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const path = require("path");
const auth = require("http-auth");
const Registration = mongoose.model("Registration");
const basic = auth.basic({
  file: path.join(__dirname, "../users.htpasswd")
});

//res.send("It works!");

router.get("/", (req, res) => {
  res.render("form", { title: "Registration form" });
});

//test///////////////////////////////////////
router.get("/shaka", (req, res) => {
  console.log("skaka");
  res.render("Shaka", { title: "Skaka" });
});

router.get("/cam", (req, res) => {
  console.log("camon");
  res.render("cam", { title: "Cam" });
});

router.get("/kvs", (req, res) => {
  console.log("kvs");
  res.render("kvs", { title: "kvs" });
});

router.post("/that", (req, res) => {
  console.log("Request Type:", req.method);
  console.log(req);
  //res.send(JSON.stringify(req));
  //res.render("that", { title: "that" });
});

router.get("/that", (req, res) => {
  res.render("that", { title: "that" });
});

//test///////////////////////////////////////
router.get("/registrations", (req, res) => {
  Registration.find()
    .then(registrations => {
      res.render("index", { title: "Listing registrations", registrations });
    })
    .catch(() => {
      res.send("Sorry! Something went wrong.");
    });
});

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 1 })
      .withMessage("Please enter a name"),
    check("email")
      .isLength({ min: 1 })
      .withMessage("Please enter an email")
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      console.log("how");
      const registration = new Registration(req.body);
      registration
        .save()
        .then(() => {
          res.send("Thank you for your registration!");
        })
        .catch(err => {
          console.log(err);
          res.send("Sorry! Something went wrong.");
        });
    } else {
      res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        data: req.body
      });
    }
  }
);
module.exports = router;
