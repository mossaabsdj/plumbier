"use client";
import React, { useEffect, useState } from "react";
import object from "@/app/Texts/content.json";
import { fetchData } from "@/lib/FetchData/page";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"; // optional icon
import LoadingPage from "@/app/component/loading/page";

const AddModal = ({ open, onClose, data }) => {
  const [isloading, setloading] = useState(false);

  const FirstFields = data.AddClient.FirstFields;
  const Title = data.AddClient.Title;
  const labels = object.Labels;
  const [errorMessage, setErrorMessage] = useState("");
  const [Farms, setFarms] = useState([{}]);
  const [Emballages, setEmballages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showNewEmballage, setShowNewEmballage] = useState(false);
  const [newEmballageName, setNewEmballageName] = useState("");
  const [selectedEmballages, setSelectedEmballages] = useState([]);
  const [newEmballageNames, setNewEmballageNames] = useState([""]);

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

  // Handle multi-select for emballages
  const handleEmballagesChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedEmballages(options.filter((v) => v !== "add_new"));
    setShowNewEmballage(options.includes("add_new"));
  };

  // Add new emballage input field
  const addNewEmballageField = () => {
    setNewEmballageNames([...newEmballageNames, ""]);
  };

  // Remove a new emballage input field
  const removeNewEmballageField = (idx) => {
    setNewEmballageNames(newEmballageNames.filter((_, i) => i !== idx));
  };

  // Update a new emballage name
  const updateNewEmballageName = (idx, value) => {
    const updated = [...newEmballageNames];
    updated[idx] = value;
    setNewEmballageNames(updated);
  };

  const onSubmit = async (formValues) => {
    setErrorMessage("");
    try {
      const updatedValues = { ...formValues };

      // Only use newEmballageNames for new products
      const emballagesToSend = newEmballageNames.filter((n) => n.trim() !== "");

      // Remove old emballage field
      delete updatedValues.emballage;

      // Map farm to farmId for API
      if (updatedValues.farm) {
        updatedValues.farmId = parseInt(updatedValues.farm);
        delete updatedValues.farm;
      }

      // Handle image upload
      if (updatedValues.image instanceof File) {
        const imageUrl = await uploadImageToCloudinary(updatedValues.image);
        updatedValues.image = imageUrl;
      }
      setloading(true);
      // Send emballages as array of names
      updatedValues.emballages = emballagesToSend;

      // Debug: log what will be sent
      console.log("Submitting product:", updatedValues);

      const response = await fetchData({
        method: "POST",
        url: "/api/Product",
        body: updatedValues,
      });
      setloading(false);

      if (response?.error) {
        setErrorMessage("❌ " + response.error);
        return;
      }
      onClose();
    } catch (error) {
      setErrorMessage("❌ Failed to add product: " + error.message);
    }
  };
  const initialValues = FirstFields.reduce((acc, field) => {
    if (field.type === "image" || field.accessor === "image") {
      acc[field.accessor] = null;
    } else if (field.type === "select") {
      acc[field.accessor] =
        Array.isArray(Farms) && Farms[0]?.id ? Farms[0].id : "";
    } else {
      acc[field.accessor] = "";
    }
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    console.log(e);
    const { name, value, type, files } = e.target;
    console.log(value);

    if (type === "file") {
      setValues({ ...values, [name]: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  if (!open) return null;

  return (
    <>
      {isloading && <LoadingPage isVisible={true} />}

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
                        value={values[field.accessor] || ""} // ✅ current selected value
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

                if (field.accessor === "emballage") {
                  return (
                    <div key={field.accessor}>
                      <label
                        htmlFor={field.accessor}
                        className="block text-gray-700 font-medium mb-1"
                      >
                        {field.label}
                      </label>
                      <div className="mt-2 space-y-2">
                        {newEmballageNames.map((name, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="New emballage name"
                              value={name}
                              onChange={(e) =>
                                updateNewEmballageName(idx, e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {newEmballageNames.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeNewEmballageField(idx)}
                                className="text-red-500"
                                title="Remove"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addNewEmballageField}
                          className="mt-1 text-black underline"
                        >
                          + Add another emballage
                        </button>
                      </div>
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
                        field.placeholder ||
                        `Enter ${field.label.toLowerCase()}`
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
    </>
  );
};

export default AddModal;
