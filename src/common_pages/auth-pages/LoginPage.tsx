"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../../../utils/constants";
import { tokenDecoder } from "../../../utils/auth";
import { useEffect } from "react";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password is very small." })
      .max(50, { message: "Password is too long" }),
  })
  .strict();

const LoginComponent = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { role } = tokenDecoder(token);
      router.push(`/${role}`);
    }
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const { email, password } = values;
      console.log(values);
      // Call login api
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.data.token);
        Cookies.set("token", data.data.token, { expires: 7, path: "/" });
        form.reset();
        const { role } = tokenDecoder(data.data.token);
        router.push(`/${role}`);
      }
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className=" border-1 w-[75%] md:w-[25%] mx-auto my-auto p-2 md:p-8 rounded-lg shadow-lg mt-11">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          {
            <Button
              disabled={form.formState.isSubmitting}
              className="hover:cursor-pointer w-full"
              type="submit"
            >
              {form.formState.isSubmitting ? "Logging In..." : "Log In"}
            </Button>
          }
        </form>
      </Form>
    </div>
  );
};

export default LoginComponent;
