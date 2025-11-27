import { create } from "zustand";
import { NotesService } from "@/services/notes.service";

type Note = {
  note_id: string;
  note_title: string;
  note_content: string;
};

type User = {
  user_id: string;
  user_name: string;
  user_email: string;
};

type NotesState = {
  notes: Note[];
  user: User | null;
  editing: Note | null;
  loading: boolean;

  loadNotes: () => Promise<void>;
  saveNote: (data: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setEditing: (note: Note | null) => void;
};

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  user: null,
  editing: null,
  loading: false,

  loadNotes: async () => {
    set({ loading: true });
    const [userRes, notesRes] = await Promise.all([
      NotesService.getUser(),
      NotesService.getAll(),
    ]);
    set({
      user: userRes.data,
      notes: notesRes.data,
      loading: false,
    });
  },

  saveNote: async (data) => {
    const { editing } = get();
    editing
      ? await NotesService.update(editing.note_id, data)
      : await NotesService.create(data);

    set({ editing: null });
    await get().loadNotes();
  },

  deleteNote: async (id) => {
    if (!confirm("Delete note?")) return;
    await NotesService.remove(id);
    await get().loadNotes();
  },

  setEditing: (note) => set({ editing: note }),
}));
