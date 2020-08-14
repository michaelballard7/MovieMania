import mysql.connector as msc


conn = msc.connect(host="localhost",user="root",password="password",database="movies")
print(conn.is_connected())

def get_movies():
	cursor=conn.cursor()
	cursor.execute("select * from movie")
	rows = cursor.fetchall()
	return rows


def add_movie(title, release_date):
	sql = "insert into movie (title, release_date) values (%s,%s)"
	values = (title, release_date)
	cursor = conn.cursor()
	cursor.execute(sql, values)
	conn.commit()
	return f"Successfully added with id {cursor.lastrowid}"




# add_movie("Peter Pan","12-07-1990")


if __name__ == '__main__':
	for row in get_movies():
		print(row)

	conn.close()