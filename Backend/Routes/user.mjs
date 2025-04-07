"use strict"

import express from "express";
const router = express.Router();
import User from "../Models/User.mjs"
import { checkUser, addUser, updateUser } from "../RouterControllers/userController.mjs";

export default router;

//Create a user
router.post("/create", async (req, res) => {
    //Must check if the user exists
    const recieved = req.body;
    //body must be all of the information about the user on creation... See user model 
    const user = new User(recieved)
    
    if(checkUser(user)){
        res.json("User Already Exists")
        res.status(404)
    }else{
        addUser(user)
        res.json("User Added")
        res.status(200)
    }
});

router.put("/update" , async (req,res) =>{
    //to update an existing user
    const recieved = req.body; 
    const user = new User(recieved);
    if(checkUser(user)){
        //user exists which is what we want 
        updateUser(user)
        res.json(`Updated ${user.email} successfully`);
        res.status(202);
    }else{
        res.json("User Not Found");
        res.status(404);
    }
});

router.put("/requestFriend/:userID/:friendId", async (req,res) => {
    const userId = req.params.userID;
    const friendID = req.params.friendId;
    //the user must exist given itll be a refernce from an add friend request

    //needs a reference to the current logged in user
})



//Edit an Existing User