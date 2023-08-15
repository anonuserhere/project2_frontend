import React, { useState } from "react";
import "../style.css";
import axios from "axios";
import { PostContext } from "../context/postContext";

export function Gallery() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching...", search);
    setSearch([]);
  };

  return (
    <>
      <div className="form-container ms-3 mt-3">
        <form
          className="form d-flex justify-content-center"
          onSubmit={handleSearch}
        >
          <div
            className="input-group mb-3"
            style={{ width: "65dvw", height: "50px" }}
          >
            <input
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Search by tags"
              aria-label="search"
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
      </div>
    </>
  );
}
