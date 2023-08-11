import { useState, useContext } from "react";
import { LoginPage } from "./LoginPage";
import { clearAuthHeader } from "../apis";
import { UserContext } from "../context/userContext";

export function Welcome({ currentUser }) {
  const [loginPrompt, setLoginPrompt] = useState(false);
  const { setUsername } = useContext(UserContext);
  //   const { fetchData } = useContext(DiaryHistoryContext);

  const handleLoginPrompt = (e) => {
    console.log("click detected");
    setLoginPrompt(!loginPrompt);
  };

  const cancelLoginPrompt = () => {
    setLoginPrompt(false);
  };

  const handleLogOut = () => {
    clearAuthHeader();
    setUsername("");
    setTimeout(() => fetchData(), 500);
  };

  const Welcome = () => {
    return (
      <div className="">
        <div>Welcome, {currentUser}</div>
        <div>
          <button onClick={handleLogOut} className="">
            Log Out
          </button>
        </div>
      </div>
    );
  };

  const LoginClickable = () => {
    return (
      <div className="">
        <button className="" onClick={handleLoginPrompt}>
          Login
        </button>
        {loginPrompt ? <LoginPage cancel={cancelLoginPrompt} /> : null}
      </div>
    );
  };

  return currentUser ? <Welcome /> : <LoginClickable />;
}
