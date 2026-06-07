import type { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { addProduct, deleteProduct, getProductByCategory, getProductById, searchProduct, updateProduct, updateProductStock } from "../helper/product.helper";

/**
 * @description Controller for adding a new product. It validates the input payload and adds the product to the database.
 * @returns {Promise<void>} A promise that resolves to an API response indicating the success or failure of the operation.
 */
const addProductController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {

  const images = req.files as Express.Multer.File[] | undefined;
  const result = await addProduct({ ...req.body, images });


  return ApiResponse(
    res,
    result.success ? 201 : result.statusCode ?? 400,
    result.message,
    result.success ? result.data : null,
    result.success,
  );
});

/**
 * @description Controller for updating an existing product. It validates the input payload and updates the product in the database.
 * @returns {Promise<void>} A promise that resolves to an API response indicating the success or failure of the operation.
 */

const updateProductController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {

  const {id} = req.params

  if(!id){
    return ApiResponse(
      res,
      400,
      "Product id is required !",
      null,
      false
    )
  }
  const updateProductResult = await updateProduct({id:Number(id),...req.body});
  
  if(updateProductResult.success){
    return ApiResponse(
      res,
      200,
      "Product updated successfully !",
      updateProductResult?.data && updateProductResult.data,
      true
    )
  }
  else{
    return ApiResponse(
      res,
      400,
      "Failed to update the product. "+updateProductResult?.message,
      null,
      false
    )
  }
})


/**
 * @description Controller for updating the stock of an existing product. It validates the input payload and updates the product stock in the database.
 * @returns {Promise<void>} A promise that resolves to an API response indicating the success or failure of the operation.
 */
const updateProductStockController:RequestHandler = asyncHandler(async(req:Request,res:Response)=>{
  const {id} = req.params
  const {stock} = req.body
  if(!id || stock === undefined){
    return ApiResponse(
      res,
      400,
      "Product id and stock value are required for updating product stock !",
      null,
      false
    )
  }


  const updateStockResponse = await updateProductStock(Number(id),Number(stock));

  if(!updateStockResponse.success){
    return ApiResponse(
      res,
      400,"Failed to update product stock. "+updateStockResponse?.message,
      null,
      false
    )
  }


    return ApiResponse(
      res,
      200,
      "Product stock updated successfully !",
      updateStockResponse?.data && updateStockResponse.data,
      true
    )
})


/**
 * @description Controller for fetching a product by its ID. It validates the product ID and retrieves the product from the database.
 * @returns {Promise<void>} A promise that resolves to an API response indicating the success or failure of the operation.
 */
const getProductByIdController:RequestHandler = asyncHandler(async(req,res)=>{
  const {id} = req.params

  if(!id){
    return ApiResponse(
      res,
      400,
      "Product id is required !",
      null,
      false
    )
  }

  const product = await getProductById(Number(id));

  if(!product){
    return ApiResponse(
      res,
      404,
      "Either the product is not found or it has been deleted !",
      null,
      false
    )
  }
   return {
      status:200,
      message:'Product fetched successfully !',
      success:true,
      data:product
    }
})

/**
 * @description Controller for fetching products by category. It validates the category and retrieves the products from the database.
 * @returns {Promise<void>} A promise that resolves to an API response indicating the success or failure of the operation.
 */
const getProductByCategoryController:RequestHandler = asyncHandler(async(req,res)=>{
  const {category} = req.body

  const productByCategory = await getProductByCategory(String(category));

  if(Array.isArray(productByCategory) &&!productByCategory.length){
    return ApiResponse(
      res,
      404,
      "No products found for the specified category !",
      null,
      false
    )
  }

  return ApiResponse(
    res,
    200,
    "Products fetched successfully !",
    productByCategory,
    true
  );


})

/**
 * @description Controller for fetching products by their name or the description or can be category or sub-category. 
 * @access Public
 * @returns {Promise<void>} A promise that resolves to an API response indicating the success or failure of the operation.
 */
const searchProductController:RequestHandler = asyncHandler(async(req,res)=>{
  const {q:query} = req.params

    if(!query || typeof query !== 'string' || query.trim().length<3){
    return {
      status:400,
      message:'A valid search query of at least 3 characters is required for searching products.',
      success:false
    }
  }

  const searchResult = await searchProduct(String(query));

  if(!searchResult.success && searchResult.data?.length){
    return ApiResponse(
      res,
      400,
      'No product found with provided search query !',
      null,
      false
    )
  }

  return ApiResponse(
    res,
    200,
    'Products fetched successfully !',
    {
      ...searchResult.data,
      totalProduct:searchResult.data?.length
    },
    true,
  )
 
})


const deleteProductController:RequestHandler = asyncHandler(async(req,res)=>{
  const productId = req.params.productId;

  if(!productId || typeof productId !== 'number'){
    return ApiResponse(
      res,
      400,
      "A valid product id is required for deleting a product !",
      null,
      false
    )
  }

  const deleteProductResponse = await deleteProduct(productId);

  if(!deleteProductResponse.success){
    return ApiResponse(
      res,
      400,
      "Failed to delete the product. "+deleteProductResponse?.message,
      null,
      false
    )
  }
  return ApiResponse(
    res,
    200,
    "Product deleted successfully !",
    deleteProductResponse?.data && deleteProductResponse.data,
    true
  )

})
export { 
  addProductController,
  updateProductController,
  getProductByIdController,
  getProductByCategoryController,
  searchProductController,
  updateProductStockController,
  deleteProductController
};
