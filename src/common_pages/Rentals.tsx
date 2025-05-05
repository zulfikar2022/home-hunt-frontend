/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IRental } from "@/components/dashboards/landlord/myRentlas/MyRentals";
import Pagination from "@/components/utils-components/Pagination";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { RentalCard } from "@/components/RentalCard/RentalCard";
import { SearchIcon } from "lucide-react";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/loader/Loader";

export type TMetadata = {
  eachPageItem: number;
  totalPages: number;
  currentPage: number;
};
const Rentals = () => {
  const [data, setData] = useState<IRental[] | []>([]);
  const [metadata, setMetadata] = useState<TMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const gridContainer = document.querySelector(".grid");
    if (gridContainer) {
      (gridContainer as HTMLElement).style.justifyItems = "center";
    }
    const fetchRentals = async () => {
      try {
        const res = await fetch(`${BASE_URL}/public/rentals`);
        const data = await res.json();

        setData(data.data.rentals);
        setMetadata(data.data.metadata);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const onPageChange = async (page: number) => {
    const res = await fetch(`${BASE_URL}/public/rentals?page=${page}`);
    const data = await res.json();

    setData(data.data.rentals);
    setMetadata(data.data.metadata);
  };
  const handleSearch = async (event: any) => {
    event.preventDefault();
    const searchData = {
      location: encodeURIComponent(event.target.location.value),
      rentAmount: event.target.rentAmount.value,
      numberOfBedrooms: event.target.numberOfBedrooms.value,
    };
    console.log(searchData);
    try {
      const res = await fetch(
        `${BASE_URL}/public/rentals?location=${searchData.location}&rentAmount=${searchData.rentAmount}&numberOfBedrooms=${searchData.numberOfBedrooms}`
      );
      const data = await res.json();
      console.log(data.data.rentals);

      setData(data.data.rentals);
      setMetadata(data.data.metadata);
    } catch (error: any) {
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-4 ">
      <div className="flex ">
        <div>
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 mb-4"
          >
            <input
              title="Location"
              type="text"
              placeholder="Location"
              name="location"
              className="border border-gray-300 p-1 rounded-lg"
            />
            <input
              title="Price"
              type="number"
              placeholder="Price"
              name="rentAmount"
              className="border border-gray-300 p-1 rounded-lg w-20"
            />
            <input
              title="Number of Bedrooms"
              type="number"
              placeholder="Bedrooms"
              name="numberOfBedrooms"
              className="border border-gray-300 p-1 rounded-lg w-10"
            />
            <button className="hover:cursor-pointer" type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>

      <div className="my-10 mx-auto">
        {data.length > 0 ? (
          <div className="w-fit mx-auto">
            <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-10 ">
              {data?.map((rental) => {
                return (
                  <RentalCard
                    description={rental.description}
                    image={
                      rental?.images && rental.images.length > 0
                        ? rental.images[0]
                        : "./home.svg"
                    }
                    location={rental.location}
                    rentAmount={rental.rentAmount}
                    key={rental._id}
                    _id={rental._id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-center">No rentals available</p>
        )}
      </div>
      <Pagination
        metadata={
          metadata || { eachPageItem: 5, totalPages: 1, currentPage: 1 }
        }
        onPageChange={onPageChange}
      />
      <Footer />
    </div>
  );
};

export default Rentals;
