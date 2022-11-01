const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

const FoodModel = require("./models/Food")

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://shobhit:Mumbai123@crud.8svcpwf.mongodb.net/food?retryWrites=true&w=majority');

app.post('/createFood' , async (req , res)=>{
    const foodName = req.body.foodName
    const days = req.body.days
    console.log(foodName + days)
    const newFood = new FoodModel({foodName : foodName , daysSinceIAte : days});
    try{
        await newFood.save();
    }catch(err){
        console.log(err)
    }
    // res.json(food);
})

app.get('/read' , async (req , res)=>{
    FoodModel.find({} , (err , result)=> {
        if(err){
            res.json(err);
        }else{
            res.json(result)
        }
    });
})

app.listen(3001 ,()=>{
    console.log("SERVER RUNNING ON PORT 3001");
})