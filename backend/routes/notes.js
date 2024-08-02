const express=require('express');
const router=express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchUser=require('../middleware/fetchUser')

router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes);}
    catch (error) {
        res.status(500).send("Internal server error");
    }
});

router.post('/addnote',fetchUser,[body('title','Title cannot be empty').isLength({min:1}),body('description','Description cannot be empty').isLength({min:1})],async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try {
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote);
    }catch (error) {
        res.status(500).send("Internal server error");
    }
});

router.put('/updatenote/:id',fetchUser,async (req,res)=>{
    try{
    const {title,description,tag}=req.body; 
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found!");}
    if(note.user.toString() !== req.user.id){return res.status(401).send("Action Not Allowed");}
    note=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});
    res.json({note});}
    catch (error) {
        res.status(500).send("Internal server error");
    }
});

router.delete('/deletenote/:id',fetchUser,async (req,res)=>{
    try{
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found!");}
    if(note.user.toString() !== req.user.id){return res.status(401).send("Action Not Allowed");}
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note is deleted","note":note});}
    catch (error) {
        res.status(500).send("Internal server error");
    }
});

module.exports=router; 