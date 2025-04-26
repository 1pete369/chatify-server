import { v2 as cloudinary } from "cloudinary"

import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
  cloud_name: "dn0jvlfkr",
  api_key: "197743686785961",
  api_secret: "6qx6prskPubGe3DfduPLGDphoBI",
  signatureAlgorithm : "sha256"
})

export default cloudinary
