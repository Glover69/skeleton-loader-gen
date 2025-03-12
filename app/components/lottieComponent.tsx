"use client";

import dynamic from "next/dynamic";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Ensure you have a valid animation JSON. Adjust the path as needed.
import animationData from "../../public/lottie/animation.json";

export default function MyLottieComponent() {
  return <Lottie className="w-40 h-40" animationData={animationData} loop={true} />;
}