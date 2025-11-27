"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/store/useAuth";
import { NotesService, Note } from "@/services/notes.service";
import { setAuthToken } from "@/lib/api";
import NoteCard from "@/components/NoteCard";
import NoteEditor from "@/components/NoteEditor";
import AddNoteModal from "@/components/AddNoteModal";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<{ user_id: string; user_name: string; user_email: string } | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editing, setEditing] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if no token, else load data
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    } else {
      setAuthToken(token);
      loadData();
    }
  }, [token]);

  async function loadData() {
    setLoading(true);
    try {
      const [userRes, notesRes] = await Promise.all([
        NotesService.getUser(),
        NotesService.getAll(),
      ]);
      setUser(userRes.data);
      setNotes(notesRes.data);
    } catch (err) {
      console.error("Error loading data", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(data: { note_title: string; note_content: string }) {
    if (editing) {
      await NotesService.update(editing.note_id, data);
    } else {
      await NotesService.create(data);
    }
    setShowEditor(false);
    setShowAddModal(false);
    setEditing(null);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete note?")) return;
    await NotesService.remove(id);
    loadData();
  }

  const greeting =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="min-h-screen bg-[#F4F1D8] relative">
      <div className="px-10 py-8">
        <p className="text-sm text-gray-600 mb-2">
          Homepage / <span className="font-semibold">Your Notes</span>
        </p>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {greeting} {user?.user_name || "User"}!
        </h1>

        {/* Note Editor */}
        {showEditor && editing && (
          <NoteEditor
            initial={editing}
            onCancel={() => {
              setShowEditor(false);
              setEditing(null);
            }}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}

        {/* Add Note Modal */}
        {showAddModal && (
          <AddNoteModal
            onCancel={() => setShowAddModal(false)}
            onSave={handleSave}
          />
        )}

        {loading ? (
          <p className="text-gray-500">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-500">No notes found. Add a new note!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.note_id}
                note={note}
                onEdit={() => {
                  setEditing(note);
                  setShowEditor(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full shadow-xl transition-all"
      >
        📝
      </button>
    </div>
  );
}
