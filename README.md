# blog-google-auth
<h4>Blogging app with comments and user login with Google Plus account.</h4>

The app is made with NodeJs, express using Ejs for frontend and Mongodb for database.
Passport module is used for connecting to google api for login and fetching data like profile, email and contacts. It has method passport.authenticate() defined in routes.js and it internally uses Google Strategy defined in config/passport.js. This connection with google strategy returns token of authentication and requested data, like in our case profile and email. The contacts had to be fetched using another get request to 'https://www.google.com/m8/feeds/contacts/'.  

Passport also maintains user session and provides logout functionality. Mongoose provides interface to Mongodb and schema required like blog schema, user schema and comment schema. The schemas are defined in models folder. 

The profile page displays the profile with data like username, id, email and contacts. 
User can write a blog, view all blogs, view a particular blog and comment on it.
 
<hr>
To deploy on your server and use follow below instructions:

1. I am assuming you have mongodb, npm and node js installed.

2. Name of my main folder is 'blog' which contains code

3. go in the parent directory that contains code 'blog'

4. npm install
5. from the directory where mongodb is files are kept start
    the mongodb server, cd to ' c:\mongo\bin' then execute
    'mongod --dbpath c:\node\blog\data'   (path to blog\data )

6. from c:\node\blog to start the application
     'node app.js'


The name of database created is blog and which contains two collections
users and blogs, with comments stored as a part of blogs but with schema
of their own. Please refer to models folder for db code.



