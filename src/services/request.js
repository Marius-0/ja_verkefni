import axios from "axios";

export default async function get(params) {
  const url = new URL("https://api.ja.is/search/v6");
  url.search = params;
  var data = await axios
    .get(url.toString(), {
      headers: { Authorization: process.env.VUE_APP_AUTHKEY },
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      return null;
    });

  console.log(data);
  return data;
}
