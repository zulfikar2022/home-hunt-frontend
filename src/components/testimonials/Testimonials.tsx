import React from "react";
import Testimonial from "../testimonial/Testimonial";
import { Separator } from "../ui/separator";

const Testimonials = () => {
  return (
    <div>
      <Separator />
      <h1 className="text-center text-4xl mb-2 mt-5">Satisfactions</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-10">
        <Testimonial
          author="Sarah Thompson"
          fallback="ST"
          text="Absolutely amazing service! The process was smooth, and the results were beyond my expectations. Will definitely use this again!"
        />
        <Testimonial
          author="Michael Brown"
          fallback="MB"
          text="Fast, reliable, and professional. I couldn’t be happier with the outcome. Highly recommended for anyone looking for top-notch service!"
        />
        <Testimonial
          text="Great experience from start to finish. The team was responsive, attentive, and delivered exactly what I needed. Five stars!"
          author="Emily Carter"
          fallback="EC"
        />
      </div>
    </div>
  );
};

export default Testimonials;
