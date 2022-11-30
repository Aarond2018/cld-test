
const cloudinary = require("cloudinary").v2;
const { myUploadMiddleware, runMiddleware } = require("../../helpers/helpers");

cloudinary.config({
  cloud_name: process.env.CLD_CLOUD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  await runMiddleware(req, res, myUploadMiddleware);
  let imgPublicIds = [];
  for (const file of req.files) {
    try {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const response = await cloudinary.uploader.upload(dataURI);
      imgPublicIds.push(response.public_id);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  res.status(200).json(imgPublicIds)
}
export const config = {
  api: {
    bodyParser: false,
  },
};