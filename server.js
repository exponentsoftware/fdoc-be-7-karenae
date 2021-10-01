const express = require('express');
const app = express();
const db = require("./model");


const Port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();


// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

app.get('/', (req, res) => {
    res.send('hello')
})




const todoRouter = require('./routes/todo')
const userRouter = require('./routes/userAuth')
const viewRouter = require('./routes/views')

app.use('/api',todoRouter)
app.use('/api',userRouter)
app.use('/api',viewRouter)

app.listen(Port,()=>{console.log('listening on 8080')})



