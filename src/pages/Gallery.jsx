import React, { useState, useContext, useEffect } from "react";
import "../style.css";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

export function Gallery() {
  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const [originalImages, setOriginalImages] = useState([]);
  const { images, setImages, fetchData } = useContext(PostContext);

  const navigate = useNavigate();

  useEffect(() => {
    setOriginalImages(images);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      setImages(originalImages);
    } else {
      const filteredSearch = search.trim().toLowerCase();
      const searchedPosts = originalImages.filter((image) => {
        return image.genre.some((tag) =>
          tag.toLowerCase().includes(filteredSearch)
        );
      });
      setImages(searchedPosts);
      setSearch("");
    }
  };

  const handleSelection = (postId) => {
    navigate(`/gallery/${postId}`);
  };

  return (
    <>
      <div className="gallery-container d-flex-col mt-3">
        <form
          className="form d-flex justify-content-center"
          onSubmit={handleSearch}
        >
          <div
            className="input-group mb-3"
            style={{ width: "60dvw", height: "50px" }}
          >
            <input
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Search by tags"
              aria-label="search input"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-info"
                style={{ height: "50px", borderRadius: "3px" }}
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div
          className="card-container d-grid justify-content-center grid-template-columns m-4 p-0"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 3fr)",
          }}
        >
          {images.map((i) => {
            return (
              <div
                className="card m-1"
                id="image_card"
                key={i._id}
                onClick={() => handleSelection(i._id)}
                style={{ height: "45dvh" }}
              >
                <img
                  src={i.url}
                  className="card-img-top"
                  style={{ height: "80%" }}
                  alt="pic"
                />
                <div
                  className="card-body"
                  style={{ color: "darkblue", backgroundColor: "cornsilk" }}
                >
                  <p className="card-text">Posted by: {i.user}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
