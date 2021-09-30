var Express=require("express")
var BodyParser=require("body-parser");
var app=Express();
var MongoClient=require("mongodb").MongoClient;
var fileUpload=require("express-fileupload");
var fs=require('fs');
var cors=require('cors');
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

app.use(fileUpload());
app.use('/Photos',Express.static(__dirname+'/Photos'));
app.use(cors());
var CONNECTION_STRING="mongodb+srv://user:password@cluster0.onda2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



var DATABASEDB="dbtest";
var database;

app.listen(49146,()=>{

    MongoClient.connect(CONNECTION_STRING,{useNewUrlParser:true},(error,client)=>{
        database=client.db(DATABASEDB);
        console.log("Mongo DB connection correct");
    })
});

app.get('/',(request,response)=>{
    response.json('Hello World')
})


//Start API Methods for department collection

app.get('/api/department',(request,response)=>{

    database.collection("department").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.json(result);
    })

})


app.post('/api/department',(request,response)=>{

    database.collection("department").count({},function(error,numOfDocs){
        if(error){
            console.log(error);
        }

        database.collection("department").insertOne({
            DepartmentId:numOfDocs+1,
            Name:request.body['Name']
        });

        response.json("Department added");
    })

})


app.put('/api/department',(request,response)=>{

    

        database.collection("department").updateOne(
            // Filter criteria
            {
                "DepartmentId":request.body['DepartmentId']
            },
            // Updated data
            {$set:{
                "Name":request.body['Name']
            }

            }
        );

        response.json("Department updated");
    

})

app.delete('/api/department/:id',(request,response)=>{

    
    database.collection("department").deleteOne({
        DepartmentId:parseInt(request.params.id)
    });

    response.json("Department deleted");


})
//Finish API Methods for department collection

//Start API Methods for employee collection

app.get('/api/employee',(request,response)=>{

    database.collection("employee").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.json(result);
    })

})


app.post('/api/employee',(request,response)=>{

    database.collection("employee").count({},function(error,numOfDocs){
        if(error){
            console.log(error);
        }

        database.collection("employee").insertOne({
            EmployeeID:numOfDocs+1,
            EmployeeName:request.body['EmployeeName'],
            Department:request.body['Department'],
            DateJoining:request.body['DateJoining'],
            PhotoFileName:request.body['PhotoFileName']
        });

        response.json("Employee added");
    })

})


app.put('/api/employee',(request,response)=>{

    

        database.collection("employee").updateOne(
            // Filter criteria
            {
                "EmployeeID":request.body['EmployeeID']
            },
            // Updated data
            {$set:{
                "EmployeeName":request.body['EmployeeName'],
                "Department":request.body['Department'],
                "DateJoining":request.body['DateJoining'],
                "PhotoFileName":request.body['PhotoFileName']
            }

            }
        );

        response.json("Employee updated");
    

})

app.delete('/api/employee/:id',(request,response)=>{

    
    database.collection("employee").deleteOne({
        EmployeeID:parseInt(request.params.id)
    });

    response.json("Employee deleted");


})
//Finish API Methods for employee collection

app.post('/api/employee/savefile',(request,response)=>{

    fs.writeFile("./Photos/"+request.files.file.name,
    request.files.file.data,function(err){
        if(err){
            console.log(err);
        }

        response.json(request.files.file.name);
    }
    )
})