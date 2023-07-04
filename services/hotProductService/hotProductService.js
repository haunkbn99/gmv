'use strict'
const mysql = require('mysql');
const { orderTypeSetting } = require('../../config/index');
const logger = require('../../logger');
const { to } = require('../../helper/to');

class HotProductService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }
    getHotProducts(productsPerPage, pageNumber, orderType, search) {
        return new Promise(
            async (resolve, reject) => {
                let offsetDb = 0, orderByDb;
                orderType = orderType ? orderType : 2
                pageNumber = pageNumber ? pageNumber : 1
                productsPerPage = productsPerPage ? productsPerPage : 1000
                offsetDb = productsPerPage * (pageNumber - 1)
                search = search ? search : ""
                if (orderType == orderTypeSetting.ASC) {
                    orderByDb = 'ASC'
                } else {
                    orderByDb = 'DESC'
                }
                const query =
                    `SELECT p.* FROM product as p  JOIN hot_product as hp
                    ON p.id = hp.product_id 
                    WHERE 
                    (p.title LIKE ${mysql.escape('%' + search + '%')}
                    OR p.description LIKE ${mysql.escape('%' + search + '%')})
                    ORDER BY p.create_at ${mysql.escape(orderByDb).split(`'`)[1]}
                    LIMIT ${productsPerPage}
                    OFFSET ${mysql.escape(offsetDb)}`
                console.log(query)
                let [err, listProduct] = await to(this.mysqlDb.poolQuery(query))
                if (err) {
                    logger.error(`[hotProductService][getHotProducts] errors : `, err)
                    return reject(err)
                } else {
                    return resolve(listProduct)
                }

            });
    }

    setHotProduct(product_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const getQuery = `SELECT * FROM hot_product 
              WHERE product_id = ${mysql.escape(product_id)}`

                const [err1, result1] = await to(this.mysqlDb.poolQuery(getQuery))
                if (result1.length != 0) {

                    return reject({ message: `hot-product existed` })
                }

                const query = `INSERT INTO hot_product(product_id) 
                VALUES (${mysql.escape(product_id)})
                `
                const [err2, result] = await to(this.mysqlDb.poolQuery(query))
                if (err2) {
                    logger.error(`[hotProductService][createHotProduct] errors: `, err)
                    return reject(err)
                }
                return resolve(result)
            } catch (err) {
                return reject(err)
            }


        })
    }

    unSetHotProduct(product_id) {
        return new Promise(async (resolve, reject) => {
            let query = ``
            try {
                await this.mysqlDb.beginTransaction()
                query = `
                DELETE FROM hot_product
                WHERE product_id = ${mysql.escape(product_id)}
                `
                let result = await this.mysqlDb.poolQuery(query)

                if (result.affectedRows === 0) {
                    return reject(`Delete product with id ${product_id} not sucessfully`)
                }
                await this.mysqlDb.commit()
                return resolve(`Remove hot-product with id ${product_id} sucessfully`)
            } catch (err) {
                logger.error(`[hotProductService][deleteHotProduct] errors: `, err)
                await this.mysqlDb.rollback()
                return reject(err.sqlMessage)
            }
        })
    }
}

module.exports = HotProductService;