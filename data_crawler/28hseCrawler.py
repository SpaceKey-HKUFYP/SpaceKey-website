from selenium import webdriver

propertyURL_buy = "https://www.28hse.com/en/buy"
propertyURL_rent = "https://www.28hse.com/en/rent"

chromeOptions = webdriver.ChromeOptions()
chromeOptions.add_argument('--disable-gpu')
chromeOptions.add_argument('--headless')

# to obtain link of result page
MainDriver = webdriver.Chrome(chrome_options=chromeOptions)
# to explore the result page 
ResultFetchingDriver = webdriver.Chrome(chrome_options=chromeOptions)



xpath = "//div[@class='right content_me_div']/title/a"
result_div_class = "right content_me_div"

def start(MainURL, driver):
	while 


def get_result(driver, url):
	result_div = driver.find_elements_by_class(result_div_class)
	while len(result_div) == 0:
		result_div = driver.find_elements_by_class(result_div_class)
	for i in range(len(result_div)):
		link = result_div[i].find_element_by_xpath("//title/a")
		href = link.href  # link is a element



# access the website from another socket/port
def extract_info(driver ,link):# 
	driver.get(link)



def store_info()


