import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './MovieList.css'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';

class MovieList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			movies:[]
		}

	this.onDeleteHandler = this.onDeleteHandler.bind(this);
	}
	
	componentDidMount(){
		this.getData()
	}



	getData(){
		fetch(process.env.REACT_APP_SERVER_URL)
			.then(res => res.json())
			.then(data => this.setState({movies: [...data]}))
			.catch(err => console.log(err))
	}

	onDeleteHandler(id){
		console.log("Clicked to delete", id)
		axios.delete(process.env.REACT_APP_SERVER_URL+"/"+id)
		.then(res => {

			console.log(res)

			toast.success("Successfully Deleted",{
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					} )

			this.getData()

		})
		.catch(err => console.error(err))
	}

	render(){


		let movies = this.state.movies.map( (movie, index) => {
				return (
					<tr key={movie.id}>
						<td>{movie.title}</td>
						<td>{movie.release_date}</td>
						<td> <Link to={'/edit/'+movie.id}><EditIcon className="edit" /></Link></td>
						<td><Link to="/" onClick={() => this.onDeleteHandler(movie.id)}><DeleteIcon className="delete" /></Link></td>
					</tr>
				 )
			});

		return (
			<div>
				<table>
					<tbody>
						<tr><th>Title</th><th>Release Date</th></tr>{movies}
					</tbody>
				</table>
			</div>
		)
	}
}


export default MovieList;