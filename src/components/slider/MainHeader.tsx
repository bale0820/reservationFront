import { useAutoSlider } from "@/hooks/useAutoSlider";
import { imgData } from "@/types/imgData";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoIosRadioButtonOn } from "react-icons/io";
import { Slide } from "./Silde";
import { SlideNavButton } from "./SildeNavButton";
import { SlideDots } from "./SlideDots";

export function MainHeader({ images }: { images: imgData[] }) {
  const { index, setIndex } = useAutoSlider(images.length, 5000);
  return (
    <div className="relative w-full h-[500px] overflow-hidden text-white">
      {images.map((img, i) => (
        <Slide key={i} img={img} isActive={index === i} />
      ))}
      <SlideNavButton position="right" onClick={() => setIndex((index + 1) % images.length)} icon={<MdOutlineArrowForwardIos />} />

      <SlideNavButton
        position="left"
        onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)} icon={<MdOutlineArrowBackIosNew />} />



      <SlideDots count={images.length} activeIndex={index} setIndex={setIndex} icon={<IoIosRadioButtonOn />} />
    </div>
  );
}


