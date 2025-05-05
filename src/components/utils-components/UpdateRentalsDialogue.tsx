/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constants";
import { IRental } from "../dashboards/landlord/myRentlas/MyRentals";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";
import Loader from "../loader/Loader";

const updateRentalFormSchema = z.object({
  location: z.string().min(3, { message: "Location is too small." }),
  description: z.string().min(10, { message: "Description is too small." }),
  rentAmount: z.string().min(1, { message: "Rent amount is too small." }),
  numberOfBedrooms: z.string().min(1, {
    message: "Number of bedrooms is too small.",
  }),
  amenities: z.string(),
});

export default function UpdateRentalDialog({
  rentalId,
  isOpen,
  onClose,
}: // Callback to refresh the list after update
{
  rentalId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [item, setItem] = useState<IRental | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof updateRentalFormSchema>>({
    resolver: zodResolver(updateRentalFormSchema),
    defaultValues: {
      location: "",
      description: "",
      rentAmount: "",
      numberOfBedrooms: "",
      amenities: "",
    },
  });

  // Fetch rental details when the dialog opens
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (isOpen && rentalId) {
      const fetchItem = async () => {
        try {
          setLoading(true);
          setError(null);

          const res = await fetch(
            `${BASE_URL}/landlords/listings/${rentalId}`,
            {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("token")!,
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch rental data");
          }

          const data = await res.json();
          setItem(data.data);

          // Reset form with fetched data
          form.reset({
            location: data.data.location || "",
            description: data.data.description || "",
            rentAmount: data.data.rentAmount.toString(),
            numberOfBedrooms: data.data.numberOfBedrooms.toString(),
            amenities: data.data.amenities
              ? data.data.amenities.join(", ")
              : "",
          });
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [rentalId, isOpen, form]);

  // Handle form submission (updating rental)
  const handleUpdate = async (
    values: z.infer<typeof updateRentalFormSchema>
  ) => {
    setLoading(true);
    try {
      const amenities = values.amenities
        .split(",")
        .map((amenity) => amenity.trim());
      const decodedToken: { id: string } = jwtDecode(token!);

      const updatable = {
        ...values,
        numberOfBedrooms: parseInt(values.numberOfBedrooms),
        rentAmount: parseInt(values.rentAmount),
        amenities,
        landlordID: decodedToken.id,
      };
      console.log(updatable);
      const res = await fetch(`${BASE_URL}/landlords/listings/${rentalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify(updatable),
      });
      const data = await res.json();
      console.log(data.data);
      if (data.success) {
        toast.success(data.message);
        onClose();
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>
            <Loader />
          </DialogTitle>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Error</DialogTitle>
          <p>{error}</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Rental</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Rent Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfBedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of Bedrooms"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Amenities" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              className="w-full hover:cursor-pointer"
              type="submit"
            >
              {form.formState.isSubmitting ? "Updating..." : "Update Rental"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
