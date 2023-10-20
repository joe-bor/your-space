"use client";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

export default function RegisterPage() {
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center flex-col w-1/3 border border-red-400 p-8">
        <h1 className="text-center">Welcome to `Your-Space`</h1>
        {isRegisterFormOpen ? (
          <RegisterForm setIsRegisterFormOpen={setIsRegisterFormOpen} />
        ) : (
          <LoginForm />
        )}
        {isRegisterFormOpen ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() =>
                setIsRegisterFormOpen((prev) => !isRegisterFormOpen)
              }
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() =>
                setIsRegisterFormOpen((prev) => !isRegisterFormOpen)
              }
            >
              Register
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
