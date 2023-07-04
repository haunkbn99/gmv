'use strict'

const express = require('express')
const MysqlDB = require('../../models/mysql')   
const {checkRequiredFieldInBody} = require('../../middleware')
const CategoryService = require('../../services/categoryService/categoryService')
const { verifyToken,adminRole } = require('../../middleware/verifyToken')

const categoryApi = express.Router()
const mysqlDb = new MysqlDB()
const categoryService = new CategoryService(mysqlDb)

categoryApi.get('/', async (req, res, next) => {
    try {
        let {categorysPerPage, pageNumber, orderType} = req.query
        const categoryFounded = await categoryService.getAllCategory(categorysPerPage, pageNumber, orderType)
        console.log(categoryFounded);
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: categoryFounded
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error
        })
    }
})

categoryApi.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        const categoryFounded = await categoryService.getCategoryById(id)

        return res.status(200).json({
            status: 200,
            message: "Success",
            data: categoryFounded
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message: error
        })
    }
})

categoryApi.post('/',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','main_category_id']),
    async (req, res, next) => {
        try {
            let {name,main_category_id} = req.body
            const insertedId = await categoryService.createCategory(name,main_category_id)
            console.log(insertedId)
            return res.status(200).json({
                status:200,
                message: "Create category successfully"
            })
        } catch (error) {
            return res.status(500).json({
                status:500,
                message: error
            })
        }
    })
categoryApi.put('/:id',verifyToken,adminRole,
    checkRequiredFieldInBody(['name','main_category_id']),
    async (req, res, next) => {
        let {id} = req.params
        try {
            let {name,main_category_id} = req.body
            await categoryService.updateCategory(id,name,main_category_id)
            return res.status(200).json({
                status:200,
                message: 'Updated category successfully'
            })
        } catch (error) {
            return res.status(500).json({
                status:500,
                message: error
            })
        }
    })

categoryApi.delete('/:id',verifyToken,adminRole,
    async (req, res, next) => {
        let {id} = req.params   
        try {
            await categoryService.deleteCategory(id)

            return res.status(200).json({
                status:200,
                message: 'Remove category successfully'
            })
        } catch (error) {
            return res.status(500).json({status:500,message: error})
        }
    })

module.exports = categoryApi