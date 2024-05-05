const cloud_name = "doy857iqw";
const upload_preset = "iamuser1234";

const uploadImage = async (coverPhoto) => {
  const data = new FormData();
  data.append("file", coverPhoto);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  const options = {
    method: "POST",
    body: data,
  };

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      options
    );
    const result = await res.json();
    console.log(result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
