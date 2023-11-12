 // --- PACKAGE DECLARATIONS ETC. --- //
 var express = require('express');
 var app = express();
 var mysql = require('mysql');
 app.set("view engine", "ejs"); // template engine
 var bodyparser = require("body-parser");
 app.use(bodyparser.urlencoded({ extended: true }));
 
 var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'cis475_database'
 });
 
 // Connect to the database //
 con.connect((err) => {
   if (err) {
     console.error('Error connecting to the database:', err);
     return;
   }
   console.log('Connected to the database');

   app.listen(8080, function() {
    console.log('App listening on port 8080!');
    });

 });
 
 // --- MENU --- //
 app.get("/menu", function (req, res) {
   res.render("menu", { name: req.body.std_name, id: req.body.std_id });
 });

 // --- CREATE --- //
 app.get("/create", function (req, res) {
    res.render("create", { name: req.body.std_name, id: req.body.std_id });
  });

  app.get("/insertadvisor", function (req, res) {
    res.render("insertadvisor", { name: req.body.std_name, id: req.body.std_id });
  });

  app.get("/insertdepartment", function (req, res) {
    res.render("insertdepartment", { name: req.body.std_name, id: req.body.std_id });
  });

  app.get("/insertmajor", function (req, res) {
    res.render("insertmajor", { name: req.body.std_name, id: req.body.std_id });
  });

  app.get("/insertprofessor", function (req, res) {
    res.render("insertprofessor", { name: req.body.std_name, id: req.body.std_id });
  });

  app.get("/insertstudent", function (req, res) {
    res.render("insertstudent", { name: req.body.std_name, id: req.body.std_id });
  });

  app.post("/insertadv", function(req, res) {

    var params = { A_ID: req.body.std_AID, S_ID: req.body.std_SID, P_ID: req.body.std_PID, semester: req.body.std_semester};

    var q = "INSERT INTO advisor SET ?";
    var success = false;
  
    con.query(q, params, function(error, results) {
    if (error) throw err;
    
    if (results.affectedRows != 0) success = true;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  // --- MISC --- //
  app.get("/querysuccess", function (req, res) {
    res.render("querysuccess");
  });
  
  app.get("/queryfailure", function (req, res) {
    res.render("queryfailure");
  });
 