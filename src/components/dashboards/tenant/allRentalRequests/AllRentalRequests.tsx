/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { IRental } from "../../landlord/myRentlas/MyRentals";
import {
  BASE_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
} from "../../../../../utils/constants";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteConfirmation from "@/components/utils-components/DeleteConfirmation";
import { loadStripe } from "@stripe/stripe-js";

type RentalStatus = "pending" | "approved" | "rejected";

export interface IRentalRequest {
  _id: string;
  tenantId: string;
  rentalId: IRental;
  landlordId: string;
  isDeleted: boolean;
  status: RentalStatus;
  isPaid: boolean;
}

const AllRentalRequests = () => {
  const [rentalRequests, setRentalRequests] = useState<IRentalRequest[] | []>(
    []
  );
  const [loading, setLoading] = useState(true);
  const handleDelete = async (id: string) => {
    console.log("Inside handleDelete");
    console.log(id);
    try {
      const res = await fetch(`${BASE_URL}/tenants/requests/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data?.message || "Rental request deleted successfully");
        setRentalRequests((rentalRequests) =>
          rentalRequests.filter((request) => request._id !== id)
        );
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const handlePayment = async (id: string) => {
    console.log("Inside handlePayment ", id);
    const targetRental = rentalRequests.find((request) => request._id === id);
    if (targetRental) {
      const price = targetRental.rentalId.rentAmount;
      const targetRentalRequestId = `${id}`;

      try {
        const res = await fetch(`${BASE_URL}/tenants/payment-session`, {
          method: "POST",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price,
            rentalRequestId: targetRentalRequestId,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          const stripeData = data.data;
          console.log({ stripeData });
          console.log(JSON.stringify(stripeData));

          if (!stripeData.id) throw new Error("Failed to create session");
          const stripe = await stripePromise;
          if (!stripe) throw new Error("Stripe failed to load");
          const { error } = await stripe?.redirectToCheckout({
            sessionId: stripeData.id,
          });
          if (error) {
            throw new Error(error.message || "An error occurred");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchRentalRequests = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tenants/requests`, {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          cache: "no-store",
        });
        const data = await res.json();
        console.log(data.data);
        setRentalRequests(data.data);
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchRentalRequests();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="font-bold text-3xl mb-3">All rental requests</h1>

      <div style={{ width: "95%" }}>
        {!loading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Rental Amount</TableHead>
                <TableHead>Number Of Bedrooms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delete Request</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentalRequests?.map((request) => (
                <TableRow key={request._id} className="transition-all">
                  <TableCell>{request.rentalId.location}</TableCell>
                  <TableCell>{request.rentalId.rentAmount}</TableCell>
                  <TableCell>{request.rentalId.numberOfBedrooms}</TableCell>
                  <TableCell>
                    {request.status === "approved" ? (
                      <span className="text-green-500">approved</span>
                    ) : request.status === "pending" ? (
                      <span className="text-orange-600">pending</span>
                    ) : (
                      <span className="text-red-500">rejected</span>
                    )}
                  </TableCell>

                  <TableCell className="flex gap-2">
                    <DeleteConfirmation
                      onConfirm={() => handleDelete(request._id)}
                    >
                      <Button
                        disabled={request.isPaid}
                        variant="destructive"
                        className="hover:cursor-pointer"
                      >
                        Delete{" "}
                      </Button>
                    </DeleteConfirmation>
                    {request.status === "approved" && (
                      <Button
                        disabled={request.isPaid}
                        onClick={() => handlePayment(request._id)}
                        variant={"outline"}
                        className="hover:cursor-pointer"
                      >
                        {request.isPaid ? "Paid" : "Pay"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AllRentalRequests;
