import React, { useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { clearAuthHeader, setAuthHeader } from "../apis";
import API from "../apis";
import { UserContext } from "../context/userContext";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const { setUserName } = useContext(UserContext);

  const handleChange = (e) => {
    const entry = { [e.target.name]: e.target.value };
    setFormData((prev) => ({
      ...prev,
      ...entry,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = formData;
    if (!isValidEmail(email)) {
      setError("Invalid email format");
    }
    const auth = getAuth();
    console.log("credentials -->", email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("created user -->", user);
        const idToken = await user.getIdToken();
        handleSuccessLogin(user.uid, user.email, idToken);
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log("error:", errorCode, errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const user = userCredential.user;
              console.log("user -->", user);
              const idToken = await user.getIdToken();
              handleSuccessLogin(user.uid, user.email, idToken);
            })
            .catch((e) => {
              const errorCode = e.code;
              const errorMessage = e.message;
              setError(errorMessage);
            });
        }
      });
  };

  const handleSuccessLogin = (uid, email, idToken) => {
    setAuthHeader(uid, idToken);
    API.post("/user/login", { email }).then((res) => {
      setUserName(email);
      // fetchData();
      window.localStorage.setItem("email -->", email);
      clearAuthHeader();
    });
  };

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="form-container ms-3 mt-3">
        <form
          className="form"
          style={{ width: "80dvw" }}
          onSubmit={handleSubmit}
        >
          <div className="form-floating">
            <input
              className="form-control"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label style={{ color: "darkViolet" }} htmlFor="email">
              Email:
            </label>
          </div>
          <div className="form-floating">
            <input
              className="form-control mt-2"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label style={{ color: "darkViolet" }} htmlFor="password">
              Password:
            </label>
          </div>
          <div className="mt-2">
            <button className="btn btn-primary me-2" type="submit">
              Submit
            </button>
            <button className="btn btn-warning" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
