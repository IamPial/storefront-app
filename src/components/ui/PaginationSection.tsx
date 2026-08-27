"use client";

import { Pagination } from "@heroui/react";

interface PaginationProps {
  total: number;      
  page: number;        
  onChange: (page: number) => void;
}

const PaginationSection = ({ total, page, onChange }: PaginationProps) => {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center my-8 items-center">
      <Pagination className="flex justify-center items-center my-2">
        <Pagination.Content>
          {/* Previous Button */}
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={page === 1}
              onClick={() => onChange(page - 1)}
            >
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {/* Page Numbers */}
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === page}
                onClick={() => onChange(p)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          {/* Next Button */}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={page === total}
              onClick={() => onChange(page + 1)}
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};

export default PaginationSection;