import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });

    console.log(response.data);
    localStorage.setItem(
      "token",
      response.data.token
    );
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
    alert("Login Successful");
    setIsLoggedIn(true);
    setUser(response.data.user);
    navigate("/");
  } catch (error) {
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-2 w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;