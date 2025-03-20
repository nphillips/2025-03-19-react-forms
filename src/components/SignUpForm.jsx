import { useState } from "react";

const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSuccessMsg(null);

    if (username.length < 8) {
      setError("Username must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const result = await response.json();
      setToken(result.token);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>User name:</span>{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => {
              const newValue = e.target.value;
              setUsername(newValue);
              setUsername(e.target.value);
              setUsernameValid(newValue.length >= 8 || newValue.length === 0);
            }}
            className={
              username.length > 0 && !usernameValid ? "input-error" : ""
            }
          />
        </label>
        <label>
          <span>Password:</span>{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        {error && <div className="sign-up-error-message">{error}</div>}
        <div className="button-area">
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
