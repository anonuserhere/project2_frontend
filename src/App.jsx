import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as Pages from "./pages";

export default function App() {
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Router>
        <nav className="nav-bar mt-2 ms-2">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                onClick={() => handleTabChange("login")}
                to="/"
                aria-current={activeTab === "login" ? "page" : ""}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeTab === "user_posts" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("user_posts");
                }}
                to="/user_posts"
                aria-current={activeTab === "user_posts" ? "page" : ""}
              >
                My Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeTab === "gallery" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("gallery");
                }}
                to="/gallery"
                aria-current={activeTab === "gallery" ? "page" : ""}
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "about" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("about");
                }}
                to="/about"
                aria-current={activeTab === "about" ? "page" : ""}
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Pages.LoginPage />} />
          <Route path="/about" element={<Pages.About />} />
          <Route path="/gallery" element={<Pages.Gallery />} />
          <Route path="/gallery/:id" element={<Pages.Gallery2 />} />
          <Route path="/gallery/edit/:id" element={<Pages.GalleryEdit />} />
          <Route path="/user_posts" element={<Pages.UserPosts />} />
          <Route path="/not_found" element={<Pages.NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
