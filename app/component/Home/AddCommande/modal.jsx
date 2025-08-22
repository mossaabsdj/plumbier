"use client";

import { useState } from "react";
import Loadingpage from "@/app/component/Proogression/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function PlumberServiceForm() {
  const formTexts = {
    title: "طلب خدمة سباكة",
    submitButton: "إرسال الطلب",
    fields: {
      name: {
        label: "الاسم الكامل",
        placeholder: "مثال: محمد أحمد",
        required: true,
      },
      phone: {
        label: "رقم الهاتف",
        placeholder: "06 00 00 00 00",
        required: true,
      },
      email: {
        label: "البريد الإلكتروني (اختياري)",
        placeholder: "email@example.com",
      },
      address: {
        label: "العنوان",
        placeholder: "حي 500 مسكن",
        required: true,
      },
      date: { label: "التاريخ المفضل (اختياري)" },
      time: { label: "الوقت المفضل (اختياري)" },
      service: { label: "نوع الخدمة المطلوبة", required: true },
      message: {
        label: "تفاصيل إضافية (اختياري)",
        placeholder: "اكتب وصفًا للمشكلة أو الخدمة التي تحتاجها...",
      },
    },
  };

  const requiredFields = ["name", "phone", "address", "service"];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Skikda", // ✅ Add city with default value
    commune: "", // ✅ New field

    address: "",
    date: null,
    time: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });

  // Calculate progress
  const completedRequired = requiredFields.filter(
    (field) => form[field].trim() !== ""
  ).length;
  const totalRequired = requiredFields.length;
  const progressPercent = Math.round((completedRequired / totalRequired) * 100);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (completedRequired < totalRequired) return;

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setDialogContent({
        title: "بريد إلكتروني غير صالح",
        description: "يرجى إدخال بريد إلكتروني صالح.",
      });
      setDialogOpen(true);
      return;
    }
    console.log("form" + JSON.stringify(form));
    try {
      setLoading(true);
      const res = await fetch("/api/Commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setLoading(false);

      if (!res.ok) throw new Error();

      setDialogContent({
        title: "تم الإرسال بنجاح",
        description:
          "تم استلام طلبك بنجاح! سيقوم فريقنا بالتواصل معك خلال 24 ساعة لتأكيد التفاصيل.",
      });
      setDialogOpen(true);

      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        date: "",
        time: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      setDialogContent({
        title: "خطأ أثناء الإرسال",
        description: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقًا.",
      });
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Loadingpage isVisible={loading} />
      <div dir="rtl" className="min-h-screen bg-white py-20 px-4">
        <h2 className="text-4xl font-bold text-orange-600 mb-10 text-center">
          {formTexts.title}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormInput
            {...formTexts.fields.name}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <FormInput
            {...formTexts.fields.phone}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <FormInput
              name="city"
              label="المدينة"
              value={form.city}
              onChange={handleChange}
              disabled
            />
            <p className="text-gray-500 text-sm mt-1 italic">
              سيتم إضافة ولايات أخرى لاحقًا
            </p>
          </div>
          <div className="md:col-span-2">
            <FormSelect
              name="commune"
              label="البلدية"
              options={[
                { value: "", label: "اختر البلدية" },
                { value: "Skikda", label: "سكيكدة" },
                { value: "El Hadaiek", label: "الحدائق" },
                { value: "Azzaba", label: "عزابة" },
                { value: "Collo", label: "القل" },
                { value: "Tamalous", label: "تمالوس" },
                { value: "Ramdane Djamel", label: "رمضان جمال" },
                { value: "Beni Oulbane", label: "بني ولبان" },

                { value: "El Harrouch", label: "الحروش" },
              ]}
              value={form.commune}
              onChange={handleChange}
            />
            <p className="text-gray-500 text-sm mt-1 italic">
              سيتم إضافة بلديات أخرى لاحقًا
            </p>
          </div>

          <FormInput
            {...formTexts.fields.address}
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <FormInput
            {...formTexts.fields.date}
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
          <FormInput
            {...formTexts.fields.time}
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
          />

          <FormSelect
            name="service"
            label={formTexts.fields.service.label}
            options={[
              { value: "", label: "اختر نوع الخدمة" },
              {
                value: "leak-detection",
                label: "كشف تسربات المياه بدون تكسير",
              },
              {
                value: "heater-installation",
                label: "تركيب سخانات مياه (كهربائية أو غازية)",
              },
              {
                value: "pipe-repair",
                label: "إصلاح الأنابيب المتضررة أو المسدودة",
              },
              {
                value: "bathroom-installation",
                label: "تركيب الحمامات والمراحيض",
              },
              {
                value: "kitchen-installation",
                label: "تركيب أجهزة المطبخ والصنابير",
              },
              { value: "general-maintenance", label: "صيانة دورية للسباكة" },
              { value: "emergency", label: "تدخل طارئ (انفجار، تسرب كبير)" },
            ]}
            value={form.service}
            onChange={handleChange}
            className="md:col-span-2"
            required
          />

          <FormTextarea
            {...formTexts.fields.message}
            name="message"
            value={form.message}
            onChange={handleChange}
            className="md:col-span-2"
          />

          {/* Progress Indicator */}
          <div className="md:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              disabled={completedRequired < totalRequired}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                completedRequired < totalRequired
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
            >
              {completedRequired < totalRequired
                ? `أكمل الحقول للتأكيد (${completedRequired}/${totalRequired})`
                : formTexts.submitButton}
            </button>
          </div>
        </form>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Input Component
function FormInput({
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required,
  disabled = false,
  className = "",
}) {
  const labelStyle = required ? "text-gray-700" : "text-gray-400 italic";
  const inputStyle = disabled
    ? "bg-gray-100 text-gray-500 cursor-not-allowed" // ✅ Grayed out style
    : required
    ? "border-gray-300"
    : "border-gray-200 bg-gray-50";

  return (
    <div className={className}>
      <label htmlFor={name} className={`block font-medium mb-2 ${labelStyle}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${inputStyle}`}
      />
    </div>
  );
}

// Select Component
function FormSelect({
  name,
  label,
  options,
  value,
  onChange,
  className = "",
  required,
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Textarea Component
function FormTextarea({
  name,
  label,
  placeholder,
  value,
  onChange,
  className = "",
  required,
}) {
  const labelStyle = required ? "text-gray-700" : "text-gray-400 italic";
  const inputStyle = required
    ? "border-gray-300"
    : "border-gray-200 bg-gray-50";
  return (
    <div className={className}>
      <label htmlFor={name} className={`block font-medium mb-2 ${labelStyle}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={4}
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${inputStyle}`}
      />
    </div>
  );
}
