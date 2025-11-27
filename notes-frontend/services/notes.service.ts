import api from "@/lib/api";
export interface Note {
  note_id: string;
  user_id: string;
  note_title: string;
  note_content: string;
  created_on: string;
  last_update: string;
}
export const NotesService = {
  getAll: () => api.get("/notes"),
  getUser: () => api.get("/auth/me"),
  create: (data) => api.post("/notes", data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  remove: (id) => api.delete(`/notes/${id}`),
};
