"use client";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Champs requis",
        text: "Veuillez remplir tous les champs.",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    if (username === "admin" && password === "admin123") {
      Swal.fire({
        icon: "success",
        title: "Connexion réussie",
        text: "Bienvenue sur le tableau de bord !",
        confirmButtonColor: "#10B981",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Échec de la connexion",
        text: "Nom d'utilisateur ou mot de passe incorrect.",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl h-[540px]">
        {/* Left: Login form */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Connectez-vous</h2>

          <div className="flex gap-4 mb-6">
            <div className="bg-green-200 text-blue-600 p-3 rounded-full shadow-md hover:scale-105 transition">
              <FaFacebookF />
            </div>
            <div className="bg-green-200 text-blue-600 p-3 rounded-full shadow-md hover:scale-105 transition">
              <FaTwitter />
            </div>
            <div className="bg-green-200 text-blue-600 p-3 rounded-full shadow-md hover:scale-105 transition">
              <FaInstagram />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">J'ai un compte</h3>

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full max-w-xs h-14 mb-5 px-4 rounded-lg bg-white ring-2 ring-green-500 text-gray-800 text-base outline-none focus:ring-2 focus:placeholder:textcolor transition"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-xs h-14 mb-5 px-4 rounded-lg bg-white ring-2 ring-green-500 text-gray-800 text-base outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
          />

          <button
            onClick={handleSubmit}
            className="w-full max-w-xs h-14 bg-emerald-500 text-white rounded-full font-bold shadow-md hover:bg-emerald-600 hover:scale-105 transition-all duration-200"
          >
            Se Connecter
          </button>
        </div>

        {/* Right: Welcome Text (hidden on small screens) */}
        <div className="hidden md:flex w-full md:w-1/2 bg-green-200 p-10 flex-col justify-center items-center text-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={200}
            className="mb-4 bg-black  rounded-4xl shadow-2xl shadow-black"
          />
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Bienvenue dans notre site !
          </h2>
          <p className="text-lg text-slate-800">
            Merci de vous connecter pour continuer.
          </p>
        </div>
      </div>
    </div>
  );
}
