"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckOrderStatus() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckStatus = async () => {
    if (!phone) {
      setStatus("يرجى إدخال رقم الهاتف");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`/api/check-order?phone=${phone}`);
      const data = await res.json();

      if (res.ok) {
        const commande = data.commande;
        setStatus(
          `تم العثور على الطلب:\nالاسم: ${commande.name}\nالخدمة: ${
            commande.service
          }\nالعنوان: ${commande.address}\nالتاريخ: ${
            commande.date || "غير محدد"
          }`
        );
      } else {
        setStatus(data.error || data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus("حدث خطأ في الخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-orange-50 to-orange-100 px-4 overflow-hidden">
      {/* Background Shapes */}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-3xl"
      >
        <Card className="bg-orange-500 text-white shadow-2xl rounded-3xl p-6 flex flex-col md:flex-col gap-8 min-h-120 w-full">
          {/* Card Title */}
          <h2 className="w-full text-2xl md:text-4xl font-bold text-white text-center mb-6">
            تحقق من حالة طلبك
          </h2>

          {/* Right Side: Input & Button */}
          <div className=" flex flex-col  gap-6 ">
            <Input
              type="tel"
              placeholder="أدخل رقم هاتفك"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-white/50 placeholder-white text-white bg-orange-600/40 focus:border-white focus:ring-white w-full text-right text-lg md:text-2xl p-4 md:p-6 rounded-xl"
            />
            <Button
              variant="default"
              className={`bg-white text-orange-500 hover:bg-white/90 w-full font-semibold text-lg md:text-2xl py-3 md:py-5 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleCheckStatus}
              disabled={loading}
            >
              {loading ? "جاري التحقق..." : "تحقق الآن"}
            </Button>
          </div>

          {/* Left Side: Status / Result */}
          <div className="flex items-center justify-center bg-white/10 rounded-2xl p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="text-white text-center md:text-right font-medium text-lg md:text-2xl whitespace-pre-line"
            >
              {loading ? "جاري البحث..." : status || "حالة الطلب ستظهر هنا"}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
