

##### MongoDB notes
````bash
use newdatabase                                  # Creates a database
db.mycollection.insert({"name":"toni","age":26}) # A row must be added before the table can be seen in the database
show dbs                                         # Table exists now
db.mycollection.find().pretty()                  # Show the table

# Mongodb scheme
npm install --save mongoose

# Show collections
show collections

# This is how indexing works in MongoDB:
db.users.createIndex({lastname:1})

# Multiple indexes created at the same time:
db.users.createIndex({firstname:1,lastname:1})

# Get the row count of a table
db.customerdata.count({custId:{$gte:1}})

# MongoDB usage with javascript
// var conn = new Mongo();
// var db = conn.getDB("customerdb");
// db.customerdata.insert(data);

load("C:/Program Files/MongoDB/Server/4.0/scripts/mapreduce.js")
````


##### MySQL remote server setup
````bash
# If c libraries can't access the server:

# 1. Edit config
sudo nano /etc/mysql/my.cnf

# 2. Comment out:
    skip-external-locking
    bind-address

# 3. Restart MySQL
sudo service mysql restart
````


##### MySQLdump
````bash
# Backup database:
mysqldump -uroot -pmysql DATABASE_NAME > DATABASE.sql

# Restore database:
C:\> mysql -u root -p
mysql> create database mydb;
mysql> use mydb;
mysql> source DATABASE_NAME.sql;


# Backup a table:
mysqldump -uroot -pmysql DATABASE_NAME TABLE_NAME > DATABASE_NAME_TABLE_NAME.sql

# Restore a table:
mysql -uroot -pmysql DATABASE_NAME < DATABASE_NAME_TABLE_NAME.sql

````


##### MySQL notes
````bash
## Change user password:

# 1. Login to mysql as root:
mysql -uroot -p

# 2. use mysql;

# 3. Change password in versions < 5.7.5
SET PASSWORD FOR 'user'@'localhost' = PASSWORD('PASSWORD_HERE');

# 4. Change passwords in versions > 5.7.5
ALTER USER 'user'@'localhost' IDENTIFIED BY 'PASSWORD_HERE';



## Create a new user
# Show users

# Create admin user
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'PASSWORD_HERE';

# Set privileges
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';

# Reload privileges
FLUSH PRIVILEGES;


## Fix error: ER_NOT_SUPPORTED_AUTH_MODE
# Login to mysql root
mysql -uroot -p

# Change user password to mysql native password
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'PASSWORD_HERE';
````

##### MySQL workbench notes
````bash
## If 'mysql' and other internal schemas are missing:
Edit -> Preferences -> SQL Editor -> Show Metadata and Internal Schemas -> OK -> Hit refresh in the 'SCHEMAS' view.

## Connect remotely to mysql database.

# 1. Create a SSH tunnel
Putty -> Session -> Host Name -> 192.168.1.35
Putty -> Connection -> Data -> Auto-login username -> pi
Putty -> Connection -> SSH -> Auth -> Private key file for authentication -> PRIVATE_KEY_HERE
Putty -> Connection -> SSH -> Auth -> Tunnels -> Source port: 3306
Putty -> Connection -> SSH -> Auth -> Tunnels -> Destination: 127.0.0.1:3306 -> Add
Putty -> Sessions -> set name to 'Saved sessions' -> Save

# 2. Download MySQL Workbench

# 3. Create a new connection
Database -> Manage connections -> New
Hostname:  127.0.0.1
Port:      3306
Username:  USER_NAME_HERE
Password:  Store in Vault
Test Connection

# 4. Open connection
Database -> Connect to database ->
Stored Connection: STORED_CONNECTION_HERE
Connection Method: Standard(TCP/IP)
````

##### Compare two different mysqldump files
````bash
if [[ $(ls -A | diff TEST3.sql TEST4.sql | grep 'INSERT') ]]; then echo 1; else echo 0; fi
````

---