"use client";
import React, { useState, useEffect } from "react";
import object from "@/app/Texts/content.json";
import { fetchData } from "@/lib/FetchData/page";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingPage from "@/app/component/loading/page";

const Labels = object.Labels;
const defaultdata = object.Product.ViewModel;

const DontDisplayasfield = defaultdata.DontDisplayField;
const title = defaultdata.title;
const modifyText = Labels.Edit;
const applyText = Labels.Save;
const closeAria = Labels.Close;

const ConsulteClientModal = ({ open, onClose, product, reload }) => {
  const [editValues, setEditValues] = useState(product || {});
  const [editing, setEditing] = useState(false);
  const [Farms, setFarms] = useState([{}]);
  const [Emballages, setEmballages] = useState([]);
  const [rawImageFile, setRawImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNewEmballage, setShowNewEmballage] = useState(false);
  const [newEmballageName, setNewEmballageName] = useState("");
  // Add this state for editing emballages array
  const [editEmballages, setEditEmballages] = useState([]);
  const [isloading, setloading] = useState(false);

  // Sync editEmballages with product.emballages when opening or switching product
  useEffect(() => {
    setEditValues(product || {});
    setEditing(false);
    setEditEmballages(
      Array.isArray(product?.emballages)
        ? product.emballages.map((e) => (typeof e === "object" ? e.name : e))
        : [""]
    );
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "prix") {
      if (/^\d*\.?\d*$/.test(value)) {
        setEditValues((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setEditValues((prev) => ({ ...prev, [name]: value }));
    }
  };
  const addEmballageField = () => {
    setEditEmballages((prev) => [...prev, ""]);
  };
  const removeEmballageField = (idx) => {
    setEditEmballages((prev) => prev.filter((_, i) => i !== idx));
  };
  const updateEmballageName = (idx, value) => {
    setEditEmballages((prev) => prev.map((e, i) => (i === idx ? value : e)));
  };
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

  const handleModify = () => setEditing(true);

  const handleSave = async () => {
    setErrorMessage("");
    setIsUploading(true);

    try {
      if (rawImageFile) {
        const imageUrl = await uploadImageToCloudinary(rawImageFile);
        editValues.image = imageUrl;
        setRawImageFile(null);
      }

      const emballagesToSend = editEmballages.filter((n) => n.trim() !== "");
      editValues.emballages = emballagesToSend;

      console.log(
        "data" +
          JSON.stringify({ ...editValues, emballages: editValues.emballages })
      );
      setloading(true);
      const response = await fetchData({
        method: "PUT",
        url: `/api/Product/${editValues.id}`,
        body: { ...editValues, emballages: editValues.emballages },
      });
      setloading(false);
      if (response.error) {
        setErrorMessage("❌ " + response.error);
      } else {
        reload();
        setErrorMessage("✅ Produit mis à jour avec succès.");

        setTimeout(() => setErrorMessage(""), 1500);
        onClose();
        setEditing(false);
      }
    } catch (err) {
      setErrorMessage(
        "❌ Erreur inattendue lors de la mise à jour: " + err.message
      );
    } finally {
      setIsUploading(false);
    }
  };

  const getSelectedFarms = async () => {
    const response = await fetchData({ method: "GET", url: "/api/Farms" });
    setFarms(response);
  };

  useEffect(() => {
    getSelectedFarms();
  }, []);

  if (!open || !product) return null;

  return (
    <>
      {" "}
      {isloading && <LoadingPage isVisible={true} />}
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm overflow-x-hidden overflow-y-auto">
        <div className="bg-white rounded shadow-lg border w-full max-w-4xl mx-4 sm:mx-6 md:mx-8 my-8 p-4 relative max-h-[90vh] overflow-y-auto">
          {errorMessage && (
            <Alert
              variant={
                errorMessage.startsWith("✅") ? "success" : "destructive"
              }
              className="mb-4"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>
                {errorMessage.startsWith("✅") ? "Succès" : "Erreur"}
              </AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {isUploading && uploadProgress > 0 && (
            <div className="mb-4">
              <Progress value={uploadProgress} />
              <p className="text-sm text-gray-500 mt-1">{uploadProgress}%</p>
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <div className="flex gap-2 flex-wrap">
              {!editing ? (
                <button
                  onClick={handleModify}
                  className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded shadow"
                >
                  ✎ {modifyText}
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded shadow border border-black"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "✔ " + applyText}
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

          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center text-black">
            {title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(editValues).map(([key, value]) => {
              // Skip id and emballageId fields
              if (
                key === DontDisplayasfield ||
                key === "id" ||
                key === "emballageId" ||
                key === "emballage"
              )
                return null;

              const isFarmField =
                key === "farm" && value && typeof value === "object";
              const isImageField =
                typeof value === "string" &&
                (key.toLowerCase().includes("image") ||
                  key.toLowerCase().includes("file")) &&
                (/\.(jpe?g|png|gif|webp|svg|ico|bmp|heic|heif|tiff?|avif)$/i.test(
                  value
                ) ||
                  value.startsWith("data:image"));
              const isDateField =
                key.toLowerCase().includes("date") || value instanceof Date;
              const displayValue = isFarmField ? value.name : value;

              // Emballages array display
              if (key === "emballages" && Array.isArray(value)) {
                return (
                  <div key={key} className="mb-4">
                    <div className="block text-gray-700 font-medium mb-1">
                      Emballages
                    </div>
                    <div>
                      {editEmballages.map((name, idx) => (
                        <div key={idx} className="flex gap-2 mb-1">
                          <Input
                            type="text"
                            value={name}
                            readOnly={!editing}
                            onChange={
                              editing
                                ? (e) =>
                                    updateEmballageName(idx, e.target.value)
                                : undefined
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                          />
                          {editing && editEmballages.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeEmballageField(idx)}
                              className="px-2"
                              title="Remove"
                            >
                              &times;
                            </Button>
                          )}
                        </div>
                      ))}
                      {editing && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addEmballageField}
                          className="mt-1 underline"
                        >
                          + Add another emballage
                        </Button>
                      )}
                    </div>
                  </div>
                );
              }

              // Emballage select logic
              if (key === "emballageRel") {
                return (
                  <div key={key} className="mb-4">
                    <div className="block text-gray-700 font-medium mb-1">
                      Emballage
                    </div>
                    {editing ? (
                      <>
                        <select
                          name="emballageRel"
                          value={
                            showNewEmballage
                              ? "add_new"
                              : value && value.id
                              ? value.id
                              : ""
                          }
                          onChange={(e) => {
                            if (e.target.value === "add_new") {
                              setShowNewEmballage(true);
                              setEditValues((prev) => ({
                                ...prev,
                                emballageRel: { id: "", name: "" },
                              }));
                            } else {
                              setShowNewEmballage(false);
                              const selected = Emballages.find(
                                (emb) => emb.id === Number(e.target.value)
                              );
                              setEditValues((prev) => ({
                                ...prev,
                                emballageRel: selected,
                              }));
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="">Select emballage</option>
                          {Emballages.map((emb) => (
                            <option key={emb.id} value={emb.id}>
                              {emb.name}
                            </option>
                          ))}
                          <option value="add_new">Add new emballage</option>
                        </select>
                        {showNewEmballage && (
                          <Input
                            type="text"
                            placeholder="New emballage name"
                            value={newEmballageName}
                            onChange={(e) =>
                              setNewEmballageName(e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        )}
                      </>
                    ) : (
                      <input
                        name={key + 9876}
                        value={value?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        readOnly={true}
                      />
                    )}
                  </div>
                );
              }
              return (
                <div key={key} className="mb-4">
                  <div className="block text-gray-700 font-medium mb-1">
                    {key}
                  </div>

                  {editing ? (
                    isImageField ? (
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          name={key}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setRawImageFile(file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setEditValues((prev) => ({
                                  ...prev,
                                  [key]: reader.result,
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {value && (
                          <img
                            src={value}
                            alt={key}
                            className="h-16 w-auto rounded border border-gray-300 shadow"
                          />
                        )}
                      </div>
                    ) : isDateField ? (
                      <Input
                        type="date"
                        name={key}
                        value={
                          value
                            ? new Date(value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    ) : key === "farm" ? (
                      <select
                        name={key}
                        value={editValues.farmId || ""}
                        onChange={(e) => {
                          const selectedId = parseInt(e.target.value, 10);
                          setEditValues((prev) => ({
                            ...prev,
                            farmId: selectedId,
                            farm:
                              Farms.find((f) => f.id === selectedId) || null,
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="">Select a farm</option>
                        {Farms.map((farm) => (
                          <option key={farm.id} value={farm.id}>
                            {farm.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={key}
                        value={displayValue}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        readOnly={isFarmField}
                      />
                    )
                  ) : isImageField ? (
                    value ? (
                      <img
                        src={value}
                        alt={key}
                        className="max-h-40 rounded border border-gray-300 shadow"
                      />
                    ) : (
                      <div className="text-gray-500">No image</div>
                    )
                  ) : (
                    <div>
                      {isFarmField ? (
                        <input
                          name={key + 9876}
                          value={value?.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                          readOnly={true}
                        />
                      ) : isDateField ? (
                        <input
                          name={key + 9876}
                          value={new Date(value).toLocaleDateString()}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                          readOnly={true}
                        />
                      ) : (
                        <input
                          name={key + 9876}
                          value={value}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                          readOnly={true}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsulteClientModal;
