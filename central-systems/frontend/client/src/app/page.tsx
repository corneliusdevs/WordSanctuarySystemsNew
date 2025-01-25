import MaxwidthWrapper from "@/components/Min_Max_Width_Wrapper";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/Hero";
//import HomeHeroSlider from "../components/HomeHeroSlider";
//import HomeContent from "@/components/HomeContent";
import AboutSection from "@/components/AboutSection";
import VisionSection from "@/components/VisionSection";
import Installation from "@/components/Installation";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="">
      <MaxwidthWrapper>
        <main className="">
        {/* <DesktopNavbar />
        <Navbar /> */}
          <DesktopNavbar />
          <Navbar />
          {/* <Navbar /> */}
          <Hero />
          {/* <HomeHeroSlider /> */}
          {/* <HomeContent /> */}
          <AboutSection />
          <VisionSection />
          <Installation />
        </main>
        <Footer/>
      </MaxwidthWrapper>
    </div>
  );
}
