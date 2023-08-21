import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

export function UserPosts() {
  const { postData } = useContext(PostContext);
  //   const navigate = useNavigate();

  const [formState, setFormState] = useState({
    url: "",
    genre: [],
    date: "",
    site: "",
    caption: "",
    cam_details: "",
  });

  const [genres, setGenres] = useState([]);
  // const linkRegex =
  //   /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
  const linkRegex =
    /^(https?):\/\/[-a-zA-Z0-9@:%._\+~#=]{2,128}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

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
  }, [genres]);

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
      url: "",
      genre: [],
      date: "",
      site: "",
      caption: "",
      cam_details: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validLink = linkRegex.test(formState.url);
    console.log(validLink);
    if (validLink) {
      postData(formState);
      console.log(formState);
      alert("Post erm... posted.");
      clearForm();
    } else if (validLink === false) {
      alert("Invalid link provided");
    } else if (!formState.genre) {
      alert("Please select a genre tag");
    } else {
      console.log("Something else broke:", e);
    }
  };

  return (
    <>
      <div className="form-container ms-3 mt-3">
        <div className="d-flex justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="form"
            style={{ width: "80dvw" }}
          >
            <h5>Post something:</h5>
            <div className="form-floating mb-2 mt-1">
              <input
                className="form-control"
                type="text"
                id="url"
                name="url"
                value={formState.url}
                onChange={updateForm}
                placeholder="link to your image"
              />
              <label style={{ color: "darkBlue" }} htmlFor="url">
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
                placeholder="capture device details"
              ></textarea>
              <label style={{ color: "darkBlue" }} htmlFor="cam_details">
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
              <label style={{ color: "darkBlue" }} htmlFor="site">
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
              <label style={{ color: "darkBlue" }} htmlFor="caption">
                Caption:
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-info"
              disabled={
                !formState.url ||
                !formState.genre ||
                !formState.site ||
                !formState.caption
              }
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
