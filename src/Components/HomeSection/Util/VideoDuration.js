export const getVideoDuration = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);

     video.addEventListener("loadedmetadata", () => {
        const durationInSeconds = video.duration;
        resolve(durationInSeconds);
        video.remove();
        URL.revokeObjectURL(video.src);
      });

      video.addEventListener("error", (error) => {
        reject(error);
        video.remove();
        URL.revokeObjectURL(video.src);
      });

       video.preload = "metadata";
    } catch (error) {
      reject(error);
    }
  });
};


