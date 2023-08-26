import axios from "axios";
export const getTitle = async (link) => {
  try {
    const titleResponse = await axios.post(
      "http://localhost:3005/api/getTitle",
      {
        link: link,
      }
    );
    return titleResponse
  } catch (error) {
    console.log(error);
  }
};
export const DownloadVideo = async (link, title) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/downloadMusic",
      { link: link },
      { responseType: "blob" }
    );
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.setAttribute("download", `${title}.mp3`);
    document.body.appendChild(linkElement);
    linkElement.click();

    window.URL.revokeObjectURL(url);
    linkElement.remove();
  } catch (error) {
    console.log(error);
  }
};
