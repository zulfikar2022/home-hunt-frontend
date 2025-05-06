/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tokenDecoder } from "../../../../utils/auth";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../../utils/constants";
import Link from "next/link";

// Zod schema for form validation
const formSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password is very small." })
      .max(50, { message: "Password is too long" }),
    confirmPassword: z.string(),
    role: z.enum(["tenant", "landlord"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { role } = tokenDecoder(token);
      router.push(`/${role}/dashboard`);
    }
  }, [router]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "tenant", // Default role
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...updatedValues } = values;
    try {
      const res = await fetch(`${BASE_URL}/users/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(updatedValues),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message, {
          duration: 8000,
        });
        form.reset();
      }
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <div className="border-1 w-[75%] md:w-[25%] mx-auto my-auto p-2 md:p-8 rounded-lg shadow-lg mt-11 mb-11">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Role Select Field */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="landlord">Landlord</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={form.formState.isSubmitting}
            className="hover:cursor-pointer w-full"
            type="submit"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="mt-5">
        <p>Already have an account?</p>{" "}
        <Link className="underline text-blue-700" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
