import React from "react";
import Hero from "../Components/Hero";
import Status from "../Components/Status";
import Trust from "../Components/Trust";
import Intro from "../Components/Intro";
import Footer from "../Components/Footer";
import { Suspense } from "react";
import FAQ from "./FAQ";

const Coins = React.lazy(() => import("./Coins"));

export default function Home() {
  return (
    <>
      <div className="">
        <Hero />
        <Suspense fallback={<Loading />}>
          <Coins />
        </Suspense>
        <Intro />
        <Status />
        <FAQ />
        <Trust />
        <Footer />
      </div>
    </>
  );
}

const Loading = () => {
  return (
    <div className="text-center bg-neutral text-3xl font-bold text-white">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};
