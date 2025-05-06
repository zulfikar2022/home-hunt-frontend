"use client";

import { IRental } from "@/components/dashboards/landlord/myRentlas/MyRentals";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../utils/constants";
import { RentalCard } from "@/components/RentalCard/RentalCard";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";

const SomeRentals = () => {
  const [rentals, setRentals] = useState<IRental[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    setToken(userToken);
    const fetchRentals = async () => {
      try {
        const res = await fetch(`${BASE_URL}/public/rentals`);
        const data = await res.json();

        setRentals(data.data.rentals.splice(0, 8));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const handleSeeAllRentals = async () => {
    if (token) {
      const decodedToken = jwtDecode<{ id: string; role: string }>(token);
      if (decodedToken.role) {
        router.push(`/${decodedToken.role}/rentals`);
      } else {
        router.push(`/rentals`);
      }
    } else {
      router.push(`/rentals`);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="my-10 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-5"> Rentals</h1>
      {rentals.length > 0 ? (
        <div className="w-fit mx-auto">
          <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-4 gap-10">
            {rentals?.map((rental) => {
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
          <div className="flex justify-center items-center">
            <Button
              onClick={handleSeeAllRentals}
              className="mt-4 hover:cursor-pointer w-fit "
              variant="outline"
            >
              See All Rentals ➡️
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center">No rentals available</p>
      )}
    </div>
  );
};

export default SomeRentals;
