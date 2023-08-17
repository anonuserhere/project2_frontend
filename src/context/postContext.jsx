import { createContext, useState, useEffect } from "react";
import API from "../apis";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    API.get("http://localhost:3001").then((res) => {
      if (res.status === 200) {
        setImages(res.data);
        console.log(res.data);
      }
    });
  };

  const postData = (newImagePost) => {
    API.post("http://localhost:3001", newImagePost).then((res) => {
      if (res.status === 201) {
        const newImage = res.data;
        setImages((prev) => [...prev, newImage]);
        console.log("Successfully posted image: " + newImage);
      }
    });
  };

  return (
    <PostContext.Provider value={{ images, setImages, fetchData, postData }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
