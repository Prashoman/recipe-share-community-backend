// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// import multer from "multer";
// import config from "../app/config";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: config.cloudinary_cloud_name,
//   api_key: config.cloudinary_api_key,
//   api_secret: config.cloudinary_api_secret,
// });

// export const sendImageToCloudinary = (
//   imageName: string,
//   path: string,
// ): Promise<Record<string, unknown>> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       { public_id: imageName.trim()},
//       function (error, result) {
//         if (error) {
//           reject(error);
//         }
//         resolve(result as UploadApiResponse);
//         // delete a file asynchronously
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('File is deleted.');
//           }
//         });
//       },
//     );
//   });
// };

// // export const sendImageToCloudinary = (path: string, imageName: string) => {
  
// //   // Upload an image
// //   cloudinary.uploader
// //     .upload(path, {
// //       public_id: imageName.trim(),
// //     },
// //     function (error, result) {
// //       if (error) {
// //         console.log(error);
// //       }
// //       console.log(result);
// //     }
// //       // delete a file asynchronously
// //   )
// //   //   .catch((error) => {
// //   //     console.log(error);
// //   //   });
// //   // return uploadResult;
// //   // console.log(uploadResult);
// // };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + "/uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// export const upload = multer({ storage: storage });
