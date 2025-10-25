'use client';
import Image from "next/image";
import { useLang } from "../../hooks/useLang";
import SlideInLeft from "../Sliders/slideInLeft";
import { useState } from "react";

export default function Banner() {
  const { t, ready } = useLang();
 const [loaded, setLoaded] = useState(false);

  const handleScrollToFeedback = () => {
    const feedbackSection = document.getElementById('feedback-section');
    if (feedbackSection) {
      feedbackSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!ready) return null;

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] 
                    lg:h-[500px] xl:h-[600px] overflow-hidden">
      <Image
        src='/Images/banner.webp'
        alt="banner"
        fill
        className={`object-cover fade-in ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r z-10
                      from-gray-800/100 to-transparent" />
      <div className="absolute z-20 top-1/2 transform 
                      text-center sm:text-left text-white
                      -translate-y-1/2  sm:max-w-[60%] 
                      2xl:max-w-[80%] 6xl:max-w-full">
        <SlideInLeft>
          <div className="media">
            <h1 className="md:text-2xl lg:text-4xl font-bold">
              "Hukuk döwletinde kanun esasy orny eýeleýär"
            </h1>
            <p className="py-2 md:py-4 text-sm">
              Türkmenistanyň Halk Maslahatynyň Başlygy Gurbanguly Berdimuhamedow
            </p>
            <button
              onClick={handleScrollToFeedback}
              className="border border-[#cec091] rounded text-center button-hover 
                         py-1.5 px-6 w-max text-gray-50 overflow-hidden  z-0 "
            >
              {t.contact}
            </button>
          </div>
        </SlideInLeft>
      </div>
    </div>
  );
}
