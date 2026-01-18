"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { axiosGet1 } from "@/utils/axiosGet";
import { createObserver } from "@/utils/createObserver";
import { ImgData } from "@/types";
import { Notice } from "@/types";
import { Event } from "@/types";
import { MainHeader } from "@/components/slider/MainHeader";
import { Main } from "@/components/features/Main";
import { Bottom } from "@/components/board/Bottom";

export default function HomePage() {
  const router = useRouter();
  // const [index, setIndex] = useState(0);
  const [images, setImages] = useState<ImgData[]>([]);
  // const { index, setIndex } = useAutoSlider(images.length, 5000);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  //메인 이미지 불러오기
  useEffect(() => {
    const axiosData = async () => {
      const res = await axiosGet1<ImgData[]>(`/datas/mainImgData.json`);
      setImages(res);
    };
    const axiosData2 = async () => {
      const res = await axiosGet1<Notice[]>(`/datas/notices.json`);
      setNotices(res);
    };
    const axiosData3 = async () => {
      const res = await axiosGet1<Event[]>(`/datas/events.json`);
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
    <div style={{ fontFamily: "Arial, sans-serif" }} className="bg-black">
      <MainHeader images={images} />
      <Main />
      <Bottom events={events} notices={notices} />
    </div>
  );
}
