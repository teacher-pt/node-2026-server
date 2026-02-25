# this is demo server

## server contains these modules

1. jwt  
2. bcrypt  
3. express

## available routes

### Products

| URL                    | Method | Description               |
|------------------------|--------|---------------------------|
| `/products`            | GET    | retrieve all products     |
| `/products`            | POST   | create a new product      |
| `/products/:id`        | GET    | get a single product      |
| `/products/:id`        | PUT    | update an existing product |
| `/products/:id`        | DELETE | delete a product          |

### Users

| URL                    | Method | Description              |
|------------------------|--------|--------------------------|
| `/users`               | GET    | retrieve all users       |
| `/users`               | POST   | create a new user        |
| `/users/:id`           | GET    | get a single user        |
| `/users/:id`           | PUT    | update an existing user  |
| `/users/:id`           | DELETE | delete a user            |