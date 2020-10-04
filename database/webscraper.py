import requests
from bs4 import BeautifulSoup
from recipe_scrapers import scrape_me
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("ATLAS_URI"))
db = client['PancakeBot']
recipes = db.recipes

headers = {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 RuxitSynthetic/1.0 v6665588320 t38550 ath9b965f92 altpub cvcv=2'}

recipe_link = []

# category 
URL = 'https://eatwhattonight.com/category/recipe/'

def scraping_recipe(url):
	recipe = {}

	scraper = scrape_me(url)
	recipe["title"] = scraper.title()
	recipe["total time"] = scraper.total_time()
	recipe["yields"] = scraper.yields()
	recipe["ingredients"] = scraper.ingredients()
	recipe["instructions"] = scraper.instructions()
	recipe["image"] = scraper.image()
	recipe["link"] = url

	recipes.insert_one(recipe)

# gets recipe links on each category page
def get_links_on_page(url):
	page = requests.get(url, headers=headers, timeout=10)
	soup = BeautifulSoup(page.content, 'html.parser')

	links = soup.find_all("a", {"rel": "bookmark"})

	for link in links:
		if link.text == 'Read More':
			recipe_link.append(link['href'])

	print('obtained link on page')

# goes through all pages and gets link on each page
def get_all_links(url):
	num = get_num_pages(url)
	url += 'page/'
	for i in range(num):
		new_link = url + str(i+1)
		print(new_link)
		get_links_on_page(new_link)

	print('obtained all links')

# gets number of pages in category url
def get_num_pages(url):
	page = requests.get(url, headers=headers, timeout=10)
	soup = BeautifulSoup(page.content, 'html.parser')

	pages = soup.select('a[class="page-numbers"]')
	max = 0
	num = 0
	for value in pages:
		num = int(value.text)
		if num > max:
			max = num
	return num

def clear_mongo_cache():
	recipes.delete_many({})

def main(url):
	get_all_links(url)

	for each_link in recipe_link:
		scraping_recipe(each_link)

if __name__ == "__main__":
	main(URL)
	# scraping_recipe(recipe_url)