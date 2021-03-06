const pool = require('../dbconfig/dbconfig');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

class OrderController {

    async getAddress_cardInfo(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query('SELECT * FROM address where address.adr_user_id = ?', [
                req.session.user.id
            ], (err, user_address) => {
                if (err) throw err;

                req.user_address = user_address;
                conn.query('select * from card where card_user_id = ?', [
                    req.session.user.id
                ], (err, user_card) => {
                    if (err) throw err;

                    req.user_card = user_card;
                    conn.release();
                    next();
                })
            })

        })
    }
    async getOrder_data(req,res,next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query(`SELECT * FROM product_order WHERE order_num = "${req.params.order_num}"`,(err, ordata)=>{
                if(err) throw err;
                req.ord = ordata;
                conn.query(`SELECT * FROM product WHERE product_num = "${ordata[0].order_product_num}"`, (err, pdata)=>{
                    if(err) throw err;
                    conn.release();
                    req.prd = pdata;
                    next();
                })

            })
        })
    }

    async getOrder(req,res, next){
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            conn.query(`SELECT * FROM product WHERE product_num = "${req.params.product_num}" `, (err, sprod)=>{
                if(err) throw err;
                req.spd = sprod;
                conn.query(`SELECT * FROM product_review WHERE review_product_num = "${req.params.product_num}"`, (err, sreview)=>{
                    if(err) throw err;
                    conn.release();
                    req.spd_review = sreview;
                    next();
                })
                
            })
        })
    }


    async SaveOrder(req,res, next){
        
        pool.getConnection((err, conn)=>{
            if(err) throw err;
            var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
            conn.query(`INSERT INTO product_order VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                null,req.session.user.id, req.body.order_state, nowTime, req.body.order_money, req.body.order_card_num, req.body.order_card_date, req.body.order_card_CVC,
                req.body.order_post_num, req.body.order_post_main, req.body.order_post_detail, req.body.order_get_user_name, req.body.order_user_phone, req.body.order_product_count,
                req.body.order_paint_img, req.body.order_product_num
            ],(err, row)=>{
                if(err) throw err;
                
                conn.query('update product set product_stock = product_stock - ? where product_num = ?',[
                    req.body.order_product_count, req.body.order_product_num
                ], (err)=>{
                    if(err) throw err;
                    conn.query(`SELECT order_num FROM product_order WHERE order_date ="${nowTime}"`, (err, order_num)=>{
                        if(err) throw err;
                        conn.release();

                        req.order_num = order_num[0].order_num;

                        next();
                    })

                })
            })
        })
    }
}

module.exports = OrderController