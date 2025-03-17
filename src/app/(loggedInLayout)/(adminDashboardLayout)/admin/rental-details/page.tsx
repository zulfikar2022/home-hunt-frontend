"use client";

import { RentalDetail } from "@/components/RentalDetails/RentalDetails";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function RentalDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
