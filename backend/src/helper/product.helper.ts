import { prisma } from "../lib/prisma";
import { uploadProduct } from "../middleware/upload.middleware";

type ProductPayload = {
  id?:unknown;
  category: unknown;
  subCategory: unknown;
  name: unknown;
  price: unknown;
  description: unknown;
  images: unknown;
  stock: unknown;
  discount?: unknown;
  orderId: unknown;
  sellerId: unknown;
  keyword: unknown;
  comments?: unknown;
  rating?: unknown;
};

type HelperResult<T = unknown> = {
  message: string;
  success: boolean;
  data?: T;
  statusCode?: number;
};

/**
 * Adds a new product to the database after validating the input payload.
 * @param payload - The product data to be added.
 * @returns A promise that resolves to a HelperResult indicating the success or failure of the operation.
 * @access private
 */
const addProduct = async (payload: ProductPayload): Promise<HelperResult> => {
  const {
    category,
    subCategory,
    name,
    price,
    description,
    images,
    stock,
    discount,
    sellerId,
    keyword,
    rating,
  } = payload;

  if (
    !category ||
    !subCategory ||
    !name ||
    price === undefined ||
    price === null ||
    !description ||
    stock === undefined ||
    stock === null ||
    keyword === undefined ||
    keyword === null
  ) {
    return {
      message: "All required product fields must be provided.",
      success: false,
      statusCode: 400,
    };
  }


  const seller = await prisma.user.findUnique({
    where: { id: Number(sellerId) }
  });

  if (!seller) {
    return {
      message: "Seller not found for the provided sellerId.",
      success: false,
      statusCode: 404,
    };
  }

  const imageArray = await uploadProduct(images as [string]);

  const keywordArray = keyword ? typeof keyword === 'string' ? keyword.split(',').map((kw) => kw.trim()) : [] : []

  if (imageArray.length === 0) {
    return {
      message: "Product image field must be a non-empty array of strings.",
      success: false,
      statusCode: 400,
    };
  }

  if (keywordArray.length === 0) {
    return {
      message: "Product keyword field must be a non-empty array of strings.",
      success: false,
      statusCode: 400,
    };
  }



  const priceNumber = Number(price);
  const stockNumber = Number(stock);
  const discountNumber = discount === undefined || discount === null ? 0 : Number(discount);
  const sellerIdNumber = Number(sellerId);
  const ratingNumber = rating === undefined || rating === null ? 0 : Number(rating);

  if (Number.isNaN(priceNumber) || priceNumber < 0) {
    return {
      message: "Product price must be a valid non-negative number.",
      success: false,
      statusCode: 400,
    };
  }

  if (!Number.isInteger(stockNumber) || stockNumber < 0) {
    return {
      message: "Product stock must be a valid non-negative integer.",
      success: false,
      statusCode: 400,
    };
  }

  if (Number.isNaN(discountNumber) || discountNumber < 0) {
    return {
      message: "Product discount must be a valid non-negative number.",
      success: false,
      statusCode: 400,
    };
  }


  if (!Number.isInteger(sellerIdNumber) || sellerIdNumber <= 0) {
    return {
      message: "Product sellerId must be a valid positive integer.",
      success: false,
      statusCode: 400,
    };
  }

  if (!Number.isInteger(ratingNumber) || ratingNumber < 0 || ratingNumber > 5) {
    return {
      message: "Product rating must be an integer between 0 and 5.",
      success: false,
      statusCode: 400,
    };
  }


  

  const newProduct = await prisma.product.create({
    data: {
      category: String(category),
      subCategory: String(subCategory),
      name: String(name),
      price: priceNumber,
      description: String(description),
      image: imageArray,
      stock: stockNumber,
      discount: discountNumber,
      sellerId: sellerIdNumber,
      keyword: keywordArray,
      rating: ratingNumber,
    }
  });

  return {
    message: "Product added successfully !",
    success: true,
    statusCode: 201,
    data: newProduct,
  };
};

/**
 * 
 * @description Updates an existing product in the database after validating the input payload and product ID.
 * @param payload - The product data to be updated, including the product ID.
 * @returns A promise that resolves to a HelperResult indicating the success or failure of the operation.
 */

