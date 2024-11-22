# Event-management-Backend

This is a backend project developed with Node.js, Express.js, and MongoDB (NoSQL database) to manage events. The application allows the creation, retrieval, updating, and deletion of events, making it easy to manage and track different events by their various attributes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

This project is developed using Node.js, Express.js, and MongoDB. It is designed to manage event-related data, such as event details, schedules, and categories, via API endpoints. The application provides several RESTful APIs to facilitate creating, reading, updating, and deleting events, ensuring smooth operations for event management.


## Features

- **CRUD operations** for events (Create, Read, Update, Delete)
- Fetch events by type, pagination, and sorting
- Event data validation for required fields

## Technologies Used

- **MongoDB**: NoSQL database for storing event data
- **Express.js**: Web framework for Node.js
- **Node.js**: JavaScript runtime environment
- **dotenv**: For managing environment variables like MongoDB URI

## Getting Started

You can fork this project by downloading zip folder or you can go for cloning the repo 

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud instance)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Varuni387/Event-Management-Backend.git
2. Navigate to the directory:
   ```sh
   cd Event-Management-Backend
3. Install the dependencies:
   ```sh
    npm install
4. Create a .env file in the root of your project and add the following:
   ```sh
   MONGO_URI=your-mongodb-uri
   PORT=your-port
### Usage

1. Start the development server
   ```sh
   npm start  
2.The server will run on the specified port. You can access it at http://localhost:8000


### API Endpoints

- **POST /api/v3/app/events**: Creates a new event.
  
- **GET /api/v3/app/events?id=:event_id**: Fetches an event by its unique ID.  
  **Parameters**:  
  - `id`: Event ID  
  **Example**: `/api/v3/app/events?id=1`

- **GET /api/v3/app/events?type=latest&limit=5&page=1**: Fetches the latest events with pagination.  
  **Query Params**:  
  - `type`: Type of events to fetch (e.g., latest)  
  - `limit`: Number of events per page  
  - `page`: Page number for pagination  

- **PUT /api/v3/app/events/:id**: Updates an existing event based on its unique ID.  
  **Parameters**:  
  - `id`: Event ID  
  **Body**: Same as the POST endpoint for event creation  

- **DELETE /api/v3/app/events/:id**: Deletes an event by its unique ID.  
  **Parameters**:  
  - `id`: Event ID  
