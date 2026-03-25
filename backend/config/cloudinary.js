import { v2 as cloudinary } from "cloudinary";

const { cloud_name, api_key, api_secret } = process.env;

if (!cloud_name || !api_key || !api_secret) {
    throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

export default cloudinary;
