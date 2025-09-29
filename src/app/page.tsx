"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { axiosGet1 } from "@/utils/axiosGet";
import { createObserver } from "@/utils/createObserver";
import { imgData } from "@/types/imgData";
import { notices } from "@/types/notices";
import { events } from "@/types/events";
import { MainHeader } from "@/components/slider/MainHeader";
import { Main } from "@/components/Main";
import { Bottom } from "@/components/Bottom";

export default function HomePage() {
  const router = useRouter();
  // const [index, setIndex] = useState(0);
  const [images, setImages] = useState<imgData[]>([]);
  // const { index, setIndex } = useAutoSlider(images.length, 5000);
  const [notices, setNotices] = useState<notices[]>([]);
  const [events, setEvents] = useState<events[]>([]);

  //메인 이미지 불러오기
  useEffect(() => {
    const axiosData = async () => {
      const res = await axiosGet1<imgData[]>(`/datas/mainImgData.json`);
      setImages(res);
    };
    const axiosData2 = async () => {
      const res = await axiosGet1<notices[]>(`/datas/notices.json`);
      setNotices(res);
    };
    const axiosData3 = async () => {
      const res = await axiosGet1<events[]>(`/datas/events.json`);
      setEvents(res);
    };
    axiosData();
    axiosData2();
    axiosData3();
  }, []);

  //첫화면 등장시 애니메이션 동작 구현
  useEffect(() => {
    const observer = createObserver(".featureCard", "show", {
      threshold: 0.1,
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <MainHeader images={images} />
      <Main />
      <Bottom events={events} notices={notices} />
    </div>
  );
}
