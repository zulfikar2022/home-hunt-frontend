"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { useEffect } from "react";

const FailedPayment = () => {
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
      <h1 className="text-red-600 text-4xl">Payment failed!</h1>
      <p className="text-sm text-gray-500 mt-2">Please try again later.</p>
    </div>
  );
};

export default FailedPayment;
