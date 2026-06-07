import { Router } from "express";
import { addProductController, deleteProductController, getProductByCategoryController, getProductByIdController, searchProductController, updateProductController, updateProductStockController } from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import isAuthrizeSellerMiddleware from "../middleware/isAuthorize.middleware.js";

const productRouter:Router = Router();

/**
 * @description Route for adding a new product. It validates the input payload and adds the product to the database.
 * @route POST /api/v1/product/add
 * @access Private
 */
productRouter.post("/add",auth,isAuthrizeSellerMiddleware,upload().array('images',3), addProductController);

/**
 * @description Route for updating an existing product. It validates the input payload and updates the product in the database.
 * @route PUT /api/v1/product/update/:id
 * @access Private
 */
productRouter.put("/update/:id",auth,isAuthrizeSellerMiddleware,updateProductController)

/**
 * @description Route for updating the stock of an existing product. It validates the input payload and updates the product stock in the database.
 * @route PUT /api/v1/product/stock/:id
 * @access Private
 */
productRouter.put("/stock/:id",auth,isAuthrizeSellerMiddleware, updateProductStockController);

/**
 * @description Route for fetching a product by its ID. It validates the product ID and retrieves the product from the database.
 * @route GET /api/v1/product/:id
 * @access Public
 */
productRouter.get("/:id", getProductByIdController);


/**
 * @description Route for fetching products by category. It validates the category parameter and retrieves the products from the database.
 * @route GET /api/v1/product/category/:category
 * @access Public
 */
productRouter.get("/category/:category", getProductByCategoryController);

/**
 * @description Route for fetching products by name,description,category or subcategory. It validates the search query parameter and retrieves the products from the database.
 * @route GET /api/v1/product/search?q=searchQuery
 * @access Public
 */

productRouter.get('/search',searchProductController)


/**
 * @description Route for deleting a product by its ID. It validates the product ID and deletes the product from the database.
 * @route DELETE /api/v1/product/delete/:id
 * @access Private
 */

productRouter.delete('/delete/:productId',auth,isAuthrizeSellerMiddleware, deleteProductController)


export default productRouter;
