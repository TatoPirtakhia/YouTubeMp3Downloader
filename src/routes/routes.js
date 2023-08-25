import axios from "axios";

export const DownloadVideo = async (link) => {
  try {
    const title = await axios.post("http://localhost:3005/api/getTitle", {
      link: link,
    });
    console.log(title)
    const response = await axios.post(
      "http://localhost:3005/api/downloadVideo",
      { link: link },
      { responseType: "blob" }
    );

    // Create a URL object from the response data
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create a temporary link element and trigger the download
    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.setAttribute("download", `${title.data}.mp3`);
    document.body.appendChild(linkElement);
    linkElement.click();

    // Clean up the URL object and link element
    window.URL.revokeObjectURL(url);
    linkElement.remove();
  } catch (error) {
    console.log(error);
  }
};
