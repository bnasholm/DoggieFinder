import React, { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../components/forms/Input";
import { validateEmail } from "../utils";
import { loginUser } from "../api";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!name) {
      setError("Please enter a name");
      return;
    }
    setError("");
    try {
      await loginUser({ name, email });
      updateUser({ name, email });
      navigate("/");
    } catch (error) {
      setError("Something went wrong");
      console.warn(error);
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <Input
            value={name}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              setName(target.value)
            }
            label="Name"
            placeholder="Sally"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(target.value)
            }
            label="Email Address"
            placeholder="sally@example.com"
            type="email"
          />
          <p className="text-red-500 text-xs pb-2.5">{error || <>&nbsp;</>}</p>

          <button type="submit" className="btn-primary">
            Log in
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
