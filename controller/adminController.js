import { User } from "../models/user.js";
import { File } from "../models/file.js";
import { uploadFileToS3 } from "../services/s3.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "path";
import { Builder } from 'xml2js';
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
export const UpdateStatusReject = async (req, res) => {
  try {
    console.log(req.body, "pppppppp");
    if (!req.body.fileID) {
      return res.status(400).json({ message: "Please Provide File ID" });
    }
    const { fileID } = req.body;

    const UploadedFile = await File.findByIdAndUpdate(
      { _id: fileID },
      {
        status: "Rejected",
      }
    );
    console.log(UploadedFile);
    res
      .status(201)
      .json({ message: "File status successfully updated to Reject" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const UpdateStatusReview = async (req, res) => {
  try {
    console.log(req.body, "pppppppp");
    if (!req.body.fileID) {
      return res.status(400).json({ message: "Please Provide File ID" });
    }
    const { fileID } = req.body;

    const UploadedFile = await File.findByIdAndUpdate(
      { _id: fileID },
      {
        status: "Review",
      }
    );
    console.log(UploadedFile);
    res
      .status(201)
      .json({ message: "File status successfully updated to Review" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const UpdateStatusApprove = async (req, res) => {
  try {
    console.log(req.body, "pppppppp");
    if (!req.body.fileID) {
      return res.status(400).json({ message: "Please Provide File ID" });
    }
    const { fileID } = req.body;

    const UploadedFile = await File.findByIdAndUpdate(
      { _id: fileID },
      {
        status: "Approve",
      }
    );
    console.log(UploadedFile);
    res
      .status(201)
      .json({ message: "File status successfully updated to Approve" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const DownloadIntoCSV = async (req, res) => {
  const csvPath = path.join(__dirname, "File.csv"); // Ensure you define __dirname if using ES modules
  try {
    const csvWriter = createCsvWriter({
      path: csvPath,
      header: [
        { id: "userId", title: "User Id" },
        { id: "path", title: "Path" },
        { id: "annotations", title: "Annotations" },
        { id: "status", title: "Status" },
      ],
    });

    // Fetching all files data from MongoDB
    const UploadedFile = await File.find();

    // Transform the data for the CSV file
    const records = UploadedFile.map((item) => ({
      userId: item.userId.toString(), // Convert ObjectId to string for CSV output
      path: item.path,
      annotations: item.annotations
        .map((anno) => anno.Labels.map((label) => label.Name).join(", "))
        .join(" | "),
      status: item.status,
    }));

    // Write the data to CSV
    await csvWriter.writeRecords(records);

    // Check if the file exists before sending it
    if (fs.existsSync(csvPath)) {
      res.download(csvPath, "Download.csv", (err) => {
        if (err) {
          console.error("Failed to download the file:", err);
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        } else {
          console.log("File successfully sent for download.");
        }

        // Optionally delete file after sending to avoid storage clutter
        fs.unlink(csvPath, (unlinkErr) => {
          if (unlinkErr)
            console.error("Error removing the CSV file:", unlinkErr);
          else console.log("CSV file cleaned up successfully.");
        });
      });
    } else {
      console.error("Generated CSV file not found.");
      res.status(404).send({
        message: "Generated CSV file not found.",
      });
    }
  } catch (error) {
    // Error handling
    console.error("Error preparing CSV:", error);
    res.status(400).json({ message: error.message });
  }
};

export const DownloadJson = async (req, res) => {
    try {
      // Fetching all files data from MongoDB
      const UploadedFile = await File.find();
  
      // Transform the data for the JSON file
      const jsonData = UploadedFile.map(item => ({
        userId: item.userId.toString(), // Convert ObjectId to string for JSON output
        path: item.path,
        annotations: item.annotations.map(anno =>
          anno.Labels.map(label => label.Name).join(', ')
        ).join(' | '), // Join all label names and annotations similarly to the CSV transformation
        status: item.status,
        createdAt: item.createdAt.toISOString(), // Ensure date is in ISO format for clarity
        __v: item.__v
      }));
  
      // Set Headers to force download and specify the filename
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=download.json');
  
      // Send the JSON data
      res.send(JSON.stringify(jsonData, null, 4)); // Pretty print the JSON for better readability
    } catch (error) {
      // Error handling
      console.error("Error preparing JSON download:", error);
      res.status(400).json({ message: error.message });
    }
  };
  
  export const DownloadXml = async (req, res) => {
    try {
      // Fetching all files data from MongoDB
      const UploadedFile = await File.find();
  
      // Transform the data for the XML file
      const dataForXml = UploadedFile.map(item => ({
        userId: item.userId.toString(),
        path: item.path,
        annotations: item.annotations.map(anno =>
          anno.Labels.map(label => ({ label: label.Name })).join(', ')
        ).join(' | '),
        status: item.status,
        createdAt: item.createdAt.toISOString(),
        __v: item.__v
      }));
  
      // Create an instance of the XML builder
      const builder = new Builder();
      const xml = builder.buildObject({ files: dataForXml });
  
      // Set Headers to force download and specify the filename
      res.setHeader('Content-Type', 'text/xml');
      res.setHeader('Content-Disposition', 'attachment; filename=download.xml');
  
      // Send the XML data
      res.send(xml);
    } catch (error) {
      // Error handling
      console.error("Error preparing XML download:", error);
      res.status(400).json({ message: error.message });
    }
  };
  