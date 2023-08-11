import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserPosts() {
  //   const navigate = useNavigate();

  const [formState, setFormState] = useState({
    link: "",
    genre: [],
    date: "",
    site: "",
    caption: "",
    cam_details: "",
  });

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getGenres() {
      try {
        let genres = await axios.get("/genreList.json");
        setGenres(genres.data);
      } catch (e) {
        console.error(e);
      }
    }
    getGenres();
  }, []);

  const updateForm = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormState((prev) => ({
          ...prev,
          genre: [...prev.genre, value],
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          genre: prev.genre.filter((g) => g !== value),
        }));
      }
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const clearForm = () => {
    setFormState({
      link: "",
      genre: [],
      date: "",
      site: "",
      caption: "",
      cam_details: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearForm();
  };

  return (
    <>
      <div className="ms-3 mt-2">
        <h5>Post something:</h5>
        <form
          onSubmit={handleSubmit}
          className="form"
          style={{ width: "80dvw" }}
        >
          <div className="form-floating mb-2 mt-1">
            <input
              className="form-control"
              type="text"
              id="link"
              name="link"
              value={formState.link}
              onChange={updateForm}
              placeholder="link to your image"
            />
            <label style={{ color: "darkViolet" }} htmlFor="link">
              Link:
            </label>
          </div>
          <div
            id="genre_container"
            className="mb-3"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              maxWidth: "100%",
            }}
          >
            <label className="me-3">Genre/Type:</label> <br />
            {genres.map((g) => (
              <div
                key={g.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "15px",
                  marginBottom: "3px",
                }}
              >
                <input
                  className="form-check-input ms-1 me-1"
                  type="checkbox"
                  name="genre"
                  key={g.value}
                  value={g.value}
                  checked={formState.genre.includes(g.value)}
                  onChange={updateForm}
                />
                <span className="form-check-label">{g.display}</span>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <label className="form-label me-1">Date taken:</label>
            <input
              style={{ height: "40px" }}
              type="date"
              id="date"
              name="date"
              value={formState.date}
              onChange={updateForm}
            />
          </div>
          <div className="form-floating mb-2">
            <textarea
              style={{ height: "80px" }}
              className="form-control"
              name="cam_details"
              id="cam_details"
              value={formState.cam_details}
              onChange={updateForm}
              placeholder="say a little something about your post"
            ></textarea>
            <label style={{ color: "darkViolet" }} htmlFor="cam_details">
              Camera details:
            </label>
          </div>
          <div className="form-floating mb-2">
            <input
              className="form-control"
              type="text"
              id="site"
              name="site"
              placeholder="instagram/imgur/etc."
              value={formState.site}
              onChange={updateForm}
            />
            <label style={{ color: "darkviolet" }} htmlFor="site">
              Site:
            </label>
          </div>
          <div className="form-floating mb-2">
            <textarea
              style={{ height: "95px" }}
              className="form-control"
              name="caption"
              id="caption"
              value={formState.caption}
              onChange={updateForm}
              placeholder="say a little something about your post"
            ></textarea>
            <label style={{ color: "darkViolet" }} htmlFor="caption">
              Caption:
            </label>
          </div>
          <button type="submit" className="btn btn-info">
            Post
          </button>
        </form>
      </div>
    </>
  );
}
