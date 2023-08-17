import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";

export function Gallery2() {
  const { images } = useContext(PostContext);
  const { id } = useParams();
  const navigate = useNavigate();

  let selectedImage = images.find((i) => i._id === id);

  const goBack = () => {
    navigate("/gallery");
  };

  return (
    <>
      <div className="container mt-4">
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
                  src={selectedImage.link}
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
                    Tags: {selectedImage.genre.join(", ")}
                  </p>
                  <p className="card-text">Source: {selectedImage.site}</p>
                  <p className="card-text">
                    Camera details: {selectedImage.cam_details}
                  </p>
                  <p className="card-text">
                    Taken on: {selectedImage.date?.slice(0, 10) || null}
                  </p>
                  <p className="card-text">
                    Posted by: {selectedImage.uploader}
                  </p>
                  <p> ============ </p>
                  <h6 className="card-title">
                    Caption: {selectedImage.caption}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container mt-3">
          <button className="btn btn-info" onClick={goBack}>
            Back 🔙
          </button>
        </div>
      </div>
    </>
  );
}
