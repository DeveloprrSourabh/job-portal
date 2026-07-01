import { useState } from "react";
import api from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post(
      "/users/register",
      {
        name,
        email,
        password,
        role,
      }
    );

    console.log(response.data);
    setName("");
    setEmail("");
    setPassword("");
    setRole("student");
    alert("Registration Successful");
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
        Register
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-2 w-full mb-4"
        />

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

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="border p-2 w-full mb-4"
        >
          <option value="student">
            Student
          </option>

          <option value="recruiter">
            Recruiter
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;