import { TravelTips } from "@/components/dummy-components/TravelTips";
import Footer from "@/components/footer/Footer";
import HomeCarousel from "@/components/home-page/home-page-carousel/HomeCarousel";
import SomeRentals from "@/components/home-page/some-rentals/SomeRentals";
import StayConnected from "@/components/stay-connected/StayConnected";

import Testimonials from "@/components/testimonials/Testimonials";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  return (
    <div className="container mx-auto mt-10">
      <HomeCarousel />
      <Separator />
      <SomeRentals />
      <Separator />
      <TravelTips />
      <StayConnected />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
