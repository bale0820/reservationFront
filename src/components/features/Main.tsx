import { features } from "@/components/features/feature";
import { FeatureCard } from "./FeatureCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosGet1 } from "@/utils/axiosGet";

export function Main() {

  return (
    <div className="py-16 px-5 bg-[#000000]">
      <h2 className="text-center mb-10 font-bold text-2xl">서비스 주요 기능</h2>
      <div className="grid gap-5 max-w-[1000px] mx-auto grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {features.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </div>
    </div>
  );
}
