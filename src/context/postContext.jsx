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
    } catch (e) {
      console.error(e);
    }
  };

  const postData = (newImagePost) => {
    API.post("http://localhost:3001", newImagePost).then((res) => {
      try {
        if (res.status === 201) {
          const newImage = res.data;
          setImages((prev) => [...prev, newImage]);
        }
      } catch (e) {
        console.error(e);
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
        console.error(e);
      }
    });
  };

  const deletePost = (postId) => {
    API.delete(`http://localhost:3001/${postId}`).then((res) => {
      try {
        if (res.status === 404) {
          console.log("Successfully deleted");
        } else {
          console.log("Error: " + res.status);
        }
      } catch (e) {
        console.error(e);
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
