# -*- coding: utf-8 -*-
from flask import Flask 
from flask import request,jsonify
import json
import db


app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/api/v1/movies', methods=['GET'])
def index():
    
    movies = db.get_all_movies()
    
    movie_list = []
    
    for movie in movies:
        
        movie_list.append(
            {"title":movie[0],
             "release":movie[1],
             "watched":bool(movie[2])
         })
        
    return jsonify(movie_list)


app.run()