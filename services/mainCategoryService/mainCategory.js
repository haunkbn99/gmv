'use strict'
const mysql = require('mysql');
const logger = require('../../logger');
const { to } = require('../../helper/to');
class MainCategoryService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }

    getAllMainCategory(itemsPerPage, pageNumber, orderType) {
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
                SELECT * FROM main_category
                ORDER BY create_at ${mysql.escape(orderByDb).split(`'`)[1]}
                LIMIT ${itemsPerPage}
                OFFSET ${mysql.escape(offsetDb)}
            `
            console.log(query);
            let [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCategoryService][getMainCatergories] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            } else {
                return resolve(result)
            }

        })
    }
    getMainCategoryById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query1 = `
            SELECT * FROM category WHERE main_category_id = ${mysql.escape(id)}
            `
            const [err1,result] = await to(this.mysqlDb.poolQuery(query1))
            if(err1) {
                return reject(`Sql err ${err1}`)
            }
            const query = `
                SELECT * FROM main_category WHERE id = ${mysql.escape(id)}
            `
            const [err, categoryResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCategoryService][getCategoryById] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (!categoryResult.length) {
                return reject(`category with id ${id} not found`)
            }
            let subCategory = Object.assign(result)
            categoryResult[0].sub_category = subCategory
            return resolve(categoryResult[0])
            } catch (error) {
                return reject(`Sql error`)
            }
            
        })
    }
    getMainCategoryByName(name) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT * FROM main_category WHERE name = ${mysql.escape(name)}
            `

            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCategoryService][getMainCategoryByName] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(categoryResult)
        })
    }
    createMainCategory(name, description, url_image,sub_image) {
        return new Promise(async (resolve, reject) => {
            const query = `
                INSERT INTO main_category(name,description,url_image,sub_image)
                VALUES(${mysql.escape(name)},${mysql.escape(description)},${mysql.escape(url_image)},${mysql.escape(sub_image)})`

            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                console.log(err);
                logger.error(`[MainCategoryService][createMainCategory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(result?.insertId)
        })
    }
    updateMainCategory(id, name, description, url_image, sub_image) {
        return new Promise(async (resolve, reject) => {
            const query = `
                UPDATE main_category SET 
                name = ${mysql.escape(name)},
                description = ${mysql.escape(description)},
                url_image = ${mysql.escape(url_image)},
                sub_image = ${mysql.escape(sub_image)}
                WHERE id = ${mysql.escape(id)}
            `
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[MainCategoryService][updateMaiCategory] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (result.affectedRows === 0) {
                return reject(`MainCategory with id ${id} not found`)
            }

            return resolve(result)
        })
    }
    deleteMainCategory(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.mysqlDb.beginTransaction()
                const query =
                `
                    DELETE post FROM post JOIN category ON post.category_id = category.id
                    JOIN main_category ON main_category.id = category.main_category_id 
                    WHERE main_category_id = ${mysql.escape(id)}
                `
                let result = await this.mysqlDb.poolQuery(query)
                
                const query0 =
                `
                    DELETE product_image FROM product_image 
                    JOIN product ON product_image.product_id = product.id
                    JOIN category ON product.category_id = category.id
                    JOIN main_category ON main_category.id = category.main_category_id 

                    WHERE main_category_id = ${mysql.escape(id)} 
                `
                let result0 = await this.mysqlDb.poolQuery(query0)

                const query1 =
                `
                    DELETE product FROM product JOIN category ON product.category_id = category.id
                    JOIN main_category ON main_category.id = category.main_category_id 
                    WHERE main_category_id = ${mysql.escape(id)}
                `
                let result1 = await this.mysqlDb.poolQuery(query1)
                const query2 =  `
                DELETE FROM category
                WHERE main_category_id = ${mysql.escape(id)}
                `
                let result2 = await this.mysqlDb.poolQuery(query2)

                const query3 = `
                DELETE FROM main_category
                WHERE id = ${mysql.escape(id)}
                `
                let result3 = await this.mysqlDb.poolQuery(query3)
                if (result3.affectedRows === 0) {
                    return reject(`main category with id ${id} not found`)
                }
                await this.mysqlDb.commit()
                return resolve()
            } catch (err) {
                logger.error(`[CategoryService][deleteCategory] errors: `, err)
                await this.mysqlDb.rollback()
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
        })
    }

}


module.exports = MainCategoryService