const express = require("express");
const contactCollection = require("./model/contact");
require("dotenv").config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to DB");
})
.catch((e)=>{
    console.log("DB not connected");
})

app.get("/contacts" , async (req , res)=>{
    try{
        const data = await contactCollection.find({})
        res.json({completed:true , value:data})
    }
    catch(e)
    {
        res.json({completed:false , message:"something went wrong" , value:[]})
    }
})

app.post("/get-contact" , async (req , res)=>{
    try{
        const data = await contactCollection.findOne({id:parseInt(req.body.id)})
        if(!data)
        {
            res.status(500).json({completed:false})
            return;
        }

        res.json({completed:true , value:data})
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({completed:false})
    }
})

app.post("/add-contact" , async (req , res)=>{
    try{
        
        const data = await contactCollection.findOne({
            $or: [
              { phone: req.body.phone },
              { email: req.body.email }
            ]
          });
        
          const length = await contactCollection.countDocuments();
          
        if(data)
        {
            res.json({completed:false , message:"Credential already exits"})
            return;
        }

        const newContact = new contactCollection({...req.body , id:length+1})
        await newContact.save()

        res.json({completed:true , message:"Contact added successfully"})
    }
    catch(e)
    {
        console.log(e);
        res.json({completed:false , message:"something went wrong"})
    }
})

app.put("/put-contact", async (req, res) => {
    try {
        const { id, phone, email, firstName, lastName, company, jobTitle } = req.body;
        console.log(req.body);
        
        
        const result = await contactCollection.updateOne(
            { id: parseInt(id) }, 
            {
                $set: { phone, email, firstName, lastName, company, jobTitle } 
            }
        );

        if (result.modifiedCount > 0) {
            return res.json({ completed: true, message: "Contact updated successfully" });
        } else if (result.matchedCount === 0) {
            return res.json({ completed: false, message: "No contact found with the given ID" });
        } else {
            return res.json({ completed: false, message: "No changes made to the contact" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ completed: false, message: "Something went wrong" });
    }
});

app.delete("/delete-contact", async (req, res) => {
    try {
        
        const result = await contactCollection.deleteOne({ phone: req.body.phone });

        if (result.deletedCount > 0) {
            return res.json({ completed: true, message: "Contact deleted successfully" });
        } else {
            return res.status(404).json({ completed: false, message: "No contact found with the given phone number" });
        }
    } catch (e) {
        console.error("Error deleting contact:", e); 
        res.status(500).json({ completed: false, message: "Something went wrong" });
    }
});

app.listen(process.env.PORT , ()=>{
    console.log("Listning to port " + process.env.PORT);
    
})