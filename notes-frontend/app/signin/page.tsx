"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { validateLogin } from "@/utils/validators";
import { AuthService } from "@/services/auth.service";
import { setAuthToken } from "@/lib/api";

export default function SignIn() {
  const router = useRouter();
  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const validation = validateLogin(email, password);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      const res = await AuthService.login(email, password);
      const token = res.data.access_token;

      setToken(token);
      setAuthToken(token);

      router.push("/notes");
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Login failed");
    }
  }

  return (
    <div className="max-h-screen h-screen w-full bg-[#F4ECD8] flex flex-col">
      {/* Breadcrumb */}
      <div className="px-8 py-4 text-sm text-[#A08464]">
        Homepage / <span className="text-black font-medium">Login Page</span>
      </div>

      {/* Center Login UI */}
      <div className="flex flex-1 justify-center items-start mt-10">
        <div className="bg-[#FDF7EC] border border-[#E6DCC3] rounded-lg shadow-md w-[350px]">
          
          <div className="bg-[#F2C4A7] px-4 py-2 rounded-t-lg flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="ml-auto text-sm font-medium text-[#4A3A28]">Login</p>
          </div>

          <form onSubmit={submit} className="p-6 flex flex-col gap-4">
            <h2 className="text-center text-xl font-semibold text-[#4A3A28]">
              Login
            </h2>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#4A3A28]">
                Email
              </label>
              <input
                type="email"
                className={`p-2 rounded-lg border bg-[#FFFDF7] text-[#4A3A28] 
                  placeholder:text-[#C1AE92] shadow-sm focus:outline-none transition
                  ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#D5C6A1] focus:border-[#8EC5C0]"
                  }`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#4A3A28]">
                Password
              </label>
              <input
                type="password"
                className={`p-2 rounded-lg border bg-[#FFFDF7] text-[#4A3A28] 
                  placeholder:text-[#C1AE92] shadow-sm focus:outline-none transition
                  ${
                    errors.password
                      ? "border-red-500"
                      : "border-[#D5C6A1] focus:border-[#8EC5C0]"
                  }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 bg-[#f5af78] text-black py-2 rounded-xl shadow hover:opacity-90"
              >
                Login
              </button>

              <button
                type="button"
                className="flex-1 bg-[#96cdd1] text-black py-2 rounded-xl shadow hover:opacity-90"
                onClick={() => router.push("/signup")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
