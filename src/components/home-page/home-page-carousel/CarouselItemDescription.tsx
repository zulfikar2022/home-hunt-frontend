import Image from "next/image";
import React from "react";

const CarouselItemDescription = ({
  imgSrc,
  text,
}: {
  imgSrc: string;
  text: {
    title: string;
    description: string;
  };
}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
      <div className="flex flex-col gap-4">
        <p className="text-4xl ">{text.title}</p>
        <p>{text.description}</p>
      </div>
      <Image src={`/${imgSrc}`} alt="carousel image" width={500} height={500} />
    </div>
  );
};

export default CarouselItemDescription;
