"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../utils/constants";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import DeleteConfirmation from "@/components/utils-components/DeleteConfirmation";
import DetailsDialog from "@/components/utils-components/DetailsDialogue";
import UpdateRentalsDialogue from "@/components/utils-components/UpdateRentalsDialogue";
import Loader from "@/components/loader/Loader";

export interface IRental {
  _id: string;
  location: string;
  description: string;
  rentAmount: number;
  numberOfBedrooms: number;
  landlordID: string;
  isDeleted: boolean;
  images?: string[];
  amenities?: string[];
}

const MyRentals = () => {
  const [data, setData] = useState<IRental[] | []>([]);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleOpenDetailsDialog = (id: string) => {
    setSelectedItemId(id);
    setIsDetailsDialogOpen(true);
  };

  const handleCloseDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedItemId(null);
  };

  const handleOpenEditDialog = (id: string) => {
    setSelectedItemId(id);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedItemId(null);
  };

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/landlords/listings/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token!,
      },
    })
      .then((res) => res.json())
      .then(() => window.location.reload());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/landlords/listings`, {
      headers: {
        authorization: token!,
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch(() => console.log("Error happened"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      id="table-container"
      className="flex flex-col justify-center items-center my-4"
    >
      <h1 className="font-bold text-3xl mb-3">My Rentals</h1>
      {!loading && (
        <div className="w-[95%]">
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
                        onClick={() => handleOpenEditDialog(rental._id)}
                        className="hover:cursor-pointer"
                        variant="outline"
                      >
                        <EditIcon />
                      </Button>
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
        </div>
      )}
      {loading && <Loader />}
      {selectedItemId && (
        <DetailsDialog
          id={selectedItemId}
          isOpen={isDetailsDialogOpen}
          onClose={handleCloseDetailsDialog}
        />
      )}
      {selectedItemId && (
        <UpdateRentalsDialogue
          rentalId={selectedItemId}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
        />
      )}
    </div>
  );
};

export default MyRentals;
