import React from "react";
import FAQ from "./about-us-page/FAQ";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/components/footer/Footer";
import Testimonials from "@/components/testimonials/Testimonials";

const AboutPage = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  my-10">
        <FAQ />
        <div className="px-2">
          <h1 className="text-3xl my-5">Our Services</h1>
          <ul className="px-4">
            <li className="flex mb-2 gap-1">
              <span>
                <CheckCircle2 />
              </span>
              <span>
                Easy Property Listings - Landlords can post rental homes with
                photos and details.
              </span>
            </li>
            <li className="flex mb-2 gap-1">
              <span>
                <CheckCircle2 />
              </span>
              <span>
                Smart Search - Find homes by location, price, and number of
                bedrooms.
              </span>
            </li>
            <li className="flex mb-2 gap-1">
              <span>
                <CheckCircle2 />
              </span>
              <span>
                Booking Requests - Tenants can request to book a home, and
                landlords can approve or reject it.
              </span>
            </li>
            <li className="flex mb-2 gap-1">
              <span>
                <CheckCircle2 />
              </span>
              <span>
                Secure Payments - Tenants can pay for rentals through our secure
                payment gateway.
              </span>
            </li>
            <li className="flex mb-2 gap-1">
              <span>
                <CheckCircle2 />
              </span>
              <span>
                {" "}
                Admin Support - Admins oversee user accounts and platform
                management to ensure a smooth
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default AboutPage;
