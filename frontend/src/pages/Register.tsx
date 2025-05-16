import { useState } from "react";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Api from "../utils/axios";


export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // clear old errors
    try {
      const response = await Api.post("/account/register/", formData);
      console.log((response.data as { message: string }).message);
      navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorData = error.response?.data;
        if (typeof errorData === "object") {
          setErrors(errorData as Record<string, string[]>);
        } else {
          console.log("Error: " + errorData);
        }
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-serif text-gray-700 text-center mt-20">
        Create an Account
      </h1>
      <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 w-1/2 flex flex-col justify-center items-center mt-20 mb-auto ml-auto mr-auto bg-white rounded shadow-md"
    >
      <input
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="Username"
        required
        className="w-full p-2 border-b placeholder:text-gray-700 focus:placeholder:text-gray-300 transition duration-500 ease-in-out"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.join(", ")}</p>
      )}

      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border-b placeholder:text-gray-700 focus:placeholder:text-gray-300 transition duration-500 ease-in-out"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.join(", ")}</p>
      )}

      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-2 border-b placeholder:text-gray-700 focus:placeholder:text-gray-300 transition duration-500 ease-in-out"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.join(", ")}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create account
      </button>
    </form>
    </div>
  );
}
