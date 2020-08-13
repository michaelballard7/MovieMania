# -*- coding: utf-8 -*-
import db

menu = """ 
    1. Add new movie
    2. View upcoming movies
    3. View all movies
    4. Watch a movie
    5. View Watched movies
    6. exit
    
    Your selection: """
    
welcome = "Welcome to the watchlist app!"

db.create_tables()

print(welcome)

while ((user_input := input(menu)) != '6'):
    
    if user_input == "1":
        title = input("What is the title of the movie? ")
        release = input("What is the movie realse date in mm-dd-yr ")
        db.add_movie(title, release)
    
    elif user_input == "2":
        if db.get_upcoming_movies()  != None:
            for movie in db.get_upcoming_movies():
                print(movie)

    elif user_input == "3":
        for movie in db.get_all_movies():
            print(movie)
        
    elif user_input == "4":
        watched = input("What movie would you like to watch? ").strip()
        for movie in db.get_all_movies():
            if movie[0] == watched:
                db.watch_movie(watched)
          
    
    elif user_input == "5":
        for movie in db.get_watched_movies():
            print(movie)
            
    elif user_input == "000":
        db.drop_movie_table()
    
    else:
        print("Invalid input, please try again")