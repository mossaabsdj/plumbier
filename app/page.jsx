"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/app/component/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import FirstPage from "@/app/component/Home/FirstPage/page";
import Commande from "@/app/component/Home/AddCommande/modal";
import objects from "@/app/Texts/content.json";
import ServicesPage from "./component/Home/services/page";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedFarm, setSelectedFarm] = useState("Home");
  const [displayFarm, setDisplayFarm] = useState(false);
  const [dashBoard, setDashBoard] = useState(false);

  const refCommande = useRef(null);
  const refDiscoverPage = useRef(null);

  const scrollOrder = () => {
    refCommande.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDiscoverPage = () => {
    refDiscoverPage.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedFarm) {
      handleSelection(selectedFarm);
    }
  }, [selectedFarm]);

  const handleSelection = (farm) => {
    if (farm === "order") {
      scrollOrder();
    } else {
      scrollToTop();
    }
  };

  return (
    <>
      {!dashBoard && (
        <>
          <Header
            select={setSelectedFarm}
            selected_from_DescoverPage={selectedFarm}
          />

          {!displayFarm && (
            <>
              <FirstPage scroleDiscover={scrollDiscoverPage} />

              <div ref={refDiscoverPage}>
                <ServicesPage />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div ref={refCommande} className="p-10">
                  <Commande data={objects.Commande} />
                </div>
              </motion.div>
            </>
          )}

          <Footer />
        </>
      )}
    </>
  );
}
