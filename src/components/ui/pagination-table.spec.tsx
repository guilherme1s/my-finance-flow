import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { PaginationTable } from "./pagination-table";

describe("PaginationTable", () => {
  it("should render pagination info correctly", () => {
    render(
      <PaginationTable
        currentPage={1}
        itemsPerPage={5}
        totalPages={4}
        totalItems={20}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText("1 a 5 de 20 categorias")).toBeInTheDocument();
  });

  it("should render last page range correctly", () => {
    render(
      <PaginationTable
        currentPage={4}
        itemsPerPage={5}
        totalPages={4}
        totalItems={18}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText("16 a 18 de 18 categorias")).toBeInTheDocument();
  });

  it("should call onPageChange when clicking a page number", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <PaginationTable
        currentPage={1}
        itemsPerPage={5}
        totalPages={4}
        totalItems={20}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByText("2"));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should go to previous page", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <PaginationTable
        currentPage={2}
        itemsPerPage={5}
        totalPages={4}
        totalItems={20}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByLabelText(/previous/i));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should go to next page", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <PaginationTable
        currentPage={1}
        itemsPerPage={5}
        totalPages={4}
        totalItems={20}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByLabelText(/next/i));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should not go below page 1", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <PaginationTable
        currentPage={1}
        itemsPerPage={5}
        totalPages={4}
        totalItems={20}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByLabelText(/previous/i));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should not go above totalPages", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <PaginationTable
        currentPage={4}
        itemsPerPage={5}
        totalPages={4}
        totalItems={20}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByLabelText(/next/i));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
