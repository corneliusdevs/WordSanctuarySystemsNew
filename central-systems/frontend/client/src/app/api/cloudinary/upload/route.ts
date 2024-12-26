import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinaryV2 } from "cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // const imageName = formData.get("imageName")?.toString();
    // const alternativeText = formData.get("alternativeText")?.toString();
    const file = formData.get("file");
    const cloudinaryFormData = new FormData();
    if (!file) {
      throw new Error("No valid type found in upload body");
    } else if (
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

      const timeStamp = String(Math.floor(Date.now() / 1000)); // unix time stamp in seconds
      // const signature = CryptoJs.HmacSHA1(`timestamp=${timeStamp}${process.env.CLOUDINARY_API_SECRET}`, process.env.CLOUDINARY_API_SECRET).toString(CryptoJs.enc.Hex)

      const params_to_sign: Record<string, any> = {};

      params_to_sign.timestamp = timeStamp;
      const signature = cloudinaryV2.utils.api_sign_request(
        params_to_sign,
        process.env.CLOUDINARY_API_SECRET
      );

      // append the necessary details to the cloudinaryFormData
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("api_key", process.env.CLOUDINARY_API_KEY);
      cloudinaryFormData.append("timestamp", timeStamp);
      cloudinaryFormData.append("signature", signature);

      console.log("about to upload to cloudinary ", cloudinaryFormData);

      // save the image to cloudinary
      const upload = await fetch(uploadUrl, {
        method: "POST",
        body: cloudinaryFormData,
      })
        .then(async (response) => {
          console.log("upload successs ", response);
          return response.json();
        })
        .catch((err) => {
          console.log("upload failed ", err);
        });

      console.log("upload result ", upload);

      return NextResponse.json(
        {
          secureUrl: upload?.secure_url,
          url: upload?.url,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "upload failed" }, { status: 500 });
    }
  } catch (err) {
    console.log("error uploading image to cloudinary ", err);
    throw new Error("Could not upload image to cloudinary");
  }
}
