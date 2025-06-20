"use client";
import React, { useState } from "react";
import object from "@/app/Texts/content.json";

const AddModal = ({ open, onClose, onSubmit, data }) => {
  const FirstFields = data.AddClient.FirstFields;
  const Title = data.AddClient.Title;
  const labels = object.Labels;

  const initialValues = FirstFields.reduce((acc, field) => {
    if (field.type === "image" || field.accessor === "image") {
      acc[field.accessor] = null;
    } else if (field.type === "select") {
      acc[field.accessor] = field.options?.[0] || "";
    } else {
      acc[field.accessor] = "";
    }
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setValues({ ...values, [name]: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-10 py-6 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-300 w-full max-w-3xl p-6 sm:p-8 relative overflow-y-auto max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          {Title}
        </h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(values);
            onClose();
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FirstFields.map((field) => {
              if (field.type === "select") {
                return (
                  <div key={field.accessor}>
                    <label
                      htmlFor={field.accessor}
                      className="block text-gray-700 font-medium mb-1"
                    >
                      {field.label}
                    </label>
                    <select
                      id={field.accessor}
                      name={field.accessor}
                      value={values[field.accessor]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === "image" || field.accessor === "image") {
                return (
                  <div key={field.accessor}>
                    <label
                      htmlFor={field.accessor}
                      className="block text-gray-700 font-medium mb-1"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.accessor}
                      name={field.accessor}
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                );
              }

              return (
                <div key={field.accessor}>
                  <label
                    htmlFor={field.accessor}
                    className="block text-gray-700 font-medium mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.accessor}
                    name={field.accessor}
                    type={field.type}
                    value={values[field.accessor]}
                    onChange={handleChange}
                    placeholder={
                      field.placeholder || `Enter ${field.label.toLowerCase()}`
                    }
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-white hover:text-black border border-black transition"
          >
            {labels.Next}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
