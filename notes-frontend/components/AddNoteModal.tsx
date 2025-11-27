"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

interface AddNoteModalProps {
  onCancel: () => void;
  onSave: (data: { note_title: string; note_content: string }) => void;
}

export default function AddNoteModal({ onCancel, onSave }: AddNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
          {/* HEADER */}
          <div className="bg-[#eec6a0] px-5 py-3 flex justify-between items-center border-b border-[#d3b48f]">
            <h2 className="font-semibold text-[#644c37] text-sm">Add Notes</h2>
            <button
              onClick={onCancel}
              className="text-[#c4605c] text-xl font-bold hover:text-red-700"
            >
              ×
            </button>
          </div>

          {/* FORM */}
          <div className="p-5 space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="
                w-full 
                p-3 
                bg-white 
                border border-[#cfc7b8] 
                rounded-lg 
                text-sm 
                focus:outline-none
              "
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              className="
                w-full 
                h-[200px] 
                p-3 
                bg-white 
                border border-[#cfc7b8] 
                rounded-lg 
                text-sm 
                focus:outline-none
              "
            />
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex justify-end gap-4 pb-5 pl-5 mr-2">
            <button
              onClick={() => onSave({ note_title: title, note_content: content })}
              className="
                px-7 py-2 
                bg-green-600 hover:bg-green-700 
                text-white font-medium rounded-lg 
                shadow
              "
            >
              Add
            </button>
            <button
              onClick={onCancel}
              className="
                px-7 py-2 
                bg-red-500 hover:bg-red-600 
                text-white font-medium rounded-lg 
                shadow
              "
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
