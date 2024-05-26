import mongoose from "mongoose";

const { Schema, model } = mongoose

const ProductSchema = new Schema({
    name: String,
    description: String,
    category: String,
    area: String,
    price: Number,
    new: Boolean
})

export const Product = model("Products", ProductSchema)


