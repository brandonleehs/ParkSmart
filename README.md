# ParkSmart

## 📚 Table of Contents

- [App Folder](./app)
- [Class Diagram (PDF)](./deliverables/Class%20Diagram.pdf)
- [Class Diagram (PNG)](./deliverables/Class%20Diagram.png)
- [Sequence Diagrams (PDF)](./deliverables/Sequence%20Diagrams.pdf)
- [System Architecture (PDF)](./deliverables/System%20Architecture.pdf)
- [Test Cases](./deliverables/Test%20Cases.pdf)
- [Demo Script](./deliverables/Demo%20Script.pdf)

## 📽️ Demo Video: https://youtu.be/Y-fdIWAFLAQ

## Description

This website aims to improve the parking experience at HDB car parks in Singapore by allowing users to view real-time availability of parking lots and access detailed information about each car park, such as location, operating hours, gantry height, night parking options and payment types.

This application has been deployed on Render. You may view it [here](https://parksmart-ta1r.onrender.com/). Note that due to the free payment plan, the server instance spins down with inactivity. Thus, some features such as logging in, signing up and viewing forum may be delayed.

## Technologies Used

This project uses the MERN stack:

- MongoDB
- Express
- React
- Node.js

## Requirements

- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/try/download/community) (Optional, but recommended)

If you want to observe the data currently stored on the cloud server/your local database, make sure you install MongoDB Compass as well. If it is not installed during the installation process by default, you can download it [here](https://www.mongodb.com/products/tools/compass).

Ensure that node and npm are installed correctly by running `node -v` and `npm -v`. You may need to add node and npm to your PATH.

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/softwarelab3/2006-FDAE-D2.git
cd 2006-FDAE-D2
```

### 2. Install dependencies

```
cd lab5/app
npm i
```

### 3. Set up MongoDB (Optional)

Our app uses a MongoDB cloud database by default. As a result, you do not need to download MongoDB by default. However, if the cloud database is down, it defaults to connecting to a local database.

If you wish to use your own local database, connect to localhost:27017 in MongoDB Compass and create a new database with the name `sc2006`. You may initialise your first collection as `MyCollection` (the name does not really matter).

If you wish to observe the cloud database, connect to `YOUR_CLOUD_URI`. You may then observe the populated data in the cloud database.

### 4. Set up environment variables

If you do not have the .env file in the repository, enter the following commands **in the app directory**.

```
echo LOCAL_MONGO_URI="mongodb://localhost:27017/sc2006" > .env
echo CLOUD_MONGO_URI="YOUR_CLOUD_URI" >> .env
echo ONEMAP_EMAIL="YOUR_ONEMAP_EMAIL" >> .env
echo ONEMAP_PASSWORD="YOUR_ONEMAP_PASSWORD" >> .env
echo JWT_SECRET=123456 >> .env
echo JWT_EXPIRATION=1h >> .env
echo PORT=3000 >> .env
```

### 5. Start the application

Ensure you're in the `app/` directory. Open up two terminals. On one terminal, run

```
node server/server.js
```

This connects to the server. On the other terminal, run

```
npx vite
```

This runs React.

- Frontend: Open your browser and go to http://localhost:5173 (or the port you're using for the React app). **If you are on Macbook, do not use Safari.** Safari automatically blocks insecure localhost connections (see [issue](https://laracasts.com/discuss/channels/laravel/vite-dev-does-not-work-in-safari-mac?page=1&replyId=905248))

  - If you still want to use Safari, you may try this workaround by adding

    ```
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    ```

    to the `vite.config.js` file. Otherwise, we recommend accessing it on other browsers.

- Backend: Saved data is viewable on MongoDB Compass if you have connected using the correct Mongo URIs.

## Issues

If you encounter persistent problems, feel free to raise an issue on the GitHub repository. Do provide a clear description of the problem, along with steps to reproduce.
