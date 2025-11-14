#  Game Haven - Node.js API

Game Haven is a powerful RESTful API built with **Node.js** and **Express**, providing a robust backend for a gaming e-commerce platform. It supports full user authentication, game management, wishlist, cart operations, and order processing.

##  Features

###  Authentication

- **Register** new users
- **Login** existing users
- Secured routes with JWT authentication and role-based access

###  Games Management

- **Add**, **Get**, **Update**, and **Delete** games
- Upload game images using **Multer**

###  Wishlist

- `addToWishlist`
- `getLoggedUserWishList`
- `deleteProductFromWishlist`
- `clearLoggedUserWishlist`

###  Cart

- `addToCart`
- `getLoggedUserCart`
- `updateQuantity`
- `deleteCartGame`
- `clearCart`

###  Orders

- `createOrder`
- `getLoggedUserOrder`

---

##  Middleware and Security

- **Protected Routes** using JWT tokens
- **Input Validation** with `express-validator`
- **Password Hashing** using `bcryptjs`

---

##  Tech Stack

- **Node.js**
- **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Multer** for file upload (game images)
- **Morgan** for logging
- **Dotenv** for environment configuration
- **Nanoid** for generating unique IDs

##  API Documentation

Explore and test the API using Postman:

 [View Full API Documentation on Postman](https://documenter.getpostman.com/view/29718992/2sB2x8FWkf)

[![View in Postman](https://img.shields.io/badge/View%20in-Postman-orange?logo=postman)](https://documenter.getpostman.com/view/29718992/2sB2x8FWkf)
