import "dotenv/config";
import "./config/db.js";
import express from "express"
import productRoute from "./src/routes/product.routes.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}));

app.use("/api/v1/products", productRoute)

const PORT = 3300;
app.listen(PORT, () => console.log("---------- ✅Listening http://localhost:" + PORT));




