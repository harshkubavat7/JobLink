import DataUriParser from 'datauri/parser.js';
import path from 'path'; // Importing path for file path manipulation

const getDataUri = (file) =>{
    const parser = new DataUriParser();
    if (!file || !file.originalname || !file.buffer) {
    console.error("Invalid file object passed to getDataUri:", file);
    return null;
  }
    const extName = path.extname(file.originalname).toString(); // Get the file extension in lowercase
    return parser.format(extName, file.buffer); // Format the file to a data URI
}

export default getDataUri;