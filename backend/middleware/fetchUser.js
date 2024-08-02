const jwt = require('jsonwebtoken');
const jwtSecretKey = "Thisisasecretkey";

const fetchUser=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        res.status(401).json({error:"Access denied"});
    }
    try{
    const data=jwt.verify(token,jwtSecretKey);
    req.user=data.user;
    next()}
    catch(error){
        res.status(400).json({error:"Access denied"});
    } 
}
module.exports=fetchUser;
