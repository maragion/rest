import express from 'express';
import data from "./db.json" assert {type: 'json'};
import cors from "cors";
import fs from "fs"

const app = express();
const port = 5000;

import {changeTaskStatus} from "./taskStatus.js"
app.use(cors());
app.use(express.json());


//get

app.get("/users", (req, res) => {
    res.send(data.users);
})

app.get("/requests", (req, res) => {
    res.send(data.requests)
})

app.get("/tasks", (req, res) => {
    res.send(data.tasks)
})



// Get by id

app.get("/users:id", (req, res) => {
    let id = req.params.id;

    if (data.users[id]) {
        res.send(data.users[id]);
    } else res.status(404).send("Error: 404. User Not Found");

})

app.get("/requests:id", (req, res) => {
    let id = req.params.id;
    if (data.requests[id]) {
        res.send(data.requests[id]);
    } else
        res.status(404).send("Error: 404. Request no found");

})

app.get("/tasks/:id", (req, res) => {
    let id = req.params.id;
    res.send(data.tasks[id])
})
app.get("/tasks/:id/subTasks", (req, res) => {
    let id = req.params.id;
    res.send(data.tasks[id].subTasks)
})


// Post

app.post("/users", (req, res) => {
    data.users.push(req.body);
    res.send(data.users);

    fs.writeFile("db.json", JSON.stringify(data), err => {
            if (err) {
                console.log(err);
            } else console.log("Write Sucsesfully");
        }
    )
})

app.post("/requests", (req, res) => {
    data.requests.push(req.body);
    res.send(data.requests);
    fs.writeFile("./db.json", JSON.stringify(data), err => {
        if (err) {
            console.log(err);
        } else
            console.log("Write Sucsesfully");
    })
})

app.post("/tasks", (req, res) => {
    data.tasks.push(req.body);
    res.send(data.tasks);
    fs.writeFile("./db.json", JSON.stringify(data), err => {
        if (err) {
            console.log(err);
        } else
            console.log("Write Sucsesfully");
    })
})


app.post("/tasks/:id/subTasks", (req, res) => {
    let id = req.params.id;
    console.log(req.body)

    data.tasks[id].subTasks.push(req.body)
    changeTaskStatus(data.tasks[id])
    res.send(data.tasks);
})


//Patch

app.patch("/tasks/:id/subTasks/:subId", (req, res) => {
    let id = req.params.id;
    let subTaskId = req.params.subId;
    let stKey = "subTask";
    let completeKey = "isComplete";

    if ( stKey in req.body) {
        data.tasks[id].subTasks[subTaskId].subTask = req.body.subTask
        res.send(data.tasks[id].subTasks[subTaskId])
    } else if (completeKey in req.body) {
        data.tasks[id].subTasks[subTaskId].isComplete = req.body.isComplete
        changeTaskStatus(data.tasks[id])
        res.send(data.tasks)
    }
})


// Delete

app.delete("/tasks/:id", (req, res) => {
    let id = req.params.id;
    let taskId = 1
    if (data.tasks[id]) {
        data.tasks.splice(id, 1)
        data.tasks.map(value => {
            value.id = taskId;
            taskId++;
        })
        res.send(data.tasks)
    } else
        res.send("404: NotFound")
})

app.delete("/tasks/:id/subTasks/:subId", (req, res) => {
    let id = req.params.id;
    let subTaskId = req.params.subId;
    let subId = 1;

    if (data.tasks[id].subTasks[subTaskId]) {
        data.tasks[id].subTasks.splice(subTaskId, 1)
        data.tasks[id].subTasks.map(value => {
            value.subTaskId = subId;
            subId++;
        })
        res.send(data.tasks[id].subTasks)
    } else
        res.send("404: NotFound")
})

// Listen
app.listen(process.env.PORT || port, () => console.log(`BIP BUP on port:${port}`));























