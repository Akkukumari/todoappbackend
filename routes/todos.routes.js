const express=require("express")
const {TodosModel}=require("../models/todos.model")
const {auth}=require("../middlewares/auth.middleware")

const todosRouter=express.Router()

// todosRouter.use(auth)
todosRouter.post("/",async(req,res)=>{
    console.log("req console",req.body)
try{
    const todo=new TodosModel(req.body)
    console.log("todo model",todo)
    await todo.save()
    res.json({msg:"New todo has been added",note:req.body})
}catch(err){
    res.json({error:err.message})
}
})

todosRouter.get("/",async(req,res)=>{
    try{
        const todos=await TodosModel.find({userID:req.body.userID})
        res.send(todos)
    }catch(err){
        res.json({error:err.message})
    }
    })

todosRouter.patch("/update/:todoID",async(req,res)=>{
    const {todoID}=req.params
    try{
    const todo=await TodosModel.findOne({_id:todoID})
    await TodosModel.findByIdAndUpdate({_id:todoID},req.body)
    res.json({msg:`${todo.task} has been updated`})
}catch(err){
    res.json({error:err})
}
})

todosRouter.delete("/delete/:todoID",async(req,res)=>{
    
    const {todoID}=req.params
    try{
    const todo=await TodosModel.findOne({_id:todoID})
    await TodosModel.findByIdAndDelete({_id:todoID})
    res.json({msg:`${todo.title}has been updated`})
}catch(err){
    res.json({error:err})
}
})

module.exports={
    todosRouter
}