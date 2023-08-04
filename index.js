const express = require("express");
const data = require("./db.json");

const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.get("/users", (req, res) => {
    // res.status(200).send("Hello")
    res.json(data)
})

app.post("/users", (req, res)  => {
        data.users.push(req.body)
        res.json(data)
        console.log(data)

})


// Listen
app.listen(process.env.PORT || port, () => console.log(`BIP BUP on port:${port}`));























