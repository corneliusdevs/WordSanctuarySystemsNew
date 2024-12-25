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

import { CreateIndividualProfileSchema } from "./IndividualOnboardingFormSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IndividualOnboardingFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateIndividualDataHandler: Dispatch<
    SetStateAction<z.infer<typeof CreateIndividualProfileSchema> | null>
  >;
}

export function IndividualOnboardingForm({
  isMutatingDbResource,
  isMutatingDbResourceHandler,
  updateIndividualDataHandler,
}: IndividualOnboardingFormProps) {
  const form = useForm<z.infer<typeof CreateIndividualProfileSchema>>({
    resolver: zodResolver(CreateIndividualProfileSchema),
    defaultValues: {
      // email: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(
      "here are the values of indinvidualProfile onboarding form ",
      data
    );
    updateIndividualDataHandler(data);
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
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Name </FormLabel>
                  <FormControl>
                    <Input placeholder="enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Surname </FormLabel>
                  <FormControl>
                    <Input placeholder="enter your surname here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input placeholder="enter your email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="phone_contact"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Phone </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your phone number here"
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
            name="giving_number"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Giving Number </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your giving number here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* ADD LEADERSHIP LEVEL DROPDOWN HERE */}

          <FormField
            control={form.control}
            name="leadership_level"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Leadership Level </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your giving number here"
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
            name="lifeclass_topic"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Life Class Topic </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your life class topic here"
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
            name="lifeclass_teacher_profile_id"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Life class teacher </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your giving number here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* mentor profile ID here */}
          <FormField
            control={form.control}
            name="mentor_profile_id"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Mentor </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your giving number here"
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
            name="installation_id"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Installation </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your phone number here"
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
            name="departments"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Departments </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your giving number here"
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
            name="centrals"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Centrals </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your giving number here"
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
            name="birthday"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Birthday </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g 04-12 in dd-mm format" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name={"passport"}
            render={({ field: { value, onChange, ...fieldProps } }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Passport</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      type="file"
                      {...fieldProps}
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0]; // get first file
                        onChange(file);
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
            name={"signature"}
            render={({ field: { value, onChange, ...fieldProps } }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Signature</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      type="file"
                      {...fieldProps}
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0]; // get first file
                        onChange(file);
                      }}
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
            className={`${
              isMutatingDbResource && "pointer-events-none opacity-70"
            } mt-2 bg-primarycol text-white w-full `}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
