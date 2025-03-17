import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CarouselItemDescription from "./CarouselItemDescription";

const HomeCarousel = () => {
  return (
    <div className="mb-5">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <CarouselItemDescription
              imgSrc="h-4.jpg"
              text={{
                title: "Find Your Dream Home",
                description:
                  "Browse through a wide range of properties listed by homeowners, and find the perfect place to call home. From cozy apartments to spacious houses, we have something for everyone",
              }}
            />
          </CarouselItem>
          <CarouselItem>
            <CarouselItemDescription
              imgSrc="h-5.jpg"
              text={{
                title: "List Your Property Today",
                description:
                  "Turn your property into a rental opportunity! Easily list your home, reach potential tenants, and start earning. Our platform makes it simple to manage your listing and connect with interested tenants.",
              }}
            />
          </CarouselItem>
          <CarouselItem>
            <CarouselItemDescription
              imgSrc="h-6.jpg"
              text={{
                title: "Safe and Secure Payments",
                description:
                  "Our platform ensures a smooth and secure payment process. Once your rental agreement is approved, tenants can easily pay their bills via Stripe, giving you peace of mind.",
              }}
            />
          </CarouselItem>
          <CarouselItem>
            <CarouselItemDescription
              imgSrc="h-7.jpg"
              text={{
                title: "Manage Your Rental with Ease",
                description:
                  "Easily manage your rental properties. Receive tenant requests, approve bookings, and track your earnings all from one convenient dashboard.",
              }}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
