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

export const findOne = async (req, res) => {
    const { id } = req.params

    try {
        const productFound = await Product.findOne({ _id: id })

        if (!productFound) {
            return res.status(200).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Single Product retrieved succesfully",
            data: productFound
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            Error: "Internal server error",
            details: err
        })
    }
}

export const findNew = async (req, res) => {
    const limit = req.query.limit
    const limitValue = limit ? parseInt(limit, 10) : null

    try {
        const query = Product.find({ new: true })

        if (limitValue) {
            query.limit(limitValue)
        }

        const newProducts = await query.exec()
        const newProductsLenght = newProducts.length.toString()

        return res.status(200).json({
            success: true,
            message: "New Products retrieve succesfully",
            data: newProducts,
            count: newProductsLenght
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            details: err
        })
    }
}

export const findAllProductNames = async (req, res) => {
    try {
        // Find all products and project only the 'name' field
        const products = await Product.find({}, 'name');

        // Extract just the names from the products
        const productNames = products.map(product => product.name);
        const productsNmaesLength = productNames.length.toString()

        // Send the response with the list of product names
        return res.status(200).json({
            success: true,
            message: "Product names retrieved successfully",
            data: productNames,
            count: productsNmaesLength
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
}

export const findByCategory = async (req, res, next) => {
    const limit = req.query.limit
    const limitValue = limit ? parseInt(limit, 10) : null

    const { categories } = req.query;

    if (!categories) {
        return res.status(400).json({
            success: false,
            message: "Categories parameter is required."
        })
    }

    const selectedCategories = categories.split(',').map(category => category.trim());

    try {
        const query = Product.find({ category: { $in: selectedCategories } })

        if (limitValue) {
            query.limit(limitValue)
        }

        const productsByCategory = await query.exec()
        const productsByCategoryLength = productsByCategory.length.toString()

        if (productsByCategory.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Products by Cateogries retrieve succesfully!",
                data: productsByCategory,
                count: productsByCategoryLength
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

export const findByArea = async (req, res, next) => {

    const limit = req.query.limit
    const limitValue = limit ? parseInt(limit, 10) : null
    const { areas } = req.query;

    if (!areas) {
        return res.status(400).json({
            success: false,
            message: "Areas parameter is required"
        })
    }

    const selectedAreas = areas.split(',').map(area => area.trim());

    try {

        const query = Product.find({ area: { $in: selectedAreas } })

        if (limitValue) {
            query.limit(limitValue)
        }

        const productsByArea = await query.exec()
        const productsByAreaLength = parseInt(productsByArea.length, 10)

        if (productsByArea.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Products by Cateogries retrieve succesfully!",
                data: productsByArea,
                count: productsByAreaLength
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'No products found for the specified categories.'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error", details: err });
    }
}

