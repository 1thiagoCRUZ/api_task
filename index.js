require("dotenv").config();
const express = require("express");
const app = express();

const taskUsers = require("./routes/taskRoutes");
const notesUsers = require("./routes/notesRoutes");

app.use(express.json());


app.use("/", taskUsers);
app.use("/", notesUsers);

app.listen(process.env.APP_PORT, ()=>{
    console.log("Servidor rodando na porta:", process.env.APP_PORT)
})