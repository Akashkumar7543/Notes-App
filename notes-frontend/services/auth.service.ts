import api from "@/lib/api";

export const AuthService = {
  login: async (email: string, password: string) => {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    return api.post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },

  signup: (data: { user_name: string; user_email: string; password: string }) => {
    return api.post("/auth/signup", data);
  },

  getUser: () => api.get("/auth/me"), 
};
