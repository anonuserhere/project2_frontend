import React, { useState, useContext } from "react";
import "../style.css";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

export function Gallery() {
  const [search, setSearch] = useState([]);
  const { images } = useContext(PostContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching...", search);
    setSearch([]);
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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 3fr)",
          }}
        >
          {images.map((i) => {
            return (
              <div
                className="card m-1"
                id="image_card"
                key={i._id}
                onClick={() => handleSelection(i._id)}
              >
                <img
                  src={i.link}
                  className="card-img-top"
                  style={{ height: "80%" }}
                  alt="pic"
                />
                <div className="card-body" style={{ color: "darkblue" }}>
                  <p className="card-text">Posted by: {i.uploader}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
