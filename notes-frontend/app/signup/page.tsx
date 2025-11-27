"use client";

import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const temp: any = {};

    if (!form.name.trim()) temp.name = "Username is required";

    if (!form.email.trim()) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Enter a valid email";

    if (!form.password.trim()) temp.password = "Password is required";
    else if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters";

    if (!form.confirmPassword.trim())
      temp.confirmPassword = "Confirm password is required";
    else if (form.password !== form.confirmPassword)
      temp.confirmPassword = "Passwords do not match";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  }

  async function submit(e: any) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await AuthService.signup({
        user_name: form.name,
        user_email: form.email,
        password: form.password,
      });

      alert("Account created — please login");
      router.push("/signin");
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#F4ECD8] flex flex-col">
      {/* Breadcrumb */}
      <div className="px-8 py-4 text-sm text-[#A08464]">
        Homepage / <span className="font-medium text-black">Signup Page</span>
      </div>

      {/* Signup Box */}
      <div className="flex flex-1 justify-center items-start mt-10">
        <div className="bg-[#FDF7EC] border border-[#E6DCC3] rounded-lg shadow-md w-[350px]">
          {/* Window bar */}
          <div className="bg-[#F2C4A7] px-4 py-2 rounded-t-lg flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="ml-auto font-medium text-sm text-[#4A3A28]">
              Signup
            </p>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center text-[#4A3A28]">
              Signup
            </h2>

            {/* Inputs */}
            {["name", "email", "password", "confirmPassword"].map((field) => (
              <div className="flex flex-col gap-1" key={field}>
                <label className="text-sm text-[#4A3A28] capitalize">
                  {field === "confirmPassword"
                    ? "Confirm Password"
                    : field === "name"
                    ? "Username"
                    : field}
                </label>

                <input
                  type={field.toLowerCase().includes("password") ? "password" : "text"}
                  name={field}
                  className={`p-2 rounded border ${
                    errors[field] ? "border-red-500" : "border-[#D5C6A1]"
                  } focus:outline-none focus:border-[#8EC5C0]`}
                  value={form[field]}
                  onChange={handleChange}
                />

                {errors[field] && (
                  <p className="text-red-500 text-xs">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-between gap-3 mt-4">
              <button
                onClick={submit}
                className="flex-1 bg-[#00e275] text-black py-2 rounded shadow hover:opacity-90"
              >
                Register
              </button>

              <button
                onClick={() => router.push("/signin")}
                className="flex-1 bg-[#f3b07c] text-black py-2 rounded shadow hover:opacity-90"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
