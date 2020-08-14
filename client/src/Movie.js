import React from 'react';
import {Redirect} from 'react-router';
import './Movie.css';
import axios from 'axios';
import {toast } from 'react-toastify';



class Movie extends React.Component {

	validation = {
		title : {
			rule : /^\S.{0,48}\S$/,
			message: 'Title field must have 2-50 characthers' 
		},

		release_date : {
			rule: /(0[1-9]|1[012])[- ](0[1-9]|[12][0-9]|3[01])[-](19|20)\d\d/,
			message: "Release date must be in the form mm-dd-yyyy"
		}
	}

	constructor(props){
		super(props);

		this.state = {
			title: '',
			release_date: ''
		}
		this.onChangeHandler = this.onChangeHandler.bind(this)
		this.onSubmitHandler = this.onSubmitHandler.bind(this)
	}

	validate(){

		let valid = true

		for(let field in this.validation){

			console.log(field)

			const rule = this.validation[field].rule;
			const message = this.validation[field].message;
			const value = this.state[field];
			

			if (!value.match(rule)){
				toast.error(message,{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					} )	
				valid= false
			}

		}

		return valid
	}

	onChangeHandler(e){
		const name = e.target.name
		const value = e.target.value
		this.setState({
			[name]:value
		})
	}

	onSubmitHandler(e){
		e.preventDefault()

		if(this.validate()){

			let {title, release_date} = this.state

			const movie = {
				title:title,
				release_date:release_date
			}

			axios.post(process.env.REACT_APP_SERVER_URL, movie)
			. then( res => {
				this.setState({created: true})
				toast.success(" 🦄 Successfully created", {
					autoclose:3000,
					closeOnClick:true
				})
			})
			.catch(err => console.log(err))
		}

	}

	render(){

		if(this.state.created){
			return <Redirect to="/"/>
		}

		return (
			<div>
				<form onSubmit={this.onSubmitHandler}>
					<label htmlFor="title">Title </label>
					<input value={this.state.title} type="text" name="title" id="title" onChange={this.onChangeHandler}/>
					<label htmlFor="title">Release Date </label>
					<input value={this.state.release_date} type="text" name="release_date" id="release_date" onChange={this.onChangeHandler}/>
					<input type="submit" value="Save" />
				</form>
			</div>
		)
	}
}


export default Movie;