"use client";

import Pagination from "./Pagination";

const AllRentals = () => {
  const onPageChange = (page: number) => {
    console.log(page);
  };
  return (
    <div>
      <h1>All Rentals Are here in a paginated way</h1>
      <Pagination
        metadata={{ eachPageItem: 5, totalPages: 10, currentPage: 1 }}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllRentals;
