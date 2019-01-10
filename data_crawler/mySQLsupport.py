import mysql.connector
database_name = "SpaceKey"


database = mysql.connector.connect(
  host="localhost",
  user="",
  passwd="",
  database=database_name
)
DBcursor = database.cursor()
def executeSQL(command):
    DBcursor.execute(command)


# place
place_table_define = ('place('
                            'name VARCHAR(200) UNIQUE,'
                            'reviewNum INT,'
                            'searchKey VARCHAR(100),'
                            'givenKey VARCHAR(100),'
                            'address VARCHAR(1000),'
                            'latitude DEC(10),'
                            'longitude DEC(10)'
                            ')')
place_para = ('place (name, reviewNum, searchKey, givenKey, address, latitude, longitude) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s)')

#property
property_table_define = ('property('
                            'type CHAR(4),'
                            'totalPrice DEC(5),'
                            'roomNum INT,'
                            'grossArea INT,'
                            'netFloorArea INT,'
                            'floor VARCHAR(100),'
                            'address VARCHAR(1000),'
                            'postDate DATE,'
                            'latitude DEC(10),'
                            'longitude DEC(10)'
                            ')')

property_para = ('property (type, totalPrice, roomNum, grossArea, netFloorArea, floor, address, postDate, latitude, longitude) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)')


# create table if not exist
def create_table(table_define, DB):
    prefix = "CREATE TABLE IF NOT EXIST "
    option = " CHARACTER SET = utf8;"
    command = prefix + table_define + option
    executeSQL(command)

def db_add_place(tuple):
    prefix = 'INSERT IGNORE INTO ' # ignore when duplicated record is inserted
    options = ' CHARACTER SET = utf8;'

    command = prefix + place_para + options
    DBcursor.execute(command, tuple)


def db_add_property(tuple):
    prefix = 'INSERT IGNORE INTO ' #ignore when duplicated record is inserted
    options = ' CHARACTER SET = utf8;'

    command = prefix + property_para + options
    DBcursor.execute(command, tuple)
