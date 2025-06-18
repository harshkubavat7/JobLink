import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import coneectDB from './utils/db.js'; // Import the database connection function
import userRoute from './routes/user.route.js'; // Import user routes
import companyRoute from './routes/company.route.js'; // Import company routes
import jobRoute from './routes/job.route.js'; // Import job routes
import applicationRoute from './routes/application.route.js'; // Import application routes
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({}); // Load environment variables from .env file

const app = express();//instance of express

const _dirname = path.resolve(); // Get the current directory name

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions={
  origin:"http://localhost:5173",
  credentials:true,            //access-control-allow-credentials:true
}
app.use(cors(corsOptions));



//api's
app.use('/api/v1/user', userRoute); // Use user routes under /api/v1/user
app.use('/api/v1/company', companyRoute); // Use user routes under /api/v1/user
app.use('/api/v1/job',jobRoute); // Use job routes under /api/v1/job
app.use('/api/v1/application', applicationRoute); // Use application routes under /api/v1/application

app.use(express.static(path.join(_dirname, '/frontend/dist'))); // Serve static files from the frontend build directory
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html")); // Serve the main HTML file for any other route
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  coneectDB();
  console.log(`Server is running on ${port}`);
})