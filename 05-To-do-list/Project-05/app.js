const express = require("express")
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();

let items = ["But food", "Cook food","Eat food"];
let workItems =[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){ 

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day = today.toLocaleDateString("en-US", options);
    // var currentDay = today.getDay();
    // var day="";
    // if(today.getDay() == 6 || today.getDay() == 0 ){
    //     day = "weekend";
    //     res.render("list", {KindOfDay: day });
    // }else{
    //     day="weekday";
    //     res.render("list", {KindOfDay: day }); 
    // };

    

    res.render('list', {listTitle : day , newListItems: items});
 
});

app.post("/", function(request, response){
  let item = request.body.newItem;

    if(request.body.list == "Work list"){
    workItems.push(item);
    response.redirect("/work");
  }
  else{
    items.push(item);
    response.redirect("/");
  }
  
  
});


app.get("/work",function(req,res){
    res.render('list', {listTitle: "Work list", newListItems: workItems});
});



app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work ")
});

app.get("/about",function(req,res){
  res.render("about");
});


app.listen(3000, function(){
    console.log("Server has started")
});


