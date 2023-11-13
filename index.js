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
// --- DISPLAY --- //
app.get("/display", function(req, res) {


  var q1 = "select * from department;";
  con.query(q1, function(error, departmentResult) {
  if (error) throw error;

  var q2 = "select * from student;";
  con.query(q2, function(error, studentResult) {
  if (error) throw error;

  var q3 = "select * from professor;";
  con.query(q3, function(error, professorResult) {
  if (error) throw error;

  var q4 = "select * from advisor;";
  con.query(q4, function(error, advisorResult) {
  if (error) throw error;

  var q4 = "select * from major;";
  con.query(q4, function(error, majorResult) {
  if (error) throw error;

  res.render("display", { studentData: studentResult, departmentData: departmentResult, advisorData: advisorResult, professorData: professorResult, majorData: majorResult});
  
});});});});});
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

  app.post("/insertdept", function(req, res) {

    var params = { D_ID: req.body.std-DID, Department_chair: req.body.std_chair, building: req.body.std_building, budget: req.body.std_budget};
    var q = "INSERT INTO department SET ?";
    var success = false;
  
    con.query(q, params, function(error, results) {
    if (error) throw err;
    
    if (results.affectedRows != 0) success = true;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  app.post("/insertmaj", function(req, res) {

    var params = { Name_ID: req.body.std_NameID, D_ID: req.body.std_DID, Full_Name: req.body.std_name, req_credit: req.body.std_credit};
    var q = "INSERT INTO major SET ?";
    var success = false;
  
    con.query(q, params, function(error, results) {
    if (error) throw err;
    
    if (results.affectedRows != 0) success = true;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  app.post("/insertprof", function(req, res) {

    var params = { P_ID: req.body.std_PID, D_ID: req.body.std_DID, Name: req.body.std_name, Type: req.body.std_type};
    var q = "INSERT INTO professor SET ?";
    var success = false;
  
    con.query(q, params, function(error, results) {
    if (error) throw err;
    
    if (results.affectedRows != 0) success = true;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  app.post("/insertstud", function(req, res) {

    var params = { S_ID: req.body.std_SID , Name: req.body.std_name, tot_credits: req.body.std_credit , M_ID: req.body.std_MID};
    var q = "INSERT INTO student SET ?";
    var success = false;
  
    con.query(q, params, function(error, results) {
    if (error) throw err;
    
    if (results.affectedRows != 0) success = true;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  // --- DELETE --- //

  app.get("/deleteadvisor", function (req, res) {
    res.render("deleteadvisor");
  });

  app.get("/deleteadvisorAID", function (req, res) {
    res.render("deleteadvisorAID");
  });

  app.get("/deleteadvisorPID", function (req, res) {
    res.render("deleteadvisorPID");
  });

  app.get("/deleteadvisorSID", function (req, res) {
    res.render("deleteadvisorSID");
  });

  app.get("/deleteadvisorsemester", function (req, res) {
    res.render("deleteadvisorsemester");
  });

  app.post("/deleteadvSID", function(req, res) {

    var info = { S_ID: req.body.std_SID};
    var q = "DELETE FROM advisor WHERE ?";
    var success = true;
  
    con.query(q, info, function(error, results) {
    if (error) throw err; 
    
    if (results.affectedRows == 0) success = false;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  app.post("/deleteadvPID", function(req, res) {

    var info = { P_ID: req.body.std_PID};
    var q = "DELETE FROM advisor WHERE ?";
    var success = true;
  
    con.query(q, info, function(error, results) {
    if (error) throw err; 
    
    if (results.affectedRows == 0) success = false;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  app.post("/deleteadvAID", function(req, res) {

    var info = { A_ID: req.body.std_AID};
    var q = "DELETE FROM advisor WHERE ?";
    var success = true;
  
    con.query(q, info, function(error, results) {
    if (error) throw err; 
    
    if (results.affectedRows == 0) success = false;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  app.post("/deleteadvsemester", function(req, res) {

    var info = { Semester: req.body.std_semester};
    var q = "DELETE FROM advisor WHERE ?";
    var success = true;
  
    con.query(q, info, function(error, results) {
    if (error) throw err; 
    
    if (results.affectedRows == 0) success = false;
  
    console.log(results);
  
    if (success) res.redirect("/querysuccess"); // redirect to success page
    else res.redirect("/queryfailure"); // redirect to error page, query failed
  });
  });

  // --- UPDATE --- //

  app.get("/update", function (req, res) {
    res.render("update");
  });

  app.post("/updatemaj", function(req, res) {

    var params = [req.body.std_newName_ID, req.body.std_newDID, req.body.std_newname, req.body.std_newcredit, req.body.std_oldName_ID, req.body.std_oldDID, req.body.std_oldname, req.body.std_oldcredit];

    var q = "UPDATE major SET Name_ID = ?, D_ID = ?, Full_Name = ?, req_credit = ? WHERE (Name_ID = ? AND D_ID = ? AND Full_Name = ? AND req_credit = ?)";
    var success = true;
  
    con.query(q, params, function(error, results) {
    if (error) {
      console.error(error);
    }
    
    console.log(results);

    if (results.affectedRows == 0) success = false;
  
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
 