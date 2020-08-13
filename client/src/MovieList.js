import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './MovieList.css'

class MovieList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			movies:[]
		}
	}
	
	componentDidMount(){
		fetch(process.env.REACT_APP_SERVER_URL)
			.then(res => res.json())
			.then(data => this.setState({movies: [...data]}))
			.catch(err => console.log(err))
	}

	render(){
		let movies = this.state.movies.map( (movie, index) => {
				return (
					<tr key={movie.id}>
						<td>{movie.title}</td>
						<td>{movie.release_date}</td>
						<td> <EditIcon className="edit" /></td>
						<td> <DeleteIcon className="delete" /></td>
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