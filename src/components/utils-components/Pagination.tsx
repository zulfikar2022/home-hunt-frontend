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
    </div>
  );
}
