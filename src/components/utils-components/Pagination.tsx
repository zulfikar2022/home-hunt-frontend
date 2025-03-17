import { Button } from "@/components/ui/button";

interface PaginationProps {
  metadata: {
    eachPageItem: number;
    totalPages: number;
    currentPage: number;
  };
  onPageChange: (page: number) => void;
}

export default function Pagination({
  metadata,
  onPageChange,
}: PaginationProps) {
  const { totalPages, currentPage } = metadata;

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button> */}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          className="hover:cursor-pointer"
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      {/* 
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button> */}
    </div>
  );
}
