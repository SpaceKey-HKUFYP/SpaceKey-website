from selenium import webdriver

# table entry headings
table_price = "Price"
table_net_area = "Net floor area(sq feet)"
table_gross_area = "Gross area(sq feet)"
table_floor = "Floor"
table_address = "Address"
table_post_date = "Ads or renew date"
table_room_num = "Room"
table_content = [table_price, table_net_area, table_gross_area, table_floor, table_address, table_post_date, table_room_num]
# end of table entry headings
# result dictionary, addtional to the table entries








propertyURL_buy = "https://www.28hse.com/en/buy"
propertyURL_rent = "https://www.28hse.com/en/rent"
headless = False

chromeOptions = webdriver.ChromeOptions()
chromeOptions.add_argument("--incognito");
if headless:
	chromeOptions.add_argument('--disable-gpu')
	chromeOptions.add_argument('--headless')

# to obtain link of result page
MainDriver = webdriver.Chrome(chrome_options=chromeOptions)
# to explore the result page
ResultFetchingDriver = webdriver.Chrome(chrome_options=chromeOptions)

xpath = "//div[@class='right content_me_div']/title/a"
result_p_class = "title"

list_prefix = "list-"
result_dic = {}

# -----------------Utility-----
def uni_print(str):
	print(str.encode('utf-8'))

def store_kv(key, value):
	result_dic[key] = value

def init_store():
	result_dic = {}

def store_current_result_to_db():
	init_store()



#---------------------------
def start(MainURL, driver):
	driver.get(MainURL)
	max_result = driver.find_element_by_xpath("//div[@class='search_total_result']/em").text
	print("max number of result",max_result)
	total_page_num = int(max_result)/15.0
	current_page = 1
	while current_page <= total_page_num:
		combined_url = propertyURL_buy + "/" + list_prefix + str(current_page)
		get_result(MainDriver, combined_url,current_page)
		#break
		current_page += 1




def get_result(driver, url, current_page):
	if current_page != 1: # list-1 will lead to chinese page
		driver.get(url)
	result_ul = driver.find_elements_by_class_name('agentad_ul')
	#result_p = driver.find_elements_by_class_name(result_p_class)
	result_agent = driver.find_elements_by_class_name("landlord_2")
	result_img = driver.find_elements_by_class_name("img_a")
	result_region_info = driver.find_elements_by_class_name("catname")
	result_feature_info = driver.find_elements_by_class_name('other_info')
	while len(result_ul) == 0:
		result_ul = driver.find_elements_by_class_name('agentad_ul')
	for i in range(len(result_ul)):
		#p = result_p[i]#.find_element_by_xpath("//p[@class='title']")
		title = result_ul[i].find_element_by_xpath(".//p[@class='title']").text

		region_div = result_ul[i].find_element_by_xpath(".//div[@class='catname']")
		region = region_div.find_element_by_tag_name('a').text
		#print("region_div_text",region_div_text)
		propertyName = region_div.text.replace(region,"") # subtracting the region text
		#region = region_info[0].text
		#propertyName = region_info[1].text

		page_link = result_ul[i].find_element_by_xpath(".//p[@class='title']//a").get_attribute("href")
		#href = link.get_attribute("href")  # link is a element
		img_src =result_ul[i].find_element_by_xpath(".//div[@class='img_a']//img").get_attribute('src')
		#img_src = result_img[i].find_element_by_xpath(".//img").get_attribute('src')
		agent_name = result_ul[i].find_element_by_xpath(".//div[@class='landlord_2']").text

		#all_href_list.append(href)
		print('title', title," index ", i, "href", page_link)
		print('agent', agent_name)
		print('img', img_src)
		print('region',region, 'propertyName', propertyName)
		extract_info(ResultFetchingDriver, page_link, result_dic)



# access the website from another socket/port
def extract_info(driver ,link, result_dic):
	driver.get(link)
	table = driver.find_element_by_xpath("//table[@class='de_box_table']")
	table_rows = table.find_elements_by_tag_name('tr')
	extract_feature(driver)
	extract_contact(driver)
	#extract_img(driver)
	for row in table_rows:
		key = row.find_element_by_tag_name('th').text
		val = row.find_element_by_tag_name('td').text
		handle_row(row, key, val, result_dic)
		#print(" key|", key, "|val|", val,"|")
		#table_d[key] = val
		#print(1)
	print(result_dic)

def extract_feature(driver):
	feature_type = driver.find_element_by_class_name('ad_type_style').find_elements_by_tag_name('span')
	feature_type_text = ""
	for t in feature_type:
		feature_type_text+= t.text+" "
	#location, estate
	feature_cat = driver.find_element_by_class_name('feature_div_cat').text
	#print("feature type,",feature_type_text,"feature_cat", feature_cat)
	descriptions = driver.find_elements_by_class_name('description_translated')
	for des in descriptions:
		content = des.find_element_by_xpath("./div").text # the first div child
		print(content)

def extract_contact(driver):
	div = driver.find_element_by_xpath('//div[@class="agents_div"]')
	name = div.find_element_by_tag_name('dd').text
	try:
		contact = div.find_element_by_xpath('.//div[@class="call_me_direct"]').text
	except Exception:
		contact = None
	print("contact", name, contact)


def extract_img(driver):
	div = driver.find_elements_by_class_name("img_a")
	print('div num', len(div))
	for d in div:
		img = div.find_element_by_xpath(".//img")
		img_src = img.get_attribute('src')
		print("img src", img_src)


def handle_row(row, key,val, table):
	if key not in table_content:
		#print("key not in table, ",key)
		return
	if key == table_price:
		price = val.split('\n')[0].split(' ')[1]
		price_num = price[0:len(price)-2] # millions of HKD
		table[table_price] = price_num
	elif key == table_address:
		# https://www.28hse.com/utf8/detail2_map.php?y=22.2781050&x=114.1757340
		try:
			link = row.find_element_by_xpath(".//div[@class='map_icon']//a[@class='various']").get_attribute('href')
			table['latitude'] = link.split('=')[1].split('&')[0]
			table['longitude'] = link.split('=')[2]
		except Exception:
			table['latitude'] = None
			table['longitude'] = None
		if '--' not in val: # has an address
			table[table_address] = val.split('\n')[0]
		else :
			table[table_address] = None
	elif key == table_net_area or key == table_gross_area:
		table[key] = val.split(' ')[0]
	else :
		table[key] = val


def store_info(type, total_price, room_num, gross_area, net_floorArea, floor, address, postDate, latitude, longitude):
	pass

#extract_info(ResultFetchingDriver, "https://www.28hse.com/en/buy-property-747402.html")

start(propertyURL_buy,MainDriver)

MainDriver.close()
ResultFetchingDriver.close()
