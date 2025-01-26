# Recipe Share Community Platform

This is the backend service for the Recipe Share Community Platform application. It provides APIs for managing User Management, Recipe Management, Payment System information.

## Features

- User authentication and authorization
- Membership management
- Payment Management
- User profile management
- Social Media Management
- Monthly Report

## Technologies Used

- Node.js
- Express.js
- MongoDB
- TypeScript
- Zod validation
- JWT for authentication
- Smtp
- Payment Gate Way

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Prashoman/recipe-share-community-backend/
   ```
2. Navigate to the project directory:
   ```bash
   cd 
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gym-master
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. The server will be running on `http://localhost:5000`.

## API Documentation

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

# User Management API Documentation

This API provides functionality to manage users, including creating, fetching, updating, and deleting users with roles of Admin and User.

## Table of Contents

- [Endpoints](#endpoints)
  - [Create User](#create-user)
  - [Create Admin](#create-admin)
  - [Get All Users](#get-all-users)
  - [Get All Admins](#get-all-admins)
  - [User Login](#user-login)
  - [Change Password](#change-password)
  - [Update Profile](#update-profile)
  - [Get Profile](#get-profile)
  - [Forget Password](#forget-password)
  - [Reset Password](#reset-password)
- [Error Handling](#error-handling)
- [Global Error Response](#global-error-response)
- [Setup and Usage](#setup-and-usage)

## Endpoints

### Create User

- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Description:** Creates a new user.
- **Request Body:**
  ```json
  {
    "userName": "string",
    "email": "string",
    "password": "string",
    "profileImage": "string (optional)",
    "address": "string (optional)",
    "memberShip": "free | premium (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      // user data
    }
  }
  ```

### Create Admin

- **URL:** `/api/auth/create/admin`
- **Method:** `POST`
- **Description:** Creates a new admin.
- **Request Body:**
  ```json
  {
    "userName": "string",
    "email": "string",
    "password": "string",
    "profileImage": "string (optional)",
    "address": "string (optional)",
    "memberShip": "free | premium (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Admin created successfully",
    "data": {
      // admin data
    }
  }
  ```

### Get All Users

- **URL:** `/api/auth/users`
- **Method:** `GET`
- **Description:** Retrieves all users. Requires admin authentication.
- **Response:**
  ```json
  {
    "success": true,
    "message": "All users fetched successfully",
    "data": [
      // array of user data
    ]
  }
  ```

### Get All Admins

- **URL:** `/api/auth/admins`
- **Method:** `GET`
- **Description:** Retrieves all admins. Requires admin authentication.
- **Response:**
  ```json
  {
    "success": true,
    "message": "All Admin fetched successfully",
    "data": [
      // array of admin data
    ]
  }
  ```

### User Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "token": "string",
    "data": {
      // user data without password
    }
  }
  ```

### Change Password

- **URL:** `/api/auth/change-password`
- **Method:** `POST`
- **Description:** Changes the password of the logged-in user.
- **Request Body:**
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password changed successfully",
    "data": {
      // updated user data
    }
  }
  ```

### Update Profile

- **URL:** `/api/auth/update-profile`
- **Method:** `PUT`
- **Description:** Updates the profile of the logged-in user.
- **Request Body:**
  ```json
  {
    "userName": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)",
    "profileImage": "string (optional)",
    "address": "string (optional)",
    "memberShip": "free | premium (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "data": {
      // updated user data
    }
  }
  ```

### Get Profile

- **URL:** `/api/auth/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile of the logged-in user.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile fetched successfully",
    "data": {
      // user profile data
    }
  }
  ```

### Forget Password

- **URL:** `/api/auth/forget-password`
- **Method:** `POST`
- **Description:** Sends a password reset link to the user's email.
- **Request Body:**
  ```json
  {
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password reset link sent to your email",
    "data": "string (reset link)"
  }
  ```

### Reset Password

- **URL:** `/api/auth/reset-password`
- **Method:** `POST`
- **Description:** Resets the user's password using the reset link.
- **Request Body:**
  ```json
  {
    "id": "string",
    "newPassword": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password reset successfully",
    "data": {
      // updated user data
    }
  }
  ```

## Error Handling

Errors are handled globally by the `globalErrorHandler` middleware. The error response structure is as follows:

## Global Error Response

```json
{
  "success": false,
  "message": "string",
  "errorSources": [
    {
      "path": "string",
      "message": "string"
    }
  ],
  "stack": "string (only in development)"
}
```

## Setup and Usage

Follow the steps in the [Getting Started](#getting-started) section of the main README to set up and run the application.

# User Relationship API Documentation

This API provides functionality to manage user relationships, including following, unfollowing, and retrieving followers and following users.

## Table of Contents

- [Endpoints](#endpoints)
  - [Follow User](#follow-user)
  - [Unfollow User](#unfollow-user)
  - [Get Followers](#get-followers)
  - [Get Following](#get-following)
- [Error Handling](#error-handling)
- [Global Error Response](#global-error-response)
- [Setup and Usage](#setup-and-usage)

## Endpoints

### Follow User

- **URL:** `/api/user/follow`
- **Method:** `POST`
- **Description:** Follows a user.
- **Request Body:**
  ```json
  {
    "followId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User followed successfully",
    "data": {
      // follow user info
    }
  }
  ```

### Unfollow User

- **URL:** `/api/user/un-follow`
- **Method:** `POST`
- **Description:** Unfollows a user.
- **Request Body:**
  ```json
  {
    "unFollowId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User unfollowed successfully",
    "data": {
      // unfollow user info
    }
  }
  ```

### Get Followers

- **URL:** `/api/user/followers`
- **Method:** `GET`
- **Description:** Retrieves the followers of the logged-in user.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Followers fetched successfully",
    "data": [
      // array of follower data
    ]
  }
  ```

### Get Following

- **URL:** `/api/user/following`
- **Method:** `GET`
- **Description:** Retrieves the users followed by the logged-in user.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Following fetched successfully",
    "data": [
      // array of following data
    ]
  }
  ```

## Error Handling

Errors are handled globally by the `globalErrorHandler` middleware. The error response structure is as follows:

## Global Error Response

```json
{
  "success": false,
  "message": "string",
  "errorSources": [
    {
      "path": "string",
      "message": "string"
    }
  ],
  "stack": "string (only in development)"
}
```

# Recipe API Documentation

This API provides functionality to manage recipes, including creating, fetching, updating, and deleting recipes.

## Table of Contents

- [Endpoints](#endpoints)
  - [Create Recipe](#create-recipe)
  - [Get All Admin Recipes](#get-all-admin-recipes)
  - [Get All User Recipes](#get-all-user-recipes)
  - [Update Public Recipe](#update-public-recipe)
  - [Delete Recipe](#delete-recipe)
  - [Update Recipe](#update-recipe)
- [Error Handling](#error-handling)
- [Global Error Response](#global-error-response)
- [Setup and Usage](#setup-and-usage)

## Endpoints

### Create Recipe

- **URL:** `/api/recipe/create`
- **Method:** `POST`
- **Description:** Creates a new recipe.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "image": "string",
    "ingredients": ["string"],
    "cookingTime": "number",
    "category": "string",
    "tags": ["string"]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recipe created successfully",
    "data": {
      // recipe data
    }
  }
  ```

### Get All Admin Recipes

- **URL:** `/api/recipe/all`
- **Method:** `GET`
- **Description:** Retrieves all recipes for admin. Requires admin authentication.
- **Response:**
  ```json
  {
    "success": true,
    "message": "All recipes fetched successfully",
    "data": [
      // array of recipe data
    ]
  }
  ```

### Get All User Recipes

- **URL:** `/api/recipe/my-recipes`
- **Method:** `GET`
- **Description:** Retrieves all recipes for the logged-in user.
- **Response:**
  ```json
  {
    "success": true,
    "message": "All recipes fetched successfully",
    "data": [
      // array of recipe data
    ]
  }
  ```

### Update Public Recipe

- **URL:** `/api/recipe/publish/:id`
- **Method:** `PUT`
- **Description:** Updates a recipe to be public.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recipe Public successfully",
    "data": {
      // updated recipe data
    }
  }
  ```

### Delete Recipe

- **URL:** `/api/recipe/delete/:id`
- **Method:** `DELETE`
- **Description:** Deletes a recipe.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recipe deleted successfully",
    "data": {
      // deleted recipe data
    }
  }
  ```

### Update Recipe

- **URL:** `/api/recipe/update/:id`
- **Method:** `PUT`
- **Description:** Updates a recipe.
- **Request Body:**
  ```json
  {
    "title": "string (optional)",
    "description": "string (optional)",
    "image": "string (optional)",
    "ingredients": ["string"] (optional),
    "cookingTime": "number (optional)",
    "category": "string (optional)",
    "tags": ["string"] (optional)
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recipe updated successfully",
    "data": {
      // updated recipe data
    }
  }
  ```

## Error Handling

Errors are handled globally by the `globalErrorHandler` middleware. The error response structure is as follows:

## Global Error Response

```json
{
  "success": false,
  "message": "string",
  "errorSources": [
    {
      "path": "string",
      "message": "string"
    }
  ],
  "stack": "string (only in development)"
}
```

# Likes API Documentation

This API provides functionality to manage likes, including creating, deleting, and retrieving likes.

## Table of Contents

- [Endpoints](#endpoints)
  - [Create Like](#create-like)
  - [Delete Like](#delete-like)
  - [Get Likes](#get-likes)
- [Error Handling](#error-handling)
- [Global Error Response](#global-error-response)
- [Setup and Usage](#setup-and-usage)

## Endpoints

### Create Like

- **URL:** `/api/like/create`
- **Method:** `POST`
- **Description:** Creates a new like for a recipe.
- **Request Body:**
  ```json
  {
    "recipeId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Like created successfully",
    "data": {
      // like data
    }
  }
  ```

### Delete Like

- **URL:** `/api/like/delete/:id`
- **Method:** `DELETE`
- **Description:** Deletes a like for a recipe.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Like deleted successfully",
    "data": {
      // deleted like data
    }
  }
  ```

### Get Likes

- **URL:** `/api/like/get`
- **Method:** `GET`
- **Description:** Retrieves all likes for the logged-in user.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Likes fetched successfully",
    "data": [
      // array of like data
    ]
  }
  ```

## Error Handling

Errors are handled globally by the `globalErrorHandler` middleware. The error response structure is as follows:

## Global Error Response

```json
{
  "success": false,
  "message": "string",
  "errorSources": [
    {
      "path": "string",
      "message": "string"
    }
  ],
  "stack": "string (only in development)"
}
```

## Setup and Usage

Follow the steps in the [Getting Started](#getting-started) section of the main README to set up and run the application.

# Ratings API Documentation

This API provides functionality to manage ratings, including creating and retrieving ratings.

## Table of Contents

- [Endpoints](#endpoints)
  - [Create Rating](#create-rating)
  - [Get My Ratings](#get-my-ratings)
- [Error Handling](#error-handling)
- [Global Error Response](#global-error-response)
- [Setup and Usage](#setup-and-usage)

## Endpoints

### Create Rating

- **URL:** `/api/rating/create`
- **Method:** `POST`
- **Description:** Creates a new rating for a recipe.
- **Request Body:**
  ```json
  {
    "recipe": "string",
    "rating": "number"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Rating created successfully",
    "data": {
      // rating data
    }
  }
  ```

### Get My Ratings

- **URL:** `/api/rating/get-my-rating`
- **Method:** `GET`
- **Description:** Retrieves all ratings for the logged-in user.
- **Response:**
  ```json
  {
    "success": true,
    "message": "My ratings",
    "data": [
      // array of rating data
    ]
  }
  ```

## Error Handling

Errors are handled globally by the `globalErrorHandler` middleware. The error response structure is as follows:

## Global Error Response

```json
{
  "success": false,
  "message": "string",
  "errorSources": [
    {
      "path": "string",
      "message": "string"
    }
  ],
  "stack": "string (only in development)"
}
```

## Setup and Usage

Follow the steps in the [Getting Started](#getting-started) section of the main README to set up and run the application.






