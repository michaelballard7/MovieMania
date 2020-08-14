# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import pandas as pd 
import requests 
import db2


url = "https://www.imdb.com/chart/top/?ref_=nv_mv_250"

req = requests.get(url).text

soup = BeautifulSoup(req, 'html.parser')

table_body = soup.find("tbody",{"class":"lister-list"})

rows = table_body.find_all("tr")

for row in rows:
    title = row.find("td",{"class":"titleColumn"}).find("a").get_text("|")
    published = row.find("td",{"class":"titleColumn"}).find("span").get_text()
    published = published.replace("(","").replace(")","").strip()
    published = "01-01-"+published
    db2.add_movie(title, published)
    