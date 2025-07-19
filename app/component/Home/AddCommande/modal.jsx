"use client";

import { useState } from "react";
import Loadingpage from "@/app/component/Proogression/page";

export default function PlumberServiceForm() {
  const formTexts = {
    title: "طلب خدمة سباكة",
    submitButton: "إرسال الطلب",
    fields: {
      name: { label: "الاسم الكامل", placeholder: "مثال: محمد أحمد" },
      phone: { label: "رقم الهاتف", placeholder: "06 00 00 00 00" },
      email: { label: "البريد الإلكتروني", placeholder: "email@example.com" },
      address: {
        label: "العنوان",
        placeholder: "شارع الأمير عبد القادر، الجزائر العاصمة",
      },
      date: { label: "التاريخ المفضل" },
      time: { label: "الوقت المفضل" },
      service: {
        label: "نوع الخدمة المطلوبة",
        options: [
          { value: "", label: "اختر نوع الخدمة" },
          { value: "leak-detection", label: "كشف تسربات المياه بدون تكسير" },
          {
            value: "heater-installation",
            label: "تركيب سخانات مياه (كهربائية أو غازية)",
          },
          {
            value: "pipe-repair",
            label: "إصلاح الأنابيب المتضررة أو المسدودة",
          },
          { value: "bathroom-installation", label: "تركيب الحمامات والمراحيض" },
          {
            value: "kitchen-installation",
            label: "تركيب أجهزة المطبخ والصنابير",
          },
          { value: "general-maintenance", label: "صيانة دورية للسباكة" },
          { value: "emergency", label: "تدخل طارئ (انفجار، تسرب كبير)" },
        ],
      },
      message: {
        label: "تفاصيل إضافية",
        placeholder: "اكتب وصفًا دقيقًا للمشكلة أو الخدمة التي تحتاجها...",
      },
    },
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "phone", "address", "service"];
    const missingFields = requiredFields.filter((field) => !form[field].trim());

    if (missingFields.length > 0) {
      alert("يرجى ملء جميع الحقول المطلوبة قبل الإرسال.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("يرجى إدخال بريد إلكتروني صالح.");
      return;
    }

    try {
      setloading(true);
      const res = await fetch("/api/Commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setloading(false);
      if (!res.ok) throw new Error("فشل في إرسال الطلب.");

      alert("تم إرسال الطلب بنجاح!");
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
    } catch (err) {
      alert("حدث خطأ أثناء إرسال النموذج.");
    }
  };

  return (
    <>
      <Loadingpage isVisible={loading} />
      <div dir="rtl" className="min-h-screen bg-white py-25 px-4">
        <h2 className="text-4xl font-bold text-orange-600 mb-10 text-center">
          {formTexts.title}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormInput
            name="name"
            type="text"
            label={formTexts.fields.name.label}
            placeholder={formTexts.fields.name.placeholder}
            value={form.name}
            onChange={handleChange}
          />

          <FormInput
            name="phone"
            type="tel"
            label={formTexts.fields.phone.label}
            placeholder={formTexts.fields.phone.placeholder}
            value={form.phone}
            onChange={handleChange}
          />

          <FormInput
            name="email"
            type="email"
            label={formTexts.fields.email.label}
            placeholder={formTexts.fields.email.placeholder}
            value={form.email}
            onChange={handleChange}
          />

          <FormInput
            name="address"
            type="text"
            label={formTexts.fields.address.label}
            placeholder={formTexts.fields.address.placeholder}
            value={form.address}
            onChange={handleChange}
          />

          <FormInput
            name="date"
            type="date"
            label={formTexts.fields.date.label}
            value={form.date}
            onChange={handleChange}
          />

          <FormInput
            name="time"
            type="time"
            label={formTexts.fields.time.label}
            value={form.time}
            onChange={handleChange}
            requiredFields
          />

          <FormSelect
            requiredFields
            name="service"
            label={formTexts.fields.service.label}
            options={formTexts.fields.service.options.map((opt) => opt.label)}
            values={formTexts.fields.service.options.map((opt) => opt.value)}
            value={form.service}
            onChange={handleChange}
            className="md:col-span-2"
          />

          <FormTextarea
            name="message"
            label={formTexts.fields.message.label}
            placeholder={formTexts.fields.message.placeholder}
            value={form.message}
            onChange={handleChange}
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              {formTexts.submitButton}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// 🔧 Input
function FormInput({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}

// 🔧 Select
function FormSelect({
  name,
  label,
  options,
  values,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        {options.map((opt, index) => (
          <option key={index} value={values ? values[index] : opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// 🔧 Textarea
function FormTextarea({
  name,
  label,
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}
