var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://ishaqfirstdb:ishaqfirstdb@ds051640.mongolab.com:51640/ishaqfristdb');
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
    tasks:Array
});

var studentModel= mongoose.model('studentModel',StudentSchema);


var adminData={name:"admin",password:"admin"};
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
