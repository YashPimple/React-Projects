const express = require("express")
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();

let items = ["But food", "Cook food","Eat food"];

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

    

    res.render('list', {KindOfDay : day , newListItems: items});
 
});

app.post("/", function(request, response){
  let item = request.body.newItem;

  items.push(item);
  response.redirect("/");
  
});


app.listen(3000, function(){
    console.log("Server has started")
});

//always try to use let or const and not var since var acts as global scope in IF/else case