const updateProduct = async(payload: ProductPayload)=>{
  const {id, category, subCategory, name, price, description, images, discount,  keyword, comments, rating } = payload;

  if(!id){
    return {
      message:'Product id is required for updating a product.',
      success:false,
      statusCode:400
    }
  }

  const existingProduct = await prisma.product.findUnique({
    where:{id:Number(id)}
  })

  if(!existingProduct){
    return {
      status:404,
      message:'Product not found with the provided id.',
      success:false
    }
  }

  const updatedProduct = await prisma.product.update({
    where:{id:Number(id)},
    data:{
      category: category !== undefined ? String(category) : existingProduct.category,
      subCategory: subCategory !== undefined ? String(subCategory) : existingProduct.subCategory,
      name: name !== undefined ? String(name) : existingProduct.name,
      price: price !== undefined ? Number(price) : existingProduct.price,
      description: description !== undefined ? String(description) : existingProduct.description,
      image: images !== undefined ? (Array.isArray(images) ? images.map(String) : existingProduct.image) : existingProduct.image,
      discount: discount !== undefined ? Number(discount) : existingProduct.discount,
      keyword: keyword !== undefined ? (Array.isArray(keyword) ? keyword.map(String) : existingProduct.keyword) : existingProduct.keyword,
      comments:comments!==undefined?(Array.isArray(comments)?comments:existingProduct.comments):existingProduct.comments,
      rating: rating !== undefined ? Number(rating) : existingProduct.rating,
    }
  })
    
  if(!updateProduct){
    return {
      status:500,
      message:'Unexpected error occurred while updating the product.',
      success:false
    }
  }

  return {
    status:200,
    message:'Product updated successfully !',
    success:true,
    data:updatedProduct
  }

}

const updateProductStock = async(productId:number,newStock:number)=>{

  if(!productId || typeof productId !=="number"){
    return {
      message:'Product id is required for updating product stock.',
      success:false,
      statusCode:400
    }
  }

  if(newStock === undefined || newStock<0){
    newStock = 1;
  }

  const productUpdate = await prisma.product.findUnique({
    where:{
      id:productId
    }
    },
    
  )

  if(!productUpdate){
    return {
      message:'Product not found with the provided id for updating stock.',
      success:false,
      statusCode:404
    }
  }

  const updatedStock = productUpdate.stock - newStock;

  if(updatedStock < 0){
    return {
      message:'Insufficient stock available for the product.',
      success:false,
      statusCode:400
    }
  }

  const updatedProduct = await prisma.product.update({
    where:{id:productId},
    data:{stock:updatedStock}
  })

  return {
    status:200,
    message:'Product stock updated successfully !',
    success:true,
    data:updatedProduct
  }

}

const getProductById = async(id:number)=>{

  if(!id){
    return {
      status:400,
      message:'Product id is required for fetching a product.',
      success:false
    }
  }

  const product = await prisma.product.findUnique({
    where:{id}
  })

  if(!product){
    return {
      status:404,
      message:'Product not found with the provided id.',
      success:false
    }
  }

  return {
    status:200,
    message:'Product fetched successfully !',
    success:true,
    data:product
  }
}

const getProductByCategory = async(category:string)=>{
  if(!category){
    return {
      status:400,
      message:'Product category is required for fetching products by category.',
      success:false
    }
  }

  const productsOfCategory = await prisma.product.findMany({
    where:{category}
  })

  if(!productsOfCategory || productsOfCategory.length === 0){
    return {
      status:404,
      message:'No products found for the provided category.',
      success:false
    }
  }

  return {
    status:200,
    message:`Product fetched successfully for category ${category} !`,
    success:true,
    data:productsOfCategory as []
  }
}

const searchProduct = async(query:string)=>{

  const searchResults = await prisma.product.findMany({
    where:{
      OR:[
        {name:{contains:query,mode:'insensitive'}},
        {description:{contains:query,mode:'insensitive'}},
        {category:{contains:query,mode:'insensitive'}},
        {subCategory:{contains:query,mode:'insensitive'}}
      ]
    }
  })

  if(!searchResults || searchResults.length === 0){
    return {
      status:404,
      message:`No products found for the query : ${query}`,
      success:false
    }
  }

  return {
    status:200,
    message:'Products fetched successfully !',
    success:true,
    data:searchResults
  }
}

const deleteProduct = async(pId:number)=>{

  const existingProduct = await prisma.product.findUnique({
    where:{
      id:pId
    }
  })

  if(!existingProduct){
    return {
      status:404,
      message:'Product not found with the provided id for deletion.',
      success:false
    }
  }

  const deletedProduct = await prisma.product.delete({
    where:{
      id:pId
    }
  })

  return {
    status:200,
    message:'Product deleted successfully !',
    success:true,
    data:deletedProduct
  }
}

export { 
  addProduct,
  updateProduct,
  getProductById,
  getProductByCategory,
  searchProduct,
  updateProductStock,
  deleteProduct
};
