import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  //   const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const updateForm = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h3>Login:</h3>
      <div className="container m-3">
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={loginDetails.email}
            onChange={updateForm}
          />
        </div>
        <div className="mt-1">
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={loginDetails.password}
            onChange={updateForm}
          />
        </div>
        <button className="btn btn-info mt-1">Login</button>
      </div>
    </>
  );
}
