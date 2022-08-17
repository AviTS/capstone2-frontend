# Capstone 2

Book App: https://cap2bookapp.herokuapp.com/

I was inspired by Goodreads to create this web app. Broadly speaking, my project allows for a user to add books they're interested in to their personal libraries.

After signing up or logging in, the user will be able to search for books (using a third-party API) and create a library. Once the user finds a book they want to add to one of their libraries and have create a library, they will then be able to rate the book (between one and five stars). 

I used Node.js and Express.js for the backend portion of the project. To ensure secure storage of user login data, I used the npm packages bcrypt and jsonwebtoken (jwt). Bcrypt and JWT allowed for password hashing in addition to token authorization. 

I utilized the Google Books API (https://developers.google.com/books) for all the book data I needed. This included all the basic book information, such as title, author(s), genre(s), book description, among other things. After the initial Google Books API call, I took the specific information I needed for the app and added it to the PostgreSQL database.

For the frontend, I utilized React.js, and for CSS, I used React Bootstrap. 

For the database, I used PostgreSQL. 
