"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "next-themes";

export function RentalCard({
  image,
  location,
  description,
  rentAmount,
  _id,
}: {
  image: string;
  location: string;
  description: string;
  rentAmount: number;
  _id: string;
}) {
  const [tokenPayload, setTokenPayload] = useState<{
    id: string | undefined;
    role: string | undefined;
  }>({ id: undefined, role: undefined });
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenPayload = jwtDecode<{ id: string; role: string }>(token);
      setTokenPayload(tokenPayload);
    }

    const cardElements = document.querySelectorAll('[data-slot="card"]');
    cardElements.forEach((element) => {
      (element as HTMLElement).style.padding = "0px";
      (element as HTMLElement).style.justifyContent = "space-between";
    });
  }, []);
  const router = useRouter();
  const handleClickView = (id: string) => {
    console.log("View button clicked");
    console.log("withID: ", id);
    if (!tokenPayload.role) {
      router.push(`/rental-details?id=${id}`);
    } else {
      router.push(`/${tokenPayload.role}/rental-details?id=${id}`);
    }
  };
  return (
    <Card className="max-w-xs rounded-lg shadow-lg">
      {/* Image at the top of the card */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={`image of ${location}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardContent className="">
        {/* Card header */}
        <CardHeader className="text-xl font-semibold mb-2">
          {location}
        </CardHeader>
        {/* Description section */}
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </CardContent>
      <div className="flex justify-between items-center pr-1">
        <CardFooter className="p-4">
          {/* Price tag */}
          <span
            className={`text-lg font-semibold ${
              resolvedTheme === "dark" ? "#e3e6e8" : "#030712"
            }`}
          >
            ${rentAmount}
          </span>
        </CardFooter>
        <Button
          onClick={() => handleClickView(_id)}
          variant="outline"
          className="hover:cursor-pointer"
        >
          View
        </Button>
      </div>
    </Card>
  );
}
