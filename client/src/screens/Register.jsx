import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await axios.post("http://localhost:3000/register", user);

      const { suceess, message } = response.data;
      if (suceess) {
        console.log("register successfull");
      } else {
        console.log(message);
      }
      window.location.href = "http://localhost:5173/login";
      // redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
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

export default Register;
