# blog-google-auth
blogging system with comments and user login with google.

To deploy on your server and use follow below instructions:
1. I am assuming you have mongodb, npm and node js installed.

2. Name of my main folder is 'blog' which contains code

3. go in the parent directory that contains code 'blog'

4. npm install
5. from the directory where mongodb is files are kept start
    the mongodb server, cd to ' c:\mongo\bin' then execute
    'mongod --dbpath c:\node\blog\data'   (path to blog data)

6. from c:\node\blog to start the application
     'node app.js'


The name of database created is blog and which contains two collections
users and blogs, with comments stored as a part of blogs but with schema
of their own. Please refer to models folder for db code.



