const express = require("express");
const data = require("./db.json");
const cors = require("cors");
const fs = require("fs")

const app = express();
const port = 5000;

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


// Listen
app.listen(process.env.PORT || port, () => console.log(`BIP BUP on port:${port}`));























