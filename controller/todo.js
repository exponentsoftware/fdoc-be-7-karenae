const { Op } = require("sequelize");
const db = require("../model");
const Todo = db.todo;


const createTodo = async (req,res)=>{
    try{
        let { _id } = req.user
        const {userName, todoTitle, todoCompleted, todoCategory} = req.body

        let todo = await Todo.findByPk({todoTitle:todoTitle})
        if(todo) return res.status(403).json({message:'todo already exists',})

        const newTodo = new Todo({userName:userName,todoTitle:todoTitle,todoCategory:todoCategory,todoCompleted:todoCompleted,userId:_id})
        let saveTodo = await newTodo.create()
        res.status(201).json({status: 'success',message: saveTodo})
    }
    catch(err){
        console.log(err);
    }
}
// Add capability to sort the data by created_at

const getTodos = async (req,res) => {
    try{
        // let { _id } = req.user
        const { limit, skip, page } = req.pagination
        let [todos] = await Todo.aggregate([
            { $match: {$and: matchFilter}},
            {'$facet': {
              meta: [ { $count: 'total' }, { $addFields: { page: page } } ],
              data: [ { $skip: skip }, { $limit: limit } ], 
            }},
            { $project:  global.paginationProject },
        ])
        if(todos.length == 0) return res.json({message:' no todos created'});
        res.status(200).json({data:todos,metadata:todos.length});
    }
    catch(err){
        console.log(err)
    }
}

// for current day
// for a week
// for a month

const updateTodo = async (req,res) => {
    try{
        const {todoTitle, todoCompleted, todoCategory,todoid} = req.body
        let todo = await Todo.Update({where:{todoId:todoid}})
        if (todo === null) res.status(403).json({ status: 'error', message: 'failed to update todo' })
        else res.status(200).json({ status: 'success', message: 'successfully Updated' })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { createTodo, getTodos,updateTodo }