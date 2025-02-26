"use client";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../Button";

// Schema for list item validation
const ListSchema = z.object({
  listItem: z.string().min(2, "Minimum of 2 characters is required"),
});

type FormProps = {
  onSubmit: (data: { listItem: string }) => void;
};

export default function ShoppingListForm({ onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ListSchema>>({
    resolver: zodResolver(ListSchema),
  });

  // Handle form submission and reset the form
  const handleFormSubmit = (data: z.infer<typeof ListSchema>) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-4">
      <div className="flex flex-col gap-4 w-full mb-10">
        <label htmlFor="listItem" className="sr-only">
          Add shopping list item
        </label>
        <input
          type="text"
          id="listItem"
          className="border rounded w-full h-11 pl-4 uppercase"
          placeholder="Add To Shopping List"
          {...register("listItem")}
        />
        {errors.listItem && (
          <span className="text-xs text-red-500 mx-auto">
            {errors.listItem.message}
          </span>
        )}
      </div>
      <Button type="submit">
        <MdFormatListBulletedAdd className="w-10 h-7 text-white/80" />
      </Button>
    </form>
  );
}
