'use strict'

const express = require('express')
const MysqlDB = require('../../models/mysql')
const {checkRequiredFieldInBody} = require('../../middleware')
const MainCategoryService = require('../../services/mainCategoryService/mainCategory')
const mainCategoryApi = express.Router()
const mysqlDb = new MysqlDB()
const mainCategoryService = new MainCategoryService(mysqlDb)
const { verifyToken,adminRole } = require('../../middleware/verifyToken')


mainCategoryApi.get('/', async (req, res, next) => {
    try {
        let {itemsPerPage, pageNumber, orderType} = req.query
        const result = await mainCategoryService.getAllMainCategory(itemsPerPage, pageNumber, orderType)

        return res.status(200).json({status:200, message:"Success",data:result})
    } catch (error) {
        return res.status(500).json({status:500,message: error})
    }
})

mainCategoryApi.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const mainCategory = await mainCategoryService.getMainCategoryById(id)

        return res.status(200).json({status:200, message:"Success",data:mainCategory})
    } catch (error) {
        return res.status(500).json({status:500,message: error})
    }
})

mainCategoryApi.post('/',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','description','url_image']),
    async (req, res, next) => {
        try {
            let {name,description,url_image,sub_image} = req.body
            const insertedId = await mainCategoryService.createMainCategory(name,description,url_image,sub_image)

            return res.status(200).json({status:200,message: 'Create new main-category successfully'})
        } catch (error) {
            return res.status(500).json({status:500,message: error})
        }
    })
mainCategoryApi.put('/:id',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','description','url_image']),
    async (req, res, next) => {
        let {id} = req.params
        try {
            let {name,description,url_image,sub_image} = req.body
            await mainCategoryService.updateMainCategory(id,name,description,url_image,sub_image)
            return res.status(200).json({status:200,message: 'Updated main-category successfully'})
        } catch (error) {
            return res.status(500).json({status:500,message: error})
        }
    })

mainCategoryApi.delete('/:id',verifyToken,adminRole,
    async (req, res, next) => {
        let {id} = req.params   
        try {
            await mainCategoryService.deleteMainCategory(id)

            return res.status(200).json({status:200,message: `Remove main_category with id ${id} successfully`})
        } catch (error) {
            return res.status(500).json({status:500,message: error})
        }
    })

module.exports = mainCategoryApi