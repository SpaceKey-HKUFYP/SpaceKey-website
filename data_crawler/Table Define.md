# Table Define

* plz refer to `mySQLsupport.py` if conflicted 

### Tables

##### place

* `name VARCHAR(200) UNIQUE`
* `review number INT`
* `search_key VARCHAR(100)`  key to initiate search
* `given_key VARCHAR(100)` key given by google map
* `address VARCHAR(1000)`  
* `latitude DOUBLE`
* `longitude DOUBLE`



* `id INT INCREMENT PRIMARY`

##### property

* `id INT AUTO_INCREMENT PRIMARY KEY` 

* `type CHAR(4)`  =  rent | sell
* `price INT`   // sell price
* `rent  INT`   // rent price
* `roomNum VARCHAR(20)`    // e.g. "open style" , 1, 2, 3
* `grossArea DEC(10)`   
* `netFloorArea DEC(10)`  
* `floor VARCHAR(100)`   e.g. low / high
* `address VARCHAR(1000)`
* `postDate  DATE`
* `latitude DOUBLE`
* `longitude DOUBLE`
* `title VARCHAR(400)`  property post title , **this could be duplicated !**
* `region VARCHAR(100)` e.g.  Kennedy Town
* `propertyName VARCHAR(100)`  e.g.  Greenfield Garden / Village / ...
* `description VARCHAR(4000)`  description of the property, given by the landlord/agent
* `contact VARCHAR(100)`    name of landlord / agent
* `phoneNum VARCHAR(100)`    
* `imageURL VARCHAR(200)`   URL to the main image
* `pageURL VARCHAR(200) UNIQUE`   URL to  the property info page
* `agentName VARCHAR(100)` // agent name / By owner 