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
  updateDepartmentTypeDetailsHandler: Dispatch<SetStateAction<z.infer<typeof CreateDepartmentClassFormSchema> | null>>;
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

  const onSubmit = async (data: z.infer<typeof CreateDepartmentClassFormSchema>) => {
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
                <FormItem className="mb-2">
                  <FormLabel>Department Type name </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Word Sanctuary Choir" {...field} />
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
                    <Input placeholder="please enter some description of the department type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            type="submit"
            variant={"default"}
            className="bg-primarycol text-white w-full mt-2"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
