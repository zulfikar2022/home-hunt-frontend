"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { useEffect } from "react";

const SuccessfulPayment = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay to show the message
    const timer = setTimeout(() => {
      router.push("/"); // Redirect to home page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-green-600 text-4xl">Payment Successful!</h1>
      <p className="text-sm text-gray-500 mt-2">
        Thank you for your purchase. You will be redirected shortly.
      </p>
    </div>
  );
};

export default SuccessfulPayment;
