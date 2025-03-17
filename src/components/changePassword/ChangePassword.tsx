/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BASE_URL } from "../../../utils/constants";
import toast from "react-hot-toast";

const changePasswordSchema = z
  .object({
    oldPassword: z.string({ message: "Old password is required" }),
    newPassword: z.string({ message: "New Password is required" }),
  })
  .strict();

const ChangePassword = () => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    try {
      console.log(values);

      const res = await fetch(`${BASE_URL}/users/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/JSON",
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        form.reset();
      }
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Some error");
    }
  }
  return (
    <div>
      <div className=" border-1 w-[75%] md:w-[25%] mx-auto my-auto p-2 md:p-8 rounded-lg shadow-lg mt-11">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Old Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {
              <Button
                disabled={form.formState.isSubmitting}
                className="hover:cursor-pointer w-full"
                type="submit"
              >
                {form.formState.isSubmitting
                  ? "Changing In..."
                  : "Change Password"}
              </Button>
            }
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
