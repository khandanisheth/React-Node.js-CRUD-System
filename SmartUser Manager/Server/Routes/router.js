const express = require("express");// 1. Express module ko import kar rahe hain
const router = new express.Router();
const conn = require("../db/conn");// db import 

router.post("/create", (req, res) => {//Jab koi POST request /create route pe aayegi (React form se), to ye function chalega.
    const { name, email, job, mobile } = req.body;//req.body se data le rahe ho
    if (!name || !email || !job || !mobile)// Agar koi bhi field missing ho to 422 error return karo (Unprocessable Entity).
    {
        res.status(422).json("Plz Fill All Data");
    }
    try {
        conn.query(`select * from usercrud where email =?`, email, (err, result) =>//Duplicate Email Check
        {
            if (result.length)//Agar result.length > 0 hai, to email pehle se exist karta hai — error de do.
            {
                res.status(422).json("Plz Fill Diffrent Email !");
            } else {
                conn.query(`insert into usercrud set ?`, { name, email, job, mobile }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    }
                    else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }
})

// get data 

router.get("/getusers", (req, res) => {
    conn.query("Select * from usercrud", (err, result) => {
        if (err) {
            res.status(422).json("No Data Fatch !");
        }
        else {
            res.status(201).json(result);
        }
    })
})
// ✅ Corrected API Route Delete User
router.delete("/deleteuser/:id", (req, res) => {
    const { id } = req.params;
    conn.query("DELETE FROM usercrud WHERE id = ?", id, (err, result) => {
        if (err) {
            res.status(422).json("Do Not Delete Data");
        } else {
            res.status(201).json("User deleted successfully");
        }
    });
});


//Single User Data Fatch
router.get("/singleuser/:id", (req, res) => {
    const { id } = req.params;
    conn.query("SELECT * FROM usercrud WHERE id = ?", id, (err, result) => {
        if (err) {
            res.status(422).json("Failed to fetch data");
        } else {
            res.status(201).json(result); // ✅ Return actual data
        }
    });
});



// Update user 
router.put("/updateuser/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, job, mobile } = req.body;

    conn.query("UPDATE usercrud SET name=?, email=?, job=?, mobile=? WHERE id=?",
        [name, email, job, mobile, id],
        (err, result) => {
            if (err) {
                res.status(422).json("Update Failed");
            } else {
                res.status(201).json("User updated successfully");
            }
        }
    );
});


module.exports = router;








//const router=new express.Router();
// 📌 Kya karta hai?
// express.Router() ek mini Express app jaisa hota hai.
// Isme tum GET, POST, PUT, DELETE routes define kar sakte ho.
// Isse code modular banta hai, yani routes ko alag file me organize kar sakte ho.




// ⚠️ set ? ka matlab kya hai?
// 🧠 insert into table_name set ? is a MySQL shortcut:

// sql
// Copy
// Edit
// insert into usercrud set name='abc', email='abc@gmail.com', job='dev', mobile='9999999999'
// Yahaan {name, email, job, mobile} object me keys column names se match karte hain — isliye set ? use kar sakte ho.
// Ye clean aur safe tarika hota hai — SQL Injection se bachata hai.


//  Summary Table
// Line	Purpose
// express.Router()	    Routes ko modular banata hai
// POST                 /create	Naya user form data database me insert karta hai
// set ?	            Object keys ko SQL column names ke sath match karta hai
// 422	                Validation ya duplicate error ke liye
// 201	                Data successfully insert ho gaya