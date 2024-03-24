export const uploadToCloudinary = async (file, fileType) => {
  if (file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "twitter");
    data.append("cloud_name", "diuzbmcfv");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/diuzbmcfv/${fileType}/upload`,
      {
        method: "post",
        body: data,
      }
    );
    if (!res.ok) {
        console.error('Failed to fetch:', res.status, res.statusText);
        throw new Error('Failed to fetch');
      }
    const fileData = await res.json();
    console.log("url : ", fileData.url.toString());
    return fileData.url.toString();
  } else {
    console.log("CLOUDNARY ERROR");
  }
};


