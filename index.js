var Express=require("express")
var BodyParser=require("body-parser");


var app=Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

var MongoClient=require("mongodb").MongoClient;
var CONNECTION_STRING="mongodb+srv://berni:hola@cluster0.onda2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var DATABASEDB="dbtest";
var database;

app.listen(49146,()=>{

    MongoClient.connect(CONNECTION_STRING,{useNewUrlParser:true},(error,client)=>{
        database=client.db(DATABASEDB);
        console.log("Mongo DB connection correct");
    })
});

app.get('/',(request,response)=>{
    response.send('Hello World')
})

app.get('/api/department',(request,response)=>{

    database.collection("department").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.send(result);
    })

})


app.post('/api/department',(request,response)=>{

    database.collection("department").count({},function(error,numOfDocs){
        if(error){
            console.log(error);
        }

        
    })

})