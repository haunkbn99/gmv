'use strict'
const mysql = require('mysql');
const logger = require('../../logger');
const {to} = require('../../helper/to');
class PostService {
    constructor(mysqlDb) {
        this.mysqlDb = mysqlDb
    }

    getPosts(postsPerPage, pageNumber, orderType) {
        return new Promise(async (resolve, reject) => {
            let offsetDb, orderByDb
            orderType = orderType ? orderType : 'newest'
            pageNumber = pageNumber ? pageNumber : 1
            if (!postsPerPage) {
                postsPerPage = 100
                offsetDb = 0
            } else {
                offsetDb = postsPerPage * (pageNumber - 1)
            }
            if (orderType === 'oldest') {
                orderByDb = 'ASC'
            } else {
                orderByDb = 'DESC'
            }
            const query = `
                SELECT * FROM post
                ORDER BY create_at ${mysql.escape(orderByDb).split(`'`)[1]}
                LIMIT ${postsPerPage}
                OFFSET ${mysql.escape(offsetDb)}
            `
            console.log(query);
            let [err, postsResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[postService][getPosts] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            } else {
                return resolve(postsResult)
            }

        })
    }
    getPostById(id) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT * FROM post WHERE id = ${mysql.escape(id)}
            `

            const [err, postResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[postService][getPostById] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (!postResult.length) {
                return reject(`post with id ${id} not found`)
            }
            return resolve(postResult[0])
        })
    }
    getPostByTitle(title) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT * FROM post WHERE title = ${mysql.escape(title)}
            `

            const [err, postResult] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[postService][getPostByTitle] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(postResult)
        })
    }
    createPost(title,image,description, content,category_id) {
        return new Promise(async (resolve, reject) => {
            const query = `
                INSERT INTO post(title,image,description, content,category_id)
                VALUES(${mysql.escape(title)},${mysql.escape(image)},${mysql.escape(description)},${mysql.escape(content)},${mysql.escape(category_id)})
            `
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                console.log(err);
                logger.error(`[postService][createPost] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            return resolve(result?.insertId)
        })
    }
    updatePost(id, title,image,description, content,category_id) {
        return new Promise(async (resolve, reject) => {
            const query = `
                UPDATE post SET 
                title = ${mysql.escape(title)},
                description = ${mysql.escape(description)},
                content = ${mysql.escape(content)},
                image = ${mysql.escape(image)},
                category_id = ${mysql.escape(category_id)}
                WHERE id = ${mysql.escape(id)}
            `
            const [err, result] = await to(this.mysqlDb.poolQuery(query))
            if (err) {
                logger.error(`[postService][updatePost] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
            if (result.affectedRows === 0) {
                return reject(`post with id ${id} not found`)
            }

            return resolve(result)
        })
    }
    deletePost(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `
                    DELETE FROM post
                    WHERE id = ${mysql.escape(id)}
                `
                let result = await this.mysqlDb.poolQuery(query)
                if (result.affectedRows === 0) {
                    return reject(`post with id ${id} not found`)
                }

                return resolve()
            } catch (err) {
                logger.error(`[postService][deletePost] errors: `, err)
                return reject(err?.sqlMessage ? err.sqlMessage : err)
            }
        })
    }

}


module.exports = PostService