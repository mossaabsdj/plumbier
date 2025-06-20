"use client";
import React, { useEffect, useState } from "react";
import object from "@/app/Texts/content.json";
import { fetchData } from "@/lib/FetchData/page";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"; // optional icon

const AddModal = ({ open, onClose, data }) => {
  const FirstFields = data.AddClient.FirstFields;
  const Title = data.AddClient.Title;
  const labels = object.Labels;
  const [errorMessage, setErrorMessage] = useState("");
  const [Farms, setFarms] = useState([{}]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const getSelectedFarms = async () => {
    const response = await fetchData({
      method: "GET",
      url: "/api/Farms",
    });
    //  const data = await response.json(); // ✅ needed
    console.log("data" + JSON.stringify(response));
    setFarms(response);
  };

  useEffect(() => {
    getSelectedFarms();
  }, []);
  const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
      const url = "https://api.cloudinary.com/v1_1/dgozr0fbn/image/upload";
      const preset = "SiteYakoub";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(progress);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          setIsUploading(false);
          setUploadProgress(0);
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response.secure_url);
          } else {
            reject(new Error("Image upload failed"));
          }
        }
      };

      setIsUploading(true);
      xhr.open("POST", url);
      xhr.send(formData);
    });
  };

  const onSubmit = async (formValues) => {
    setErrorMessage(""); // Reset before submit
    try {
      const updatedValues = { ...formValues };

      if (updatedValues.image instanceof File) {
        const imageUrl = await uploadImageToCloudinary(updatedValues.image);
        updatedValues.image = imageUrl;
      }

      const response = await fetchData({
        method: "POST",
        url: "/api/Product",
        body: updatedValues,
      });

      if (response?.error) {
        setErrorMessage("❌ " + response.error); // Show alert
        return;
      }

      onClose(); // ✅ Success: close the modal
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("❌ Failed to add product: " + error.message); // Show alert
    }
  };
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
            onSubmit(values);
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
                      value={Farms}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="" disabled>
                        Please choose
                      </option>
                      {Farms.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
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
                    {isUploading && (
                      <div className="mt-3">
                        <Progress value={uploadProgress} />
                        <p className="text-sm text-gray-500 mt-1">
                          {uploadProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                );
              }

              // Default input (text, number, etc.)
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
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : labels.Next}
          </button>
        </form>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AddModal;
