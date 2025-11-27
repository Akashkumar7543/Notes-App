"use client";
import React from "react";

export default function NoteCard({
  note,
  onEdit,
  onDelete,
}: {
  note: any;
  onEdit: any;
  onDelete: any;
}) {
  const formattedDateTime = note.last_update
  ? new Date(note.last_update).toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    
    })
  : "N/A";

  console.log("Raw last_update:", note.last_update);
  console.log("Type:", typeof note.last_update);

// console.log(note);
  return (
    <div
      onClick={() => onEdit(note)}   // ✅ CLICK ENTIRE CARD
      className="
        w-[320px]
        bg-white 
        rounded-xl 
        border border-[#CFC7B8]
        shadow-[0_3px_12px_rgba(0,0,0,0.15)]
        overflow-hidden
        cursor-pointer
        hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)]
        transition-all
      "
    >
      {/* HEADER */}
      <div className="bg-[#eec6a0] px-4 py-2 flex justify-between items-center">
        <h3 className="font-semibold text-[#5b4635] text-sm">
          {note.note_title}
        </h3>

        {/* Custom Delete Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // ❗ IMPORTANT — prevent opening editor
            onDelete(note.note_id);
          }}
          className="relative w-5 h-5 flex items-center justify-center"
        >
          <span className="absolute w-5 h-5 rounded-full border-2 border-red-500"></span>
          <span className="absolute w-2 h-2 rounded-full bg-blue-500"></span>
        </button>
      </div>

      {/* BODY */}
      <div className="p-4 text-sm text-[#4d4d4d] min-h-[100px] leading-relaxed">
        {note.note_content}
      </div>

      {/* FOOTER */}
      <div className="px-4 py-2 text-[11px] text-gray-500">
  Last Modified: {formattedDateTime}
</div>

    </div>
  );
}
