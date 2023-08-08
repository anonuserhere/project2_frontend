import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as Pages from "./pages";

export default function App() {
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
                User Posts
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
                My Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "about" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("about");
                }}
                to="/About"
                aria-current={activeTab === "about" ? "page" : ""}
              >
                About Us
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className="nav-link disabled"
                onClick={setActiveTab}
                aria-disabled="true"
              >
                Disabled
              </Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Pages.LoginPage />} />
          <Route path="/about" element={<Pages.About />} />
          <Route path="/gallery" element={<Pages.Gallery />} />
          <Route path="/user_posts" element={<Pages.UserPosts />} />
        </Routes>
      </Router>
    </>
  );
}
