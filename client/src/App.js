import React from 'react';
import MovieList from './MovieList';
import Movie from './Movie';
import Header from './Header';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
  	<Router>
	    <div className="App">
	    	<Header />
	    	<ToastContainer/>
	    	<Switch>
	    		<Route exact path="/">
	    			<MovieList />
	    		</Route>
	    		<Route path="/add">
	    			<Movie />
	    		</Route>
	    		<Route path="/edit/:id">
	    			<Movie />
	    		</Route>
	    	</Switch>
	    </div>
   	</Router>
  );
}

export default App;
