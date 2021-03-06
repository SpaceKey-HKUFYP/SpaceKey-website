import mysql.connector
import requests
database_name = "spacekey"

#port = 3306
database = mysql.connector.connect(
  host="spacekey.cthmasw2nisj.ap-southeast-1.rds.amazonaws.com",
  port=3306,
  user="FYP",
  passwd="FYP123456",
  database=database_name
)
DBcursor = database.cursor()
#DBcursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")
def executeSQL(command):
    DBcursor.execute(command)


# place
place_table_define = ('place('
                            'name VARCHAR(200),'
                            'reviewNum INT,'
                            'searchKey VARCHAR(100),'
                            'givenKey VARCHAR(100),'
                            'address VARCHAR(1000),'
                            'latitude DOUBLE,'
                            'longitude DOUBLE,'
                            'id INT AUTO_INCREMENT PRIMARY KEY,'
                            'CONSTRAINT unique_place UNIQUE (name, latitude, longitude)'
                            ')')
place_para = ('place (name, reviewNum, searchKey, givenKey, address, latitude, longitude) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s)')

#property
property_table_define = ('property('
                            'id INT AUTO_INCREMENT PRIMARY KEY,'
                            'type CHAR(4),'
                            'price INT,'
                            'rent INT,'
                            'bedroom INT,'
                            'grossArea DEC(10),'
                            'netFloorArea DEC(10),'
                            'floor VARCHAR(100),'
                            'address VARCHAR(1000),'
                            'postDate DATE,'
                            'latitude DOUBLE,'
                            'longitude DOUBLE,'
                            'title VARCHAR(400),'
                            'region VARCHAR(100),'
                            'propertyName VARCHAR(100),'
                            'description VARCHAR(4000),'
                            'contact VARCHAR(100),'
                            'phoneNum VARCHAR(100),'
                            'imageURL VARCHAR(200),'
                            'pageURL VARCHAR(200) UNIQUE,'
                            'agentName VARCHAR(100)'
                            ')')

property_para = ('property (type,'
                            ' price,'
                            ' rent,'
                            ' bedroom,'
                            ' grossArea,'
                            ' netFloorArea,'
                            ' floor,'
                            ' address,'
                            ' postDate,'
                            ' latitude,'
                            ' longitude,'
                            ' title,'
                            ' region,'
                            ' propertyName,'
                            ' description,'
                            ' contact,'
                            ' phoneNum,'
                            ' imageURL,'
                            ' pageURL,'
                            ' agentName'
                            ' ) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)')


# create table if not exist
def create_table(table_define):
    prefix = "CREATE TABLE IF NOT EXISTS "
    option = " CHARACTER SET = utf8"
    command = prefix + table_define + option
    executeSQL(command)

def db_add_place(tuple):
    print('adding record ... ')
    try:
        prefix = 'INSERT INTO ' # insert ignore should not be used, which will ignore all error
        #options = ' CHARACTER SET = utf8;'
        options = ' ON DUPLICATE KEY UPDATE name=name'
        command = prefix + place_para + options
        DBcursor.execute(command, tuple)
        database.commit()
    except Exception as error:
        print('record insert with error:',error)
        print('tuple value', tuple)
        return
    print('place record inserted ')


def db_add_property(tuple):
    try:
        prefix = 'INSERT INTO ' # insert ignore should not be used, which will ignore all error
        #options = ' CHARACTER SET = utf8;'
        options = ' ON DUPLICATE KEY UPDATE postDate=postDate;'
        command = prefix + property_para + options
        DBcursor.execute(command, tuple)
        database.commit()
    except Exception as error:
        print('record insert with error:',error)
        print('tuple value', tuple)
        return
    print('property record inserted')

    #   print('record inserted with tuple ', tuple)

def delete_entry(col, value):
    command = "DELETE FROM spacekey.property WHERE "+ col + "=" + value
    print("SQL :", command)
    DBcursor.execute(command)
    database.commit()

def check_image():
    command = "SELECT imageURL FROM spacekey.property"
    DBcursor.execute(command)
    urlList = DBcursor.fetchall()

    for link in urlList:
        url = link[0]
        print("image : ",url)
        r = requests.get(url)
        print("->result : ", r.status_code)
        if r.status_code == 404:
            delete_entry("imageURL", "'" + url +"'")


#check_image()
#create_table(place_table_define)
#create_table(property_table_define)

