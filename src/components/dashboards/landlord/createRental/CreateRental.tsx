/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { BASE_URL } from "../../../../../utils/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const createRentalFormSchema = z
  .object({
    location: z.string().min(3, { message: "Location is too small." }),
    description: z.string().min(10, { message: "Description is too small." }),
    rentAmount: z.string().min(1, { message: "Rent amount is too small." }),
    numberOfBedrooms: z.string().min(1, {
      message: "Number of bedrooms is too small.",
    }),

    amenities: z.string(),
  })
  .strict();

const CreateRental = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createRentalFormSchema>>({
    resolver: zodResolver(createRentalFormSchema),
    defaultValues: {
      location: "",
      description: "",
      rentAmount: "",
      numberOfBedrooms: "",
      amenities: "",
    },
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const uploadImages = async (files: File[]) => {
    const uploadedImageUrls: string[] = [];
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dq7jdy5xy/image/upload`;

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "assignment-six"); // Set in Cloudinary

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          uploadedImageUrls.push(data.secure_url);
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error("An error occurred while uploading images.");
    }
    console.log("uploadedImageUrls: ", uploadedImageUrls);

    // setUploadedImageLinks(uploadedImageUrls);
    console.log(
      "uploaded images urls: (in the uploader: ) ",
      uploadedImageUrls
    );
    return uploadedImageUrls;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImages(Array.from(event.target.files));
    }
  };
  async function onSubmit(values: z.infer<typeof createRentalFormSchema>) {
    const amenities = values.amenities
      .split(",")
      .map((amenity) => amenity.trim());
    const uploadable = {
      ...values,
      numberOfBedrooms: parseInt(values.numberOfBedrooms),
      rentAmount: parseInt(values.rentAmount),
      amenities,
      images: [],
    };

    let uploadedImagesUrls: string[] | [] = [];
    if (selectedImages.length > 0) {
      uploadedImagesUrls = await uploadImages(selectedImages);
      console.log(
        "uploaded images urls: (in the handler: ) ",
        uploadedImagesUrls
      );
      // setUploadedImageLinks((prev) => [...prev, ...uploadedImagesUrls]);
    }
    // console.log("uploaded images links: ", uploadedImageLinks);
    console.log("uploaded images urls: ", uploadedImagesUrls);
    const finalUploadable = {
      ...uploadable,
      images: uploadedImagesUrls,
    };

    try {
      const res = await fetch(`${BASE_URL}/landlords/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(finalUploadable),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);

        setSelectedImages([]);
        form.reset();
        router.push("/landlord/dashboard?value=my-rentals");
      } else {
        console.log(data);
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred. Please try again later."
      );
    }

    // console.log("Selected Images:", selectedImages);
  }
  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="text-4xl">Add Rental</h1>
      <div className=" border-1 w-[75%] md:w-[45%] mx-auto my-auto p-2 md:p-8 rounded-lg shadow-lg mt-11">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input type="string" placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
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
                  <FormMessage className="text-red-600" />
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
                  <FormMessage className="text-red-600" />
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
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities(Separated by comma(,))</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Amenities" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Upload Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </FormControl>
              {selectedImages.length > 0 && (
                <p className="text-green-600">
                  {selectedImages.length} image(s) selected
                </p>
              )}
            </FormItem>

            {
              <Button
                disabled={form.formState.isSubmitting}
                className="hover:cursor-pointer w-full"
                type="submit"
              >
                {form.formState.isSubmitting ? "Adding..." : "Add rental"}
              </Button>
            }
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateRental;
