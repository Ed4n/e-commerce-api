import { Router } from 'express'
import { findAll, findAllProductNames, findByArea, findByCategory, findNew, findOne } from '../controllers/product.controller.js'

const router = Router()

router.get("/categories", findByCategory)
router.get("/areas", findByArea)
router.get("/new", findNew)

router.get("/", findAll)
router.get("/products-names", findAllProductNames)
router.get("/:id", findOne)


export default router;