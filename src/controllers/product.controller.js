import { Product } from "../models/product.model.js";


export const findAll = async (req, res, next) => {
    const limit = req.query.limit;
    const limitValue = limit ? parseInt(limit, 10) : null;

    try {
        // Apply limit if provided
        const query = Product.find({});
        if (limitValue) {
            // this limit is part of Mongoose
            query.limit(limitValue)
        }

        const products = await query.exec();
        const productLength = products.length.toString();

        return res.status(200).json({
            success: true,
            data: products,
            message: "Products retrieved successfully",
            error: null,
            rows: productLength
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const findByCategory = async (req, res, next) => {
    try {
        const { categories } = req.query;
        const selectedCategories = categories.split(',').map(category => category.trim());
        console.log(selectedCategories)
        const productsByCategory = await Product.find({ category: { $in: selectedCategories } })

        if (productsByCategory.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Products by Cateogries retrieve succesfully!",
                data: productsByCategory
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'No products found for the specified categories.'
            });
        }


    } catch (err) {
        next(err)
    }
}

