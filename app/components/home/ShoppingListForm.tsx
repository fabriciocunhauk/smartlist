"use client";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../Button";

const ListSchema = z.object({
  listItem: z.string().min(2, "Minimum of 2 characters is required"),
});

type FormProps = {
  onSubmit: (data: { listItem: string }) => void;
};

export default function ShoppingListForm({ onSubmit }: FormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ListSchema>>({
    resolver: zodResolver(ListSchema),
    defaultValues: { listItem: "" },
  });

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
        <Controller
          name="listItem"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="listItem"
              className="border rounded w-full h-11 pl-4"
              placeholder="Add to shopping list"
              autoComplete="on"
              inputMode="text"
              enterKeyHint="done"
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
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
