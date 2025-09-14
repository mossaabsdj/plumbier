"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const services = [
  {
    title: " كشف تسربات انابيب الغاز",
    description: "نقوم بالكشف عن تسربات الفاز.",
    image: "/service01.jpg",
  },
  {
    title: "كشف تسربات انابيب الماء",
    description: "نقوم بالكشف عن تسربات المياه باستخدام أجهزة دقيقة دون تكسير.",
    image: "/service02.jpg",
  },
  {
    title: "تركيب سخانات المياه",
    description: "تركيب جميع أنواع السخانات بكفاءة وأمان، مع ضمان الأداء.",
    image: "/service03.jpg",
  },
  {
    title: "تركيب أنابيب الغاز المنزلية بالنحاس",
    description: "تركيب أنابيب الغاز المنزلية بالنحاس",
    image: "/service04.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <main dir="rtl" className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <motion.h1
            className="text-4xl font-bold text-orange-600 mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            خدماتنا
          </motion.h1>
          <motion.p
            className="text-gray-700 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            نقدم لك مجموعة من أفضل خدمات السباكة الحديثة لحل جميع مشاكلك بسرعة
            وكفاءة.
          </motion.p>
        </div>

        <div className="space-y-20">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const layoutDirection = isEven ? "flex-row" : "flex-row-reverse";
            console.log(layoutDirection);
            return (
              <motion.div
                key={index}
                className={`flex flex-col sm:${layoutDirection} items-center gap-8`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }} // 👈 الحركة تتكرر عند كل دخول للشاشة
                transition={{ duration: 0.6, delay: index * 0.2 }}
                exit={{ opacity: 0, y: 50 }} // <-- add this line
              >
                {/* صورة الخدمة */}
                <div className="md:w-1/2 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="rounded-xl shadow-md object-cover"
                  />
                </div>

                {/* نص الخدمة */}
                <div className="md:w-1/2 w-full text-right">
                  <h2 className="text-2xl font-semibold text-orange-600 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </>
  );
}
