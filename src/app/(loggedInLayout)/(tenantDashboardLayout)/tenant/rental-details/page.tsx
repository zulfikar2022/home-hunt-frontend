"use client";

import { RentalDetail } from "@/components/RentalDetails/RentalDetails";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";

export default function RentalDetailsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <RentalDetailsContent />
    </Suspense>
  );
}

function RentalDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return (
    <div>
      <RentalDetail rentalId={id} />
    </div>
  );
}
