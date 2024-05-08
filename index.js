import express from "express"


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}));

const PORT = 3300;
app.listen(PORT, () => console.log("---------- Listening http://localhost:" + PORT));




