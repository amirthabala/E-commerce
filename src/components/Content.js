import { useEffect, useState } from "react"
import axios from "axios"

function Content() {

  const [message, setMessage] = useState("");

  useEffect(() => {
      let isDevelopment = process.env.NODE_ENV === "development"

      axios.request({
        method: "get",
        baseURL: isDevelopment ? "http://localhost:4000" : "https://meruhealthapi.skillmind.org",
        url: "/"
      })
      .then(function (response) {
        // console.log(response);
        setMessage(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return (
      <div className="mt-4 text-center">
        <h2>{message ? message : "No Message from Backend"}</h2>
      </div>
  )
}

export default Content;