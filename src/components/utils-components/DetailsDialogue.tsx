/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DetailsDialog.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { BASE_URL } from "../../../utils/constants";
import { IRental } from "../dashboards/landlord/myRentlas/MyRentals";
import { Button } from "../ui/button";
import Image from "next/image";
import { Separator } from "../ui/separator";

interface DetailsDialogProps {
  id: string; // _id to fetch the details
  isOpen: boolean;
  onClose: () => void;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({
  id,
  isOpen,
  onClose,
}) => {
  const [item, setItem] = useState<IRental | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(item?.numberOfBedrooms);
  console.log(item?.rentAmount);
  console.log(item?.location);

  useEffect(() => {
    console.log(id);
    if (isOpen && id) {
      const fetchItem = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${BASE_URL}/landlords/listings/${id}`, {
            method: "GET",
            headers: {
              authorization: localStorage.getItem("token")!,
            },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch item data");
          }
          const data = await res.json();
          setItem(data.data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [id, isOpen]);

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Loading...</DialogTitle>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>{error}</DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-fit max-h-[80vh] overflow-y-auto sm:max-w-[90vw]">
        <DialogTitle>{item?.location}</DialogTitle>
        <DialogDescription>{item?.description}</DialogDescription>
        <div className="mt-4">
          <p>
            <span className="underline">Rent Amount:</span> ${item?.rentAmount}
          </p>
          <br />
          <p>
            <span className="underline">Number of Bedrooms:</span>{" "}
            {item?.numberOfBedrooms}
          </p>
          <br />
          <div>
            <p className="underline">Amenities:</p>
            <ul>
              {item?.amenities &&
                item.amenities.map((amenity) => {
                  return (
                    <li key={amenity}>
                      {" "}
                      <span className="font-bold">-{amenity}</span>{" "}
                    </li>
                  );
                })}
            </ul>
          </div>
          <Separator />

          <div className="grid grid-cols-1 items-center md:grid-cols-3 mt-1 gap-4">
            {item?.images?.map((image) => {
              return (
                <Image
                  className="mx-auto"
                  key={image}
                  src={image}
                  width={300}
                  height={300}
                  alt="Home Image"
                />
              );
            })}
          </div>
        </div>
        <DialogClose asChild>
          <Button
            className="btn btn-secondary border w-fit py-3 px-3 mx-auto rounded-2xl hover:cursor-pointer mt-4"
            variant="secondary"
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
