import React, { useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { clearAuthHeader, setAuthHeader } from "../apis";
import API from "../apis";
import { UserContext } from "../context/userContext";

export function LoginPage({ cancel }) {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const { setUserName } = useContext(UserContext);

  const handleChange = (e) => {
    e.preventDefault();
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
    setAuthHeader(uid, token);
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

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">Email:</label>
          <input type="email" />
          <label className="form-label">Password:</label>
          <input type="password" />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button className="btn btn-warning">Cancel</button>
        </form>
      </div>
    </>
  );
}
