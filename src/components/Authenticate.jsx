import { useState } from "react";

const Authenticate = ({ token }) => {
  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  async function handleClick() {
    setSuccessMsg(null);
    setUserData(null);
    setError(null);

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setSuccessMsg(result.message);
        setUserData(result.data);
      } else {
        setError(result.message || "Authentication failed");
      }
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div>
      <h2>Authenticate</h2>
      {successMsg && <p>{successMsg}</p>}
      {userData && (
        <div>
          <p>Success, {userData.username}!</p>
        </div>
      )}
      <button onClick={handleClick}>Authenticate Token</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Authenticate;
