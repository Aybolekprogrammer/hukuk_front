import { translations, fallbackLang } from "../translations/index";
import Banner from "@/component/Home/banner";
import { Article } from "@/component/Home/article";
import { News } from "@/component/Home/news";
import { Lawyers } from "@/component/Home/lawyers";
import { Notification } from "@/component/Home/notification";
import { Pictures } from "@/component/Home/law-science";
import About from "@/component/Home/about";
import Message from "@/component/Home/feedback";
import { WebPages } from "@/component/Home/webPages";

export function generateMetadata() {
  const t = translations[fallbackLang];
  return {
    title: t.logo,
    description: t.aboutDesc,
  };
}
export default function HomePage() {
  return (
    <>
      <Banner />
      <section className="media flex flex-col xl:flex-row gap-2 
                          xl:gap-4 justify-between mt-4 xl:h-[760px]">
        <div className="order-1 xl:order-2 w-full xl:w-[50%]">
          <News />
        </div>
        <div className="order-2 xl:order-1 w-full xl:w-[25%]">
          <Article />
        </div>
        <div className="order-3 xl:order-3 w-full xl:w-[25%]">
          <WebPages />
        </div>
      </section>
      <Lawyers />
      <Notification />
      <About />
      <Pictures />
      <Message />
    </>
  )
}
