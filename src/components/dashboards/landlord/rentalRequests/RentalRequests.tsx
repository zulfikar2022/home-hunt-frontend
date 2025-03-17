/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { IRental } from "../myRentlas/MyRentals";
import { BASE_URL } from "../../../../../utils/constants";
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
import moment from "moment";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isDeactivated: boolean;
  isDeleted: boolean;
  profileImage: string;
  role: "landlord" | "tenant" | "admin";
  __v: number;
}

interface IRentalRequest {
  _id: string;
  tenantId: IUser;
  rentalId: IRental;
  landlordID: IUser;
  isDeleted: boolean;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

const RentalRequests = () => {
  const [rentalRequests, setRentalRequests] = React.useState<IRentalRequest[]>(
    []
  );

  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    const fetchRentalRequests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/landlords/requests`, {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data.data);
        setRentalRequests(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentalRequests();
  }, []);

  const handleRejection = async (id: string) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await fetch(`${BASE_URL}/landlords/requests/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: token!,
        },
        body: JSON.stringify({ status: "rejected" }),
      });
      await res.json();
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleApprove = async (id: string) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await fetch(`${BASE_URL}/landlords/requests/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: token!,
        },
        cache: "no-store",
        body: JSON.stringify({ status: "approved" }),
      });
      await res.json();
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="font-bold text-3xl mb-3">Rental Requests</h1>
      <div className="w-[95%]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Tenant Email</TableHead>
              <TableHead>When Requested</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentalRequests.map((rentalRequest) => (
              <TableRow key={rentalRequest._id}>
                <TableCell>{rentalRequest.tenantId.name}</TableCell>
                <TableCell>{rentalRequest.tenantId.email}</TableCell>
                <TableCell>
                  {" "}
                  {moment(rentalRequest.createdAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}{" "}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(rentalRequest._id)}
                      variant="outline"
                      className="hover:cursor-pointer transition-all"
                    >
                      Approve
                    </Button>

                    <DeleteConfirmation
                      buttonValue="Reject"
                      description="This action cannot be undone. This will permanently reject the rental request."
                      onConfirm={() => handleRejection(rentalRequest._id)}
                    >
                      <Button
                        variant="destructive"
                        className="hover:cursor-pointer transition-all"
                      >
                        Reject
                      </Button>
                    </DeleteConfirmation>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RentalRequests;
