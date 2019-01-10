# Table Define

### Tables

##### place

* name VARCHAR(200) UNIQUE
* review number INT
* search_key VARCHAR(100) 
* given_key VARCHAR(100)
* address VARCHAR(1000)
* latitude DEC(10)
* longitude DEC(10)



* id INT INCREMENT PRIMARY

##### property

* type CHAR(4)  =  rent | sell
* price INT
* rent  INT 
* roomNum INT    // open style is translated to 1
* GrossArea DEC(10)
* netFloorArea DEC(10)
* Floor VARCHAR(20)
* Address VARCHAR(1000)
* postDate  DATE
* latitude DEC(10)
* longitude DEC(10)
* title VARCHAR(200)
* imageURL VARCHAR(200)



* contact VARCHAR(100)
* phoneNum VARCHAR(20)
* pageURL VARCHAR(200)

* id INT INCREMENT PRIMARY