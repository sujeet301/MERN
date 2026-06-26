const express=require("express");

const app=express();

app.get("/set-cookies", (req, res)=>{

    res.cookie("username","sujeet")

    res.send("cookie has been set")

})

app.get("/get-cookie", (req, res)=>{

    console.log(req.header.cookie);

    res.send("check terminal for cookies");

})

app.listen(3000, ()=>{

    console.log("server is running on port 3000")

})




