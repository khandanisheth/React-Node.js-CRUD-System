const express = require("express");// 1. Express module ko import kar rahe hain
const port = 8001;// 2. Port number define kar rahe hain jahan server chalega
const mysql=require("mysql2");
const cors=require("cors");// this are use cross orgine front and backend
const app = express();// 3. Express app ka object create kar rahe hain
require("./db/conn");// db import 
const router=require("./Routes/router");//Isme tum GET, POST, PUT, DELETE routes define kar sakte ho.

// app.get("/", (req, res) => {// 4. Root route define kar rahe hain: GET request on "/"
//     res.send("Server Start");// 5. Jab koi browser ya client "/" route par aaye, to yeh message bhejna
// });

// Middleware
app.use(express.json()); // JSON body read karne ke liye
app.use(cors());//– CORS Error Avoid Karne Ke Liye
app.use(router);//Isme tum GET, POST, PUT, DELETE routes define kar sakte ho.

app.listen(port, () => {// 6. Server ko start kar rahe hain aur port 8001 par listen kar rahe hain
    console.log("Server Start At Port -> " + port);// 7. Console mein message dikh raha hai jab server start ho gaya
});









//  2. const cors = require("cors"); – Frontend-Backend Communication ke liye
// 📌 Purpose:
// Jab frontend (React) aur backend (Node.js/Express) alag ports
//  par chalein, to browser security policy usse block kar deta hai.
// Is issue ko kehte hain: CORS error (Cross-Origin Resource Sharing)



// ✅ 2. app.use(cors()); – CORS Error Avoid Karne Ke Liye
// 📌 Jab Use Hota Hai:
// Jab React (frontend) http://localhost:3000 par chale,
// Aur backend (Express) http://localhost:8001 par ho.
// ⚠️ Error Without CORS:
// Access to fetch at 'http://localhost:8001/' from origin 'http://localhost:3000' has been blocked by CORS policy...