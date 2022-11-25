"use strict";

// Dependencies
const request = require("request")
const express = require("express")

// Variables
const web = express()
const port = process.env.PORT || 8080

// Main
web.get("/", (req, res)=>{
    const link = req.query.link

    if(!link) return res.redirect("https://duckduckgo.com/")

    try{
        request(link).on("error", ()=>{
            res.redirect("https://duckduckgo.com/")
        }).on("response", (rRes)=>{
            if(!rRes.headers["content-type"].match("image")) return rRes.emit("end")
        }).pipe(res)
    }catch{
        res.send("Failed to render image.")
    }
})

web.use("*", (req, res)=>res.redirect("https://duckduckgo.com/"))
web.listen(port, ()=>console.log(`Server is running. Port: ${port}`))