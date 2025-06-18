import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload =multer({storage}).single("file"); // file name should be same as type in form