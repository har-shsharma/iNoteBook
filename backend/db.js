const mongoose=require('mongoose');
const mongoUrl="mongodb://localhost:27017/inotebook";
const connectToMongo=()=>{
    mongoose.connect(mongoUrl).then(()=>{
        console.log("Successfully connected");
    })
}
module.exports=connectToMongo;