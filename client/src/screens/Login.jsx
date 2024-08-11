import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginData
      );

      const { success, message } = response.data;

      if (success) {
        console.log("login successfull");
      } else {
        console.log(message);
      }
      setLoginData({ username: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={loginData.username}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginData.password}
          onChange={handleLoginChange}
        />

        <button type="submit">Login</button>

        <p>
          Not registered yet? <span> </span>
          <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
