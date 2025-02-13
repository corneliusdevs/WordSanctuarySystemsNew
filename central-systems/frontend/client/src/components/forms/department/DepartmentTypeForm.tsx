import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SetStateAction, Dispatch } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { CreateDepartmentClassFormSchema } from "./DepartmentTypeFormSchema";

interface DepartmentTypeFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateDepartmentTypeDetailsHandler: Dispatch<
    SetStateAction<z.infer<typeof CreateDepartmentClassFormSchema> | null>
  >;
}

export function DepartmentTypeForm({
  isMutatingDbResource,
  isMutatingDbResourceHandler,
  updateDepartmentTypeDetailsHandler,
}: DepartmentTypeFormProps) {
  const form = useForm<z.infer<typeof CreateDepartmentClassFormSchema>>({
    resolver: zodResolver(CreateDepartmentClassFormSchema),
    defaultValues: {
      //
    },
  });

  const onSubmit = async (
    data: z.infer<typeof CreateDepartmentClassFormSchema>
  ) => {
    console.log("here are the values of department type form ", data);
    updateDepartmentTypeDetailsHandler(data);
    isMutatingDbResourceHandler(true);
  };

  return (
    <div
      className={`${isMutatingDbResource && "pointer-events-none opacity-70"}`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="department_class_name"
            render={({ field }) => {
              return (
                <FormItem className="mb-5">
                  <FormLabel>Name </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g Word Sanctuary Choir"
                      {...field}
                      className="rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Description"
                      {...field}
                      className="rounded-2xl h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            type="submit"
            variant={"default"}
            className="bg-primarycol text-white w-full mt-20 rounded-2xl"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
