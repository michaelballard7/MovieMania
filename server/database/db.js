
const db_config = require('../config/db');

const mysql = require('mysql');

const db = (function(){
	let pool = mysql.createPool(db_config)
	console.log('connection pool to db established')
	return pool
})()


module.exports = db;