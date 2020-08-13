# -*- coding: utf-8 -*-
import sqlite3
import datetime

conn = sqlite3.connect('data.db',check_same_thread=False)

# conn.row_factory = sqlite3.Row

def create_tables():
    """ CREATE a table with title release_timestamp(real) and wathced(bool) properties """
    with conn:
        conn.execute('create table if not exists movies (title text, release_timestamp text, watched integer)')
        
        
def add_movie(movie, release):
    with conn:
        conn.execute("insert into movies (title,release_timestamp, watched) values (?,?,?)",(movie,release,0))
        
        
def get_all_movies():
    with conn:
        cursor = conn.execute("select * from movies")
    return cursor.fetchall()
        
def watch_movie(title):
    with conn:
        conn.execute('update movies set watched = 1 where title = ?',(title,))


def get_watched_movies():
    with conn:
        cursor = conn.execute("select title from movies where watched = 1")
    return cursor

def drop_movie_table():
    with conn:
        conn.execute("drop table movies;")


def get_upcoming_movies():
    today = datetime.datetime.today().timestamp()
    with conn:
        cursor = conn.execute("select * from movies where release_timestamp > ?",(today))
    return cursor

