"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/app/component/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import FirstPAge from "@/app/component/Home/FirstPage/page";
import ProductList from "@/app/component/Home/ProductsList/page";
import Commande from "@/app/component/Home/AddCommande/page";
import FarmPage from "@/app/component/Home/Farm/page";
import DashBoardPage from "@/app/Login/page";
import objects from "@/app/Texts/content.json";

export default function Home() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [displayFarm, setdisplayFarm] = useState(false);
  const [FarmData, setFarmData] = useState([]);
  const [DashBoard, setDashBoard] = useState(false);
  const refCommande = useRef(null);

  const scrollOrder = () => {
    refCommande.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedFarm) {
      handleSelection(selectedFarm);
    }
  }, [selectedFarm]);

  const handleSelection = (farm) => {
    if (farm === "order") {
      scrollOrder();
      setSelectedFarm(null);
    } else if (farm === "Home") {
      setdisplayFarm(false);
    } else if (farm === "traditional cheese") {
      setFarmData(objects.Farms.TraditionalCheese);
      setdisplayFarm(true);
    } else if (farm === "animal husbandry") {
      setFarmData(objects.Farms.AnimalHusbandry);
      setdisplayFarm(true);
    } else if (farm === "aquaculture farm") {
      setFarmData(objects.Farms.aquaculturefarm);
      setdisplayFarm(true);
    } else if (farm === "red fruit farm") {
      setFarmData(objects.Farms.redfruitfarm);
      setdisplayFarm(true);
    } else if (farm === "honey farm") {
      setFarmData(objects.Farms.honeyproducingfarm);
      setdisplayFarm(true);
    } else if (farm === "admin") {
      setdisplayFarm(false);
      setDashBoard(true);
    }
  };

  return (
    <>
      {DashBoard ? (
        <DashBoardPage />
      ) : (
        <>
          <Header select={setSelectedFarm} />
          {displayFarm ? (
            <FarmPage FarmData={FarmData} ref={refCommande} />
          ) : (
            <>
              <FirstPAge />
              <ProductList />
              <div ref={refCommande} className="p-20">
                <Commande data={objects.Commande} />
              </div>
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
