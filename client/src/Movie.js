import React from 'react';
import {Redirect, withRouter} from 'react-router';
import './Movie.css';
import axios from 'axios';
import {toast} from 'react-toastify';


class Movie extends React.Component {

	constructor(props){
		super(props);

		console.log(props);

		this.state = {
			id: props.match.params.id,
			title: '',
			release_date: ''
		}
		this.onChangeHandler = this.onChangeHandler.bind(this)
		this.onSubmitHandler = this.onSubmitHandler.bind(this)
	}

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

	
	validate(){

		let valid = true

		for(let field in this.validation){

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

			let {id, title, release_date} = this.state

			const movie = {
				id:id,
				title:title,
				release_date:release_date
			}

			let axiosRestCall = axios.post;

			let url = process.env.REACT_APP_SERVER_URL

			if (id){
				axiosRestCall = axios.put
				url += "/" + id;
			}

			axiosRestCall(url, movie)
			. then( res => {
				this.setState({created: true})
				if(id){
					toast.success(" 🦄 Successfully updated", {
					autoclose:3000,
					closeOnClick:true,
					hideProgressBar: true,
				})

				}else{
					toast.success(" 🦄 Successfully created", {
					autoclose:3000,
					closeOnClick:true,
					hideProgressBar: true,
				})
				}
				
			})
			.catch(err => console.log(err))
		}

	}

	componentDidMount(){
		if(!this.state.id){
			return
		}

		axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.id)
		.then(res => {
			let {title, release_date} = res.data[0]

			this.setState({
				title:title,
				release_date: release_date
			})
		})
		.catch(err => console.log(err))
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


export default withRouter(Movie);