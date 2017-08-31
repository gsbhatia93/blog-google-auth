# blog-google-auth
<h4>Blogging app with comments and user login with Google Plus account.</h4>

The app is made with NodeJs, express using Ejs for frontend and Mongodb for database.
PASSPORT module is used for connecting to google api for login and fetching data like profile, email and contacts. It has method passport.authenticate() defined in routes.js and it internally uses Google Strategy defined in config/passport.js. This connection with google strategy returns token of authentication and requested data, like in our case profile and email. The contacts had to be fetched using another get request to 'https://www.google.com/m8/feeds/contacts/' made with 'request' module.  

Passport also maintains user session and provides logout functionality. Mongoose provides interface to Mongodb and schema required like blog schema, user schema and comment schema. The schemas are defined in models folder. The app manipulates these schemas and data gets stored in db according to them.

The profile page displays the profile with data like username, id, email and contacts. 
User can write a blog, view all blogs, view a particular blog and comment on it.
The app is extendable, one can easily add login for facebook, twitter or local login using email and password, pluggins for which are provided by Passport but to keep things simple I have provided login using Google only.

I have also used nodemon for debgging the app as it tracks the changes made to .js files and restarts the server.
 
<hr>
<h5>To deploy on your server and run, follow given instructions:</h5>

1. I am assuming you have mongodb, npm and node js installed.

2. Clone the repo.Name of the main folder is 'blog' which contains code and data.

3. cd into blog directory that contains package.json

4. npm install
5. from the directory where mongodb is files are kept start
    the mongodb server, cd to ' c:\mongo\bin' then execute
    'mongod --dbpath c:\node\blog\data'   (path to blog\data )

6. from c:\node\blog to start the application
     'node app.js'


The name of database created is blog and which contains two collections
users and blogs, with comments stored as a part of blogs but with schema
of their own. Please refer to models folder for db code.



