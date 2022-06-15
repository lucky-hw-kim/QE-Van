import mongoose from "mongoose";
import ForumModel from "../Models/forumModel.js";
import UserModel from "../Models/userModel.js";



//Get All forum
export const getAllForums = async (req, res) => {

  try {
    const forums = await ForumModel.find().sort({ updatedAt : -1 })

    res.status(200).json(forums)
    
  } catch (error) {
    res.status(500).json(error)
  }

}

// Create forum
export const  createForum = async(req, res) => {
  const newForum = new ForumModel(req.body)
  try {
    await newForum.save();
    res.status(200).json("Forum Created")
  } catch (error) {
    res.status(500).json(error)
  }
}

//Get forum
export const  getForum = async(req, res) => {
  const id = req.params.id
  try {
    const forum = await ForumModel.findById(id)
    res.status(200).json(forum)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Update forum
export const  updateForum = async(req, res) => {

  const forumId = req.params.id
  const {userId} = req.body

  try {
    const forum = await ForumModel.findById(forumId)
    const user = await UserModel.findById(userId)

    if(forum.userId === user.id || user.isAdmin) {
      await forum.updateOne({ $set : req.body });
      res.status(200).json("Forum updated")
    } else {
      res.status(500).send("Not Authorized")
      
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

//Delete forum
export const  deleteForum = async(req, res) => {
  const forumId = req.params.id
  const {userId} = req.body

  try {
    const forum = await ForumModel.findById(forumId)
    const user = await UserModel.findById(userId)

    if(forum.userId === user.id || user.isAdmin) {
      await forum.deleteOne();
      res.status(200).json("Forum deleted successfully")
    } else {
      res.status(403).json("Action Forbidden")
    }
  } catch (error) {
    res.status(500).json(error)
  }
}






