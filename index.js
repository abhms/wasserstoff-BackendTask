import express from 'express';
import fileUpload from "express-fileupload";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './services/db.js';
import routes from './routes/user.js';
import { ImageAnnotatorClient } from '@google-cloud/vision';

connectDB();

dotenv.config(); 
// Create an Express application
const app = express();
app.use(fileUpload())
app.use(bodyParser.json());
// Define a route
app.use('/api', routes); 
// Define a route for handling 404 errors
// app.use((req, res) => {
//   res.status(404).send('Page not found');
// });
// const visionClient = new ImageAnnotatorClient(process.env.VISION_API);
// const visionClient = new ImageAnnotatorClient();
// // visionClient.labelDetection("./raccoons.jpg")
// console.log(visionClient,"visionClientvisionClient")

// async function callAsyncBatchAnnotateFiles() {
//   // Construct request
 
//   const request = {
//     requests:"abhishek",
//   };
//   // Run request
//   const [operation] = await visionClient.asyncBatchAnnotateFiles(request);
//   // const [response] = await operation.promise();
//   console.log(operation,"resssss",request);
// }

// callAsyncBatchAnnotateFiles();
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
