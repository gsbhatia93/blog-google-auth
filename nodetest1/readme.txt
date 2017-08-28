1. I am assuming you have mongodb, npm and node js installed.

2. Name of my main folder is nodetest1

3. In the parent directory that contains code 'nodetest1'
   npm install -g express-generator
   express nodetest1

4. npm install
5. from the directory where mongodb is installed start
    the mongodb server --c:\mongo\bin
    mongod --dbpath c:\node\nodetest1\data   (path to nodestest1 data)

5. from c:\node\nodetest1 to start the application
     node app.js


The name of database created is nodetest1 and which contains two collections
users and blogs, with comments stored as a part of blogs but with schema
of their own. Please refer to models folder for db code.
