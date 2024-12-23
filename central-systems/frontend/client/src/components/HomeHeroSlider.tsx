import { HomeCarousel } from "./Carousel";
import HomeCarouselBanner from "./HomeCarouselBanner";

const HomeHeroSlider = () => {
  return (
    <div className="bg-homegray flex flex-col items-center">
      <div className="w-full">
        <HomeCarousel
          previousArrowClassName={"p-2 transform scale-[1.3] hidden md:block"}
          nextArrowClassName={"p-2 transform scale-[1.3] hidden md:block"}
          items={[
            <HomeCarouselBanner 
            key={"banner1"}
            src={"/assets/new7.jpg"}
            captionPreText=""
            captionHeader="WORD SANCTUARY CENTRAL SYSTEMS"
            captionText={`Welcome to mount zion, the heavenly Jerusalem, a church that is heaven!`}
            alt="Home banner 1"
            imageStyling="animate-accordion-down"
            />,
            <HomeCarouselBanner 
            key={"banner2"}
            src={"/assets/new6.jpg"}
            captionPreText=""
            captionHeader="WORD SANCTUARY CENTRAL SYSTEMS"
            captionText={`Welcome to mount zion, the heavenly Jerusalem, a church that is heaven!`}
            imageStyling="animate-accordion-down"
            alt="Home banner 2"
            />,
            <HomeCarouselBanner 
            key={"banner3"}
            src={"/assets/new8.jpg"}
            alt="Home banner 3"
            captionPreText=""
            captionHeader="WORD SANCTUARY CENTRAL SYSTEMS"
            imageStyling="animate-accordion-down"
            captionText={`Welcome to mount zion, the heavenly Jerusalem, a church that is heaven!`}
            />,
          ]}
        />
      </div>
    </div>
  );
};

export default HomeHeroSlider;
