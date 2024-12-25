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
import { CreateCentralProfileSchema } from "./CreateCentralFormSchema";

interface CreateCentralFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateCreateCentralDetailsHandler: Dispatch<
    SetStateAction<z.infer<typeof CreateCentralProfileSchema> | null>
  >;
}

export function CreateCentralForm({
  isMutatingDbResource,
  isMutatingDbResourceHandler,
  updateCreateCentralDetailsHandler,
}: CreateCentralFormProps) {
  const form = useForm<z.infer<typeof CreateCentralProfileSchema>>({
    resolver: zodResolver(CreateCentralProfileSchema),
    defaultValues: {
      //
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateCentralProfileSchema>) => {
    console.log("here are the values of central  form ", data);
    updateCreateCentralDetailsHandler(data);
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
            name="central_name"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Central Name </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g MPCD Central" {...field} />
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
                      placeholder="please enter some description of the central"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="finance_id"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Finance Id </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="please enter some description of the central"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex justify-center items-center text-xl">
            <span>Departments</span>
          </div>

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
