const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
  task:String,
  list:String,
  description:String,
  user:String,
  createdAt: Date,
  status:String,
  userID:String,
},{
    versionKey:false
})

const TodosModel=mongoose.model("todo",todoSchema)

module.exports={
   TodosModel
}