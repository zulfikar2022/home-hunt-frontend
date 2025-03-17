/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IRental } from "../dashboards/landlord/myRentlas/MyRentals";
import { BASE_URL } from "../../../utils/constants";
import { jwtDecode } from "jwt-decode";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import toast from "react-hot-toast";

export function RentalDetail({ rentalId }: { rentalId: string }) {
  const [data, setData] = useState<IRental>({
    _id: "",
    location: "",
    description: "",
    rentAmount: 0,
    numberOfBedrooms: 0,
    amenities: [],
    images: [],
    isDeleted: false,
    landlordID: "",
  });
  const handleRequestRent = async (rentalId: string) => {
    console.log("Request to rent");
    console.log({ rentalId, userId: tokenData.id });
    if (tokenData.role !== "tenant") {
      toast.error("Only tenants can request for rentals");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/tenants/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ rentalId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };
  const [tokenData, setTokenData] = useState<{
    id: string | undefined;
    role: string | undefined;
  }>({ id: undefined, role: undefined });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenPayload = jwtDecode<{
        id: string;
        role: string;
      }>(token);
      setTokenData(tokenPayload);
    }

    const fetchRental = async () => {
      try {
        const res = await fetch(`${BASE_URL}/public/rentals/${rentalId}`);
        const data = await res.json();
        setData(data.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchRental();
  }, [rentalId]);

  return (
    <Card className="max-w-3xl rounded-lg shadow-lg mx-auto mb-3 p-6 flex flex-col items-center">
      {/* Image slider centered */}
      <div className="w-full max-w-md flex justify-center items-center">
        <Carousel className="">
          <CarouselContent>
            {data?.images &&
              data?.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent>
                        <Image
                          src={image}
                          alt={`image of ${data.location}`}
                          className="w-full h-full object-cover"
                          width={1000}
                          height={1000}
                          layout="responsive"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <CardContent className="p-4">
        <CardHeader className="text-2xl font-semibold mb-2">
          {data.location}
        </CardHeader>
        <p className="text-sm text-gray-600 mb-4">{data.description}</p>
        <p className="text-xl font-semibold text-green-600 mb-4">
          Rent: ${data.rentAmount}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Bedrooms: {data.numberOfBedrooms}
        </p>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Amenities:</span>
          <ul className="list-disc pl-5">
            {data?.amenities &&
              data.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex  w-full">
        {tokenData.id && tokenData.role === "tenant" ? (
          <Button
            onClick={() => handleRequestRent(rentalId)}
            variant="outline"
            className="hover:cursor-pointer transition-all"
          >
            Request to Rent
          </Button>
        ) : (
          <p className="text-red-500">Only tenants can request for rentals</p>
        )}
      </CardFooter>
    </Card>
  );
}
