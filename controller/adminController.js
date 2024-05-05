import { User } from "../models/user.js";
import { File } from "../models/file.js";
import { uploadFileToS3 } from "../services/s3.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    res.status(201).json({ message: "File status successfully updated to Reject" });
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
      res.status(201).json({ message: "File status successfully updated to Review" });
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
      res.status(201).json({ message: "File status successfully updated to Approve" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };