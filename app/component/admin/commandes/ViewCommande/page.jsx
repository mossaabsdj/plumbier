"use client";
import React, { useState, useEffect } from "react";
import object from "@/app/Texts/content.json";

const Labels = object.Labels;
const defaultdata = object.Product.ViewModel;

// Text variables
const DontDisplayasfield = defaultdata.DontDisplayField;
const title = defaultdata.title;
const modifyText = Labels.Edit;
const applyText = Labels.Save;
const closeAria = Labels.Close;

const ConsulteClientModal = ({ open, onClose, product }) => {
  const [editValues, setEditValues] = useState(product || {});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditValues(product || {});
    setEditing(false);
  }, [product, open]);

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleModify = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Save logic (API call, etc.)
  };

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm overflow-x-hidden overflow-y-auto">
      <div className="bg-white rounded shadow-lg border w-full max-w-4xl mx-4 sm:mx-6 md:mx-8 my-8 p-4 relative max-h-[90vh] overflow-y-auto">
        {/* Top bar */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="flex gap-2 flex-wrap">
            {!editing && (
              <button
                type="button"
                onClick={handleModify}
                className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"
                  />
                </svg>
                {modifyText}
              </button>
            )}
            {editing && (
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded shadow border border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {applyText}
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-black hover:text-white text-2xl bg-white hover:bg-black rounded-full w-8 h-8 flex items-center justify-center border border-black"
            aria-label={closeAria}
          >
            &times;
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-black">
          {title}
        </h1>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(editValues).map(([key, value]) =>
            key === DontDisplayasfield ? null : (
              <div key={key} className="mb-4">
                <div className="text-black font-medium mb-1 break-words">
                  {key}
                </div>
                {editing ? (
                  <input
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-black rounded shadow focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                  />
                ) : (
                  <div className="px-3 py-2 border border-black rounded shadow bg-white text-black break-words">
                    {value}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsulteClientModal;
