'use strict'
const express = require('express');
const MysqlDB = require('../../models/mysql');
const ProductService = require('../../services/productService/productService');
const productApi = express.Router();
const mysqlDb = new MysqlDB();
const productService = new ProductService(mysqlDb);
const {checkRequiredFieldInBody,checkRequiredFieldInQuery} = require('../../middleware/index')
const {verifyToken,adminRole} = require('../../middleware/verifyToken')

productApi.get('/', (req,res,next) => {
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProducts(productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/get-by-category-id/:category_id', (req,res,next) => {
    
    let {category_id} = req.params
    console.log(category_id);
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByCategoryId(category_id,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/get-by-category-id/:category_id', (req,res,next) => {
    
    let {category_id} = req.params
    console.log(category_id);
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByCategoryId(category_id,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})

productApi.get('/get-by-category-and-material/', (req,res,next) => {
    
    let {main_category_name,category_name,material,productsPerPage,pageNumber,orderType,search} = req.query;
    
    productService
    .getProductsByCategoryAndMaterial(main_category_name,category_name,material,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{   
        return res.status(500).json({status:500,message: err})
    })

})

productApi.get('/get-by-category-name/',checkRequiredFieldInQuery(['main_category', 'category']), (req,res,next) => {
    
    let {main_category, category,productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByCategoryName(main_category, category,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/get-by-main-category-id/:id', (req,res,next) => {
    
    let {id} = req.params
    console.log(id);
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByMainCategoryId(id,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/get-by-main-category-name/:name', (req,res,next) => {
    
    let {name} = req.params 
    let {productsPerPage,pageNumber,orderType,search} = req.query;
    productService
    .getProductsByMainCategoryName(name,productsPerPage,pageNumber,orderType,search)
    .then(listProduct => {
        return res.status(200).json({status:200,message:"Success",data: listProduct})
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })

})
productApi.get('/:id',(req,res,next)=>{
    let {id} = req.params
    console.log(id)
    productService
    .getProductById(id)
    .then(listProduct=>{
        return res.status(200).json({status:200,message:"Success",data: listProduct})
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.get('/get-by-slug/:slug',(req,res,next)=>{
    let {slug} = req.params
    console.log(slug)
    productService
    .getProductBySlug(slug)
    .then(listProduct=>{
        return res.status(200).json({status:200,message:"Success",data: listProduct})
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.get('/get-by-model-number/:code',(req,res,next)=>{
    let {code} = req.params
    let {productsPerPage,pageNumber,orderType} = req.query
    productService
    .getProductByCode(code,productsPerPage,pageNumber,orderType)
    .then(listProduct=>{
        return res.status(200).json({status:200,message:"Success",data: listProduct})
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.get('/get-by-title/:title',(req,res,next)=>{
    let {title} = req.params
    let {productsPerPage,pageNumber,orderType} = req.query;

    productService
    .getProductByTitle(title,productsPerPage,pageNumber,orderType)
    .then(listProduct=>{
        return res.status(200).json({status:200,message:"Success",data: listProduct})
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.get('/get-all-material/list/',(req,res,next)=>{
    console.log("Sadsdada")
    productService
    .getListMaterial()
    .then(listMaterial=>{
        return res.status(200).json({status:200,message:"Success",data: listMaterial})
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.post('/',verifyToken,adminRole,checkRequiredFieldInBody(['title','description','model_number','main_image_url','price','material','size','category_id']), (req,res,next)=>{
    let {title,description,model_number,main_image_url,url_image1,url_image2,url_image3,url_image4,price,material,size, category_id} = req.body
    console.log("sdadda",req.body)
    productService
    .createProduct(title,description,model_number,main_image_url,url_image1,url_image2,url_image3,url_image4,price,material,size, category_id)
    .then(result => { 
        return res.status(200).json({
            status:200,
            message: 'Post new product successfully'
        })
    })
    .catch(err => {
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.post('/upload-product-image/:id',verifyToken,adminRole,checkRequiredFieldInBody(['title','description','model_number','main_image_url','price','material','size', 'category_id']), (req,res,next)=>{
    let {id} = req.params
    let {title,description,model_number,main_image_url,price,material,size, category_id} = req.body
    console.log(description)
    productService
    .updateProduct(id,title,description,model_number,main_image_url,price,material,size, category_id)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message: 'Update product-image sucessfully',
            product: result
            })
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.put('/:id',verifyToken,adminRole, (req,res,next)=>{
    let {id} = req.params
    let {title,description,model_number,main_image_url,url_image1,url_image2,url_image3,url_image4,price,material,size, category_id,slug} = req.body
    console.log(req.body)
    productService
    .updateProduct(id,title,description,model_number,main_image_url,url_image1,url_image2,url_image3,url_image4,price,material,size, category_id,slug)
    .then(result=>{
        return res.status(200).json({  
            status:200,
            message: "Update product successfully",
            data:result
            })
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.delete('/:id',verifyToken,adminRole,(req,res,next)=>{
    let {id} = req.params
    productService
    .deleteProduct(id)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message: 'Detele product sucessfully',
            })
        
    })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.post('/upload-image/:product_id',verifyToken,adminRole, (req,res,next)=>{
    let {product_id} = req.params
    let {url_image1,url_image2,url_image3,url_image4} = req.body
    productService
    .uploadProductImage(product_id,url_image1,url_image2,url_image3,url_image4)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message: "Upload image successfully",
            data: result
          })
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})
productApi.put('/update-image/:product_id',verifyToken,adminRole, (req,res,next)=>{
    let {product_id} = req.params
    let {url_image1,url_image2,url_image3,url_image4} = req.body
    productService
    .updateProductImage(product_id,url_image1,url_image2,url_image3,url_image4)
    .then(result=>{
        return res.status(200).json({  
            status:200,
            message: "Update product-image successfully",
            data:result
            })
        })
    .catch(err=>{
        return res.status(500).json({status:500,message: err})
    })  
})

module.exports = productApi;