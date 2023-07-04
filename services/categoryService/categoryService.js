'use strict'
const mysql = require('mysql');
const logger = require('../../logger');
const { to } = require('../../helper/to');
class CategoryService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }

    getAllCategory(itemsPerPage, pageNumber, orderType) {
        return new Promise(async (resolve, reject) => {
            let offsetDb, orderByDb
            orderType = orderType ? orderType : 'newest'
            pageNumber = pageNumber ? pageNumber : 1
            if (!itemsPerPage) {
                itemsPerPage = 100
                offsetDb = 0
            } else {
                offsetDb = itemsPerPage * (pageNumber - 1)
            }
            if (orderType === 'oldest') {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = `
                SELECT * FROM category
                ORDER BY create_at ${mysql.escape(orderByDb).split(`'`)[1]}
                LIMIT ${itemsPerPage}
                OFFSET ${mysql.escape(offsetDb)}
            `
            console.log(query);
            let [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[CategoryService][getCatergories] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            } else {
                return resolve(result)
            }

        })
    }
    getCategoryById(id) {
        return new Promise(async (resolve, reject) => {
            try {  
                const query2 = `
                SELECT category.*,main_category.name AS main_category_name FROM category JOIN main_category 
                ON category.main_category_id = main_category.id 
                WHERE category.id = ${mysql.escape(id)}
                `
                const [err, categoryResult] = await to(this.mysqlDb.poolQuery(query2))
                if (err) {
                    logger.error(`[CategoryService][getCategoryById] errors: `, err)
                    return reject(err?.sqlMessage ? err.sqlMessage : err)
                }
                if (!categoryResult.length) {
                    return reject(`category with id ${id} not found`)
                }
                return resolve(categoryResult[0])

            } catch (error) {
                console.log(error);
                reject(error)
            }

        })
    }
    getCategoryByName(name) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT * FROM category WHERE name = ${mysql.escape(name)}
            `

            const [err, categoryResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[CategoryService][getCategoryByName] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(categoryResult)
        })
    }
    createCategory(name, main_category_id) {
        return new Promise(async (resolve, reject) => {
            const query = `
                INSERT INTO category(name,main_category_id)
                VALUES(${mysql.escape(name)},${mysql.escape(main_category_id)})`

            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                console.log(err);
                logger.error(`[CategoryService][createCategory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(result?.insertId)
        })
    }
    updateCategory(id, name, main_category_id) {
        return new Promise(async (resolve, reject) => {
            const query = `
                UPDATE category SET 
                name = ${mysql.escape(name)},
                main_category_id = ${mysql.escape(main_category_id)}
                WHERE id = ${mysql.escape(id)}
            `
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[CategoryService][updateCategory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (result.affectedRows === 0) {
                return reject(`Category with id ${id} not found`)
            }

            return resolve(result)
        })
    }
    deleteCategory(id) {
        return new Promise(async (resolve, reject) => {
            try {
            
                const query = `
                    DELETE FROM category
                    WHERE id = ${mysql.escape(id)}
                `
                let result = await to(this.mysqlDb.poolQuery(query))
             
                if (result.affectedRows === 0) {
                    return reject(`category with id ${id} not found`)
                }
        
                return resolve(`delete successfully`);
            } catch (err) {
                logger.error(`[CategoryService][deleteCategory] errors: `, err)
               
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
          
        })
    }

}


module.exports = CategoryService