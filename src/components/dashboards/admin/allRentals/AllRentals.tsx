"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteConfirmation from "@/components/utils-components/DeleteConfirmation";
import { EyeIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../utils/constants";
import { IRental } from "../../landlord/myRentlas/MyRentals";
import { TMetadata } from "@/common_pages/Rentals";
import Pagination from "@/components/utils-components/Pagination";
import DetailsDialog from "@/components/utils-components/DetailsDialogue";

const AllRentals = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IRental[] | []>([]);
  const [metadata, setMetadata] = useState<TMetadata | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/listings`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          cache: "no-store",
        });
        const data = await res.json();
        console.log(data.data.rentals);
        setData(data.data.rentals);
        setMetadata(data.data.metadata);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  const onPageChange = async (page: number) => {
    console.log(page);
    const res = await fetch(`${BASE_URL}/admin/listings?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    setData(data.data.rentals);
    setMetadata(data.data.metadata);
  };
  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/admin/listings/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token!,
      },
    })
      .then((res) => res.json())
      .then(() => window.location.reload());
  };

  const handleOpenDetailsDialog = (id: string) => {
    setSelectedItemId(id);
    setIsDetailsDialogOpen(true);
  };
  const handleCloseDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedItemId(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="font-bold text-3xl mb-3">All rentals Here</h1>
      <div className="w-[95%]">
        {data?.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Rent Amount</TableHead>
                <TableHead>Number Of Bedrooms</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((rental) => (
                <TableRow key={rental._id}>
                  <TableCell>{rental.location}</TableCell>
                  <TableCell>{rental.rentAmount}</TableCell>
                  <TableCell>{rental.numberOfBedrooms}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <DeleteConfirmation
                        onConfirm={() => handleDelete(rental._id)}
                      >
                        <Button
                          className="hover:cursor-pointer"
                          variant="destructive"
                        >
                          <Trash2Icon />
                        </Button>
                      </DeleteConfirmation>
                      <Button
                        onClick={() => handleOpenDetailsDialog(rental._id)}
                        className="hover:cursor-pointer"
                        variant="ghost"
                      >
                        <EyeIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {selectedItemId && (
        <DetailsDialog
          id={selectedItemId}
          isOpen={isDetailsDialogOpen}
          onClose={handleCloseDetailsDialog}
        />
      )}

      <Pagination
        metadata={
          metadata || { eachPageItem: 5, totalPages: 1, currentPage: 1 }
        }
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllRentals;
