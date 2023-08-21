import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";

export function GalleryEdit() {
  const { images, deletePost, editPost } = useContext(PostContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedImage = images.find((i) => i._id === id) || {};
  const [formEdit, setFormEdit] = useState({ selectedImage });

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedFormEdit = {
      ...formEdit,
      genre: Array.isArray(formEdit.genre) ? formEdit.genre : [],
    };

    // if (updatedFormEdit.url !== selectedImage.url) {
    //   updatedFormEdit.url = formEdit.url;
    // } else {
    //   updatedFormEdit.url = selectedImage.url;
    // }
    // if (updatedFormEdit.genre.join(", ") !== selectedImage.genre.join(", ")) {
    //   updatedFormEdit.genre = formEdit.genre;
    // } else {
    //   updatedFormEdit.genre = selectedImage.genre;
    // }
    // if (updatedFormEdit.site !== selectedImage.site) {
    //   updatedFormEdit.site = formEdit.site;
    // } else {
    //   updatedFormEdit.site = selectedImage.site;
    // }
    // if (updatedFormEdit.cam_details !== selectedImage.cam_details) {
    //   updatedFormEdit.cam_details = formEdit.cam_details;
    // } else {
    //   updatedFormEdit.cam_details = selectedImage.cam_details;
    // }
    // if (updatedFormEdit.date !== selectedImage.date) {
    //   updatedFormEdit.date = formEdit.date;
    // } else {
    //   updatedFormEdit.date = selectedImage.date;
    // }
    // if (updatedFormEdit.caption !== selectedImage.caption) {
    //   updatedFormEdit.caption = formEdit.caption;
    // } else {
    //   updatedFormEdit.caption = selectedImage.caption;
    // }

    for (const field of [
      "url",
      "genre",
      "site",
      "cam_details",
      "date",
      "caption",
    ]) {
      if (updatedFormEdit[field] !== selectedImage[field]) {
        updatedFormEdit[field] = formEdit[field];
      } else {
        updatedFormEdit[field] = selectedImage[field];
      }
    }
    setFormEdit(updatedFormEdit);
    editPost(selectedImage._id, updatedFormEdit);
    alert("Post edited");
    goBack();
  };

  const goBack = () => {
    navigate("/gallery");
  };

  return (
    <>
      <div className="container mt-4">
        <form className="form">
          <div className="card-container d-flex justify-content-center p-0">
            <div
              className="card"
              style={{
                width: "90dvw",
                backgroundColor: "#242424",
                border: "none",
              }}
              key={selectedImage._id}
            >
              <div className="row g-0">
                <div className="col-md-7">
                  <img
                    src={selectedImage.url}
                    className="img-fluid rounded"
                    alt="pic"
                  />
                </div>
                <div
                  className="col-md-5"
                  style={{
                    color: "lightblue",
                    overflowY: "auto",
                  }}
                >
                  <div className="card-body ms-3">
                    <p className="card-text">
                      Tags:
                      <input
                        className="form-control"
                        name="genre"
                        value={formEdit.genre}
                        placeholder={
                          selectedImage.genre
                            ? selectedImage.genre.join(", ")
                            : ""
                        }
                        onChange={handleEdit}
                      />
                    </p>
                    <p className="card-text">
                      Source:
                      <input
                        className="form-control"
                        name="site"
                        value={formEdit.site}
                        placeholder={selectedImage.site}
                        onChange={handleEdit}
                      />
                    </p>
                    <p className="card-text">
                      Camera details:
                      <input
                        className="form-control"
                        name="cam_details"
                        value={formEdit.cam_details}
                        placeholder={selectedImage.cam_details}
                        onChange={handleEdit}
                      />
                    </p>
                    <p className="card-text">
                      Taken on:
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={formEdit.date}
                        // placeholder={
                        //   selectedImage.date?.slice(0, 10) || "YYYY-MM-DD"
                        // }
                        onChange={handleEdit}
                      />
                    </p>
                    <p className="card-text">Posted by: {selectedImage.user}</p>
                    <p> ============ </p>
                    <h6 className="card-title">
                      Caption:
                      <input
                        className="form-control"
                        name="caption"
                        value={formEdit.caption}
                        placeholder={selectedImage.caption}
                        onChange={handleEdit}
                      />
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-container mt-3 mb-3">
            <button className="btn btn-info me-2" onClick={goBack}>
              Back 🔙
            </button>
            <button className="btn btn-info me-5" onClick={handleEditSubmit}>
              Confirm Edit
            </button>
            <button
              className="btn btn-danger me-2"
              onClick={() => {
                deletePost(selectedImage._id);
                alert("Post deleted successfully");
                goBack();
              }}
            >
              Delete ✖️
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
