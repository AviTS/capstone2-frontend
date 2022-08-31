# Capstone 2

Book App: https://happyreading.herokuapp.com/

I was inspired by Goodreads to create this web app. Broadly speaking, my project allows for a user to add books they're interested in to their personal libraries.

After signing up or logging in, the user will be able to search for books (using a third-party API) and create a library. Once the user finds a book they want to add to one of their libraries and have create a library, they will then be able to rate the book (between one and five stars). 

I used Node.js and Express.js for the backend portion of the project. To ensure secure storage of user login data, I used the npm packages bcrypt and jsonwebtoken (jwt). Bcrypt and JWT allowed for password hashing in addition to token authorization. 

I utilized the Google Books API (https://developers.google.com/books) for all the book data I needed. This included all the basic book information, such as title, author(s), genre(s), book description, among other things. After the initial Google Books API call, I took the specific information I needed for the app and added it to the PostgreSQL database.

For the frontend, I utilized React.js, and for CSS, I used React Bootstrap. I created a single file to 'gather' all the data from any backend API calls. Although not necessary, it significantly helped in me organizing my code in that it kept all the frontend and backend stuff separate from each other and in a single file.

For the database, I used PostgreSQL (in SQL).

For deployment, I used GitHub and Heroku.

Tech Stack Summary:
1. Backend: Node.js + Express.js
2. Frontend: React.js + React Bootstrap (CSS)
3. Database: PostgreSQL 
4. Deployment: Github + Heroku
5. Testing: Jest
6. Misc: dotenv, jwt, bcrypt, axios, React Router, and jsonschema.


To setup the application locally, create a PostgreSQL database named `booksdb`, by running the terminal command `psql -d booksdb -f db-schema.sql`. Once the database is set up and the repository is cloned, run `npm i` in the terminal for both the frontend and backend repositories. Then run `npm start` in the terminal for both the frontend and backend repositories. To run the backend tests, just type in `jest` and hit enter.
