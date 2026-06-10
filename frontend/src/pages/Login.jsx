import React, { useState } from 'react'

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit = (e) => {
    e.preventDefault();

    console.table({
      email,
      password,
    });
  };
  return (
    <>
        <div className="max-w-md mx-auto mt-10 border p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        Register
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
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
    </>
  )
}

export default Login