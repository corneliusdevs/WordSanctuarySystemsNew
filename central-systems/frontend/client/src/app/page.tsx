import MaxwidthWrapper from "@/components/Min_Max_Width_Wrapper";
import HomeHeroSlider from "../components/HomeHeroSlider";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";
import Navbar from "@/components/navbar/Navbar";
import HomeContent from "@/components/HomeContent";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="">
      <MaxwidthWrapper>
        <main className="">
        {/* <DesktopNavbar />
        <Navbar /> */}
          <HomeHeroSlider />
          <HomeContent />
        </main>
        <Footer/>
      </MaxwidthWrapper>
    </div>
  );
}
