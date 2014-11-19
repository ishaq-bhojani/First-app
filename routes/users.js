var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('connected',function(){
    console.log('Connected Mongo')
});
mongoose.connection.on('error',function(){
    console.log('Error Mongo')
});
mongoose.connection.on('disconnected',function(){
    console.log('DisConnected Mongo')
});

var StudentSchema = new Schema({
    user:String,
    password:String,
    name:String,
    lName:String,
    class:Number,
    tasks:[
        {status:String,
            ratings:Number,
            data:String,
            comments:[
                {data:String
                ,commentor:String
                }]
        }]
});

var studentModel= mongoose.model('studentModel',StudentSchema);


var adminData={name:"admin",password:"admin"};
/*
var stdData=[
    {user:'a',password:'1',name:'Ishaq',lName:'Bhojani',class:1,tasks:[{status:"Completed",ratings:5,data:"One Page Writing",comments:[{data:'English?',commentor:'Ishaq'}]}]},
    {user:'b',password:'2',name:'Jahanzaib',lName:'Jazzy',class:2,tasks:[]},
    {user:'c',password:'3',name:'Ahmer',lName:'Yasin',class:3,tasks:[]},
    {user:'d',password:'4',name:'Zunair',lName:'Zakir',class:4,tasks:[]},
    {user:'e',password:'5',name:'Basit',lName:'Basit',class:5,tasks:[]}];
*/
//var totalClasses ={classOne:1,classTwo:1,classThree:1,classFour:1,classFive:1};
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.post('/loginAdm',function(req, res){
   if(req.body.name==adminData.name && req.body.password==adminData.password){
       studentModel.find(function(err,data1) {
           if(err){
               console.log('Error'+ err);
           }
           else{
               res.send({
                   user:adminData,
                   stdData:data1,
                   message:"You are successfully login"
               })
           }
       });

 }

},function(err){
  res.send(err);
});
router.post('/loginStd',function(req, res){
    studentModel.find({user:req.body.name,password:req.body.password},function(err,data){
        if(err){
            console.log('Error'+ err);
            res.send(false)
        }
        else{
            res.send(data);
        }
    });
    /*for(var i=0;i<stdData.length;i++ )
    if(req.body.name==stdData[i].user && req.body.password==stdData[i].password){
        res.send({
            allData:stdData,
            user:i,
            message:"You are successfully login"
        })
    }*/

},function(err){
    res.send(err);
});
router.post('/addStd',function(req, res){
    var addStd = new studentModel({user:req.body.userName,password:req.body.password,name:req.body.fName,lName:req.body.lName,class:req.body.subClass,tasks:[]});
    addStd.save(function(err,data){
        if(err){
            console.log('Error'+ err);
        }
        else{
            studentModel.find(function(err,data1) {
                if(err){
                    console.log('Error'+ err);
                }
                else{res.send(data1);}
                });
        }
    });

},function(err){
    res.send(err);
});
router.post
('/switchClass',function(req,res){
    studentModel.findByIdAndUpdate(req.body._id,req.body,function(err,data){
        if(err){
            console.log('Error'+ err);
        }
        else {
            res.send("Class Changed Success :)");
        }});

},function(err){
    res.send(err);
});
router.post('/taskComFromAdmin',function(req,res){
    studentModel.findByIdAndUpdate(req.body._id,req.body,function(err,data){
    if(err){
            console.log('Error'+ err);
        }
        else {
            res.send("Class Changed Success :)");
        }
    });
},function(err){
    res.send(err);
});
router.post('/giveTask',function(req,res){
    studentModel.findByIdAndUpdate(req.body._id,req.body,function(err,data){
        if(err){
            console.log('Error'+ err);
        }
        else {
            res.send("Task Given Success :)");
        }

    });

},function(err){
    res.send(err);
});
router.post('/getRatings',function(req,res){
    studentModel.findByIdAndUpdate(req.body._id,req.body,function(err,data){
        if(err){
            console.log('Error'+ err);
        }
        else {
            res.send("Rate Success :)");
        }

    });
},function(err){
    res.send(err);
});
router.post('/taskComFromStd',function(req,res){
    studentModel.findByIdAndUpdate(req.body._id,req.body,function(err,data){
        if(err){
            console.log('Error'+ err);
        }
        else {
            res.send("Comment Success :)");
            }
    });
},function(err){
    res.send(err);
});
router.post('/changeStatus',function(req,res){
    studentModel.findByIdAndUpdate(req.body._id,req.body,function(err,data){
        if(err){
            console.log('Error'+ err);
        }
        else {
            res.send("Status Changed Success :)");
        }

    });
},function(err){
    res.send(err);
});
module.exports = router;
