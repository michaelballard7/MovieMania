

class Movie {


	constructor(pool){
		this.pool = pool;

	}


	createMovie(movie){

	}

	getMovie(id){

	}

	getMovies(){
		let sql = 'select * from movie'

		this.pool.query(sql, function(err, result){

			console.log("DB is connected")

			if(err) throw err; 

			return res.send(JSON.stringify(result))
		})	
	}

	updateMovie(id){

	}

	deleteMovie(id){

	}
}


module.exports = Movie;