"use client";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import Progression from "@/app/component/Proogression/page";

// === نصوص باللغة العربية ===
const TEXTS = {
  loginTitle: "تسجيل الدخول",
  socialLoginText: "أمتلك حسابًا",
  usernamePlaceholder: "اسم المستخدم",
  passwordPlaceholder: "كلمة المرور",
  buttonText: "دخول",
  welcomeTitle: "مرحباً بك  !",
  welcomeSubtitle: "يرجى تسجيل الدخول للمتابعة.",
  alerts: {
    requiredTitle: "الحقول مطلوبة",
    requiredMessage: "يرجى ملء جميع الحقول.",
    successTitle: "تم تسجيل الدخول بنجاح",
    successMessage: "مرحبًا بك في لوحة التحكم!",
    errorTitle: "فشل تسجيل الدخول",
    errorMessage: "اسم المستخدم أو كلمة المرور غير صحيحة.",
  },
};

// === ألوان وتصاميم ===
const COLORS = {
  warning: "#F59E0B", // برتقالي
  success: "#10B981", // أخضر
  error: "#EF4444", // أحمر
  formRing: "ring-orange-500",
  buttonBg: "bg-orange-500",
  buttonHover: "hover:bg-orange-600",
  socialBg: "bg-orange-100",
  socialText: "text-orange-700",
  rightPaneBg: "bg-orange-100",
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/DashBoard",
    });

    setIsLoading(false);

    if (res?.ok) {
      Swal.fire({
        icon: "success",
        title: TEXTS.alerts.successTitle,
        showConfirmButton: false,
        customClass: {
          popup: "shadow-lg rounded-lg",
        },
        timer: 1500,
      }).then(() => {
        setIsLoading(true);
        window.location.href = res.url;
      });
    } else {
      Swal.fire({
        icon: "error",
        title: TEXTS.alerts.errorTitle,
        text: TEXTS.alerts.errorMessage,
        confirmButtonColor: COLORS.error,
        customClass: {
          popup: "shadow-lg rounded-lg",
        },
      });
    }
  };

  return (
    <>
      {isLoading && <Progression isVisible={true} />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl h-[540px]">
          {/* Left: Login form */}
          <div className="w-full md:w-1/2 bg-white p-10 flex flex-col items-center justify-center text-right">
            <h2 className="text-3xl font-bold mb-4">{TEXTS.loginTitle}</h2>

            <div className="flex gap-4 mb-6">
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
                <div
                  key={idx}
                  className={`${COLORS.socialBg} ${COLORS.socialText} p-3 rounded-full shadow-md hover:scale-105 transition`}
                >
                  <Icon />
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4">
              {TEXTS.socialLoginText}
            </h3>

            <input
              type="text"
              placeholder={TEXTS.usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full max-w-xs h-14 mb-5 px-4 rounded-lg bg-white ring-2 ${COLORS.formRing} text-gray-800 text-base outline-none focus:ring-2 transition`}
            />

            <input
              type="password"
              placeholder={TEXTS.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full max-w-xs h-14 mb-5 px-4 rounded-lg bg-white ring-2 ${COLORS.formRing} text-gray-800 text-base outline-none focus:ring-2 transition`}
            />

            <button
              onClick={handleSubmit}
              className={`w-full max-w-xs h-14 ${COLORS.buttonBg} text-white rounded-full font-bold shadow-md ${COLORS.buttonHover} hover:scale-105 transition-all duration-200`}
            >
              {TEXTS.buttonText}
            </button>
          </div>

          {/* Right Pane */}
          <div
            className={` bg-orange-200 hidden md:flex w-full md:w-1/2 ${COLORS.rightPaneBg} p-10 flex-col justify-center items-center text-center`}
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={270}
              height={220}
              className="mb-4 rounded-4xl "
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {TEXTS.welcomeTitle}
            </h2>
            <p className="text-lg text-slate-800">{TEXTS.welcomeSubtitle}</p>
          </div>
        </div>
      </div>
    </>
  );
}
