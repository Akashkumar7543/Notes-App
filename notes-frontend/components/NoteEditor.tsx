"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NoteEditor({
  initial,
  onCancel,
  onSave,
  onDelete,
}: {
  initial?: any;
  onCancel: any;
  onSave: any;
  onDelete: any;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(initial?.note_title || "");
    setContent(initial?.note_content || "");
  }, [initial]);

  return (
    <AnimatePresence>
      {/* DARK BACKDROP */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        {/* POPUP */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            bg-[#f5e9c9]
            w-[540px]
            rounded-xl
            shadow-[0_8px_30px_rgba(0,0,0,0.4)]
            border border-[#d9ccad]
            overflow-hidden
          "
        >

          {/* HEADER BAR */}
          <div className="bg-[#eec6a0] px-5 py-3 flex justify-between items-center border-b border-[#d3b48f]">
            <h2 className="font-semibold text-[#644c37] text-sm">
              {title || "Untitled"}
            </h2>

            {/* CLOSE (X) */}
            <button
              onClick={onCancel}
              className="text-[#c4605c] text-xl font-bold hover:text-red-700"
            >
              ×
            </button>
          </div>

          {/* TEXTAREA SECTION */}
          <div className="p-5">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="
                w-full
                h-[260px]
                p-3
                text-sm
                bg-white
                border border-[#cfc7b8]
                rounded-lg
                focus:outline-none
              "
            />
          </div>

         {/* FOOTER BUTTONS */}
<div className="flex justify-end gap-4 pb-5 pl-5 mr-2">
  {/* ↑ Changed: justify-center → justify-start, added pl-5 for padding */}

  {/* SAVE */}
  <button
    onClick={() =>
      onSave({ note_title: title, note_content: content })
    }
    className="
      px-7 py-2
      bg-green-600 hover:bg-green-700
      text-white font-medium
      rounded-lg
      shadow
    "
  >
    Save
  </button>

  {/* DELETE ONLY IF EDITING */}
  {initial && (
    <button
      onClick={() => onDelete(initial.note_id)}
      className="
        px-7 py-2
        bg-red-600 hover:bg-red-700
        text-white font-medium
        rounded-lg
        shadow
      "
    >
      Delete
    </button>
  )}
</div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
