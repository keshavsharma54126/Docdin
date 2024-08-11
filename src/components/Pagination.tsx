"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlProps {
  hasNextPage: boolean;
  totalPages: number;
  currentPage: number;
}

export function PaginationDemo({
  hasNextPage,
  totalPages,
  currentPage,
}: PaginationControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    router.push(createPageUrl(pageNumber));
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
            className="cursor-pointer hover:bg-gray-100" // Added cursor and hover styles
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageLinks;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={`cursor-pointer ${currentPage === 1 ? "opacity-50" : "hover:bg-gray-100"}`} // Added cursor and conditional styles
          />
        </PaginationItem>

        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(1)}
                className="cursor-pointer hover:bg-gray-100" // Added cursor and hover styles
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 3 && <PaginationEllipsis />}
          </>
        )}

        {renderPageLinks()}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(totalPages)}
                className="cursor-pointer hover:bg-gray-100" // Added cursor and hover styles
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
            aria-disabled={!hasNextPage}
            className={`cursor-pointer ${!hasNextPage ? "opacity-50" : "hover:bg-gray-100"}`} // Added cursor and conditional styles
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
