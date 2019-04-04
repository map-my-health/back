from bs4 import BeautifulSoup
import urllib3
import csv
from datetime import datetime

base_url = 'http://oregonhospitalguide.org/hospitals/'
# change location to variable with all the hospitals
location = 'mid-columbia-medical-center'
end_url = '/#cost-estimates'


# specify url
url = base_url+location+end_url

# query website to return html to variable 'page'
page = urllib3.urlopen(url)

# parse html and store into soup variable
soup = BeautifulSoup(page, 'html.parser')

# get value from html class
# measure-state-rating is the hospital median price
value = soup.find('ul', attrs=('class': 'measure-state-rating'))

# remove starting and trailing data
median = value.text.strip()
print(median)

# open csv file with append so as to not erase existing data
with open('index.csv', 'a') as csv_file:
	to_csv = csv.writer(csv_file)
	to_csv.writerow([location, median, datetime.now()])