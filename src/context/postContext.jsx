import { createContext, useState, useEffect } from "react";
import API from "../apis";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("http://localhost:3001");
      if (res.status === 200) {
        setImages(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
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

  const editPost = (postId, updatedData) => {
    API.put(`http://localhost:3001/${postId}`, updatedData).then((res) => {
      try {
        if (res.status === 200) {
          console.log("post edited successfully");
        } else {
          console.log("something went wrong");
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  const deletePost = (postId) => {
    API.delete(`http://localhost:3001/${postId}`).then((res) => {
      console.log(postId);
      if (res.status === 404) {
        console.log("Successfully deleted");
      } else {
        console.log("Error: " + res.status);
      }
    });
  };

  return (
    <PostContext.Provider
      value={{ images, setImages, fetchData, postData, deletePost, editPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
