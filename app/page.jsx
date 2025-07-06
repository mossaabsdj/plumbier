"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/app/component/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import FirstPAge from "@/app/component/Home/FirstPage/page";
import ProductList from "@/app/component/Home/ProductsList/page";
import Image from "next/image";
import objects from "@/app/Texts/content.json";

import LoginPage from "@/app/Login/Login";
import Commande from "@/app/component/Home/AddCommande/page";
import FarmPage from "@/app/component/Home/Farm/page";

export default function Home() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [displayFarm, setdisplayFarm] = useState(false);
  const [FarmData, setFarmData] = useState([]);
  const refCommande = useRef(null);

  const scrollOrder = () => {
    console.log(refCommande);
    refCommande.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    console.log("s" + FarmData);
  }, [FarmData]);
  useEffect(() => {
    if (selectedFarm === "order") {
      scrollOrder();
      setSelectedFarm(null);
    } else if (selectedFarm === "Home") {
      setdisplayFarm(false);
    } else if (selectedFarm === "traditional cheese") {
      setFarmData(objects.Farms.TraditionalCheese);
      console.log(objects.Farms.TraditionalCheese);

      setdisplayFarm(true);
    } else if (selectedFarm === "animal husbandry") {
      setFarmData(objects.Farms.AnimalHusbandry);

      setdisplayFarm(true);
    } else if (selectedFarm === "aquaculture farm") {
      setFarmData(objects.Farms.aquaculturefarm);

      setdisplayFarm(true);
    } else if (selectedFarm === "red fruit farm") {
      setFarmData(objects.Farms.redfruitfarm);

      setdisplayFarm(true);
    } else if (selectedFarm === "honey farm") {
      setFarmData(objects.Farms.honeyproducingfarm);

      setdisplayFarm(true);
    }
  }, [selectedFarm]);

  return (
    <>
      <Header select={setSelectedFarm} />
      {displayFarm ? (
        <>
          <FarmPage FarmData={FarmData} ref={refCommande} />
        </>
      ) : (
        <>
          {" "}
          <FirstPAge />
          <ProductList />
          <div
            ref={refCommande}
            className="p-20 scroll-" // Tailwind utility
          >
            <Commande data={objects.Commande} />
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
