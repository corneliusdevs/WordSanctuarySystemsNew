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
import { CreateDepartmetalProfileSchema } from "./CreateDepartmentFormSchema";

interface CreateDepartmentFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateDepartmentDetailsHandler: Dispatch<
    SetStateAction<z.infer<typeof CreateDepartmetalProfileSchema> | null>
  >;
}

export function CreateDepartmentForm({
  isMutatingDbResource,
  isMutatingDbResourceHandler,
  updateDepartmentDetailsHandler,
}: CreateDepartmentFormProps) {
  const form = useForm<z.infer<typeof CreateDepartmetalProfileSchema>>({
    resolver: zodResolver(CreateDepartmetalProfileSchema),
    defaultValues: {
      //
    },
  });

  const onSubmit = async (
    data: z.infer<typeof CreateDepartmetalProfileSchema>
  ) => {
    console.log("here are the values of create department form ", data);
    updateDepartmentDetailsHandler(data);
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
            name="department_name"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Department name </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g WSC COHS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="department_type"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Type of Department</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="please enter some description of the department type"
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
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="please describe this department"
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
                    <Input placeholder="enter your finance id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="installation_id"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Installation </FormLabel>
                  <FormControl>
                    <Input placeholder="enter your installation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="centrals"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Installation </FormLabel>
                  <FormControl>
                    <Input placeholder="enter your installation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex justify-center items-center text-xl">
            <span>Dues</span>
          </div>
          <FormField
            control={form.control}
            name="pastors_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Amount paid by Pastors </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        // parse input as number
                        field.onChange(
                          e.target.value === ""
                            ? e.target.value
                            : Number(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="ministers_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Amount paid by Ministers </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        // parse input as number
                        field.onChange(
                          e.target.value === ""
                            ? e.target.value
                            : Number(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="hods_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Amount paid by HODs </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        // parse input as number
                        field.onChange(
                          e.target.value === ""
                            ? e.target.value
                            : Number(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="asst_hods_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Amount paid by Asst HODs </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        // parse input as number
                        field.onChange(
                          e.target.value === ""
                            ? e.target.value
                            : Number(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="executive_assistants_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Amount paid by Executive Assistants </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        // parse input as number
                        field.onChange(
                          e.target.value === ""
                            ? e.target.value
                            : Number(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="workers_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Amount paid by Workers </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        // parse input as number
                        field.onChange(
                          e.target.value === ""
                            ? e.target.value
                            : Number(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="members_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Amount paid by Members </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        // parse input as number
                        field.onChange(
                          e.target.value === ""
                            ? e.target.value
                            : Number(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex justify-center items-center text-xl">
            <span>Members</span>
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
