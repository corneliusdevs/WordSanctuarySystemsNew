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
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";

interface IndividualOnboardingFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateIndividualDataHandler: Dispatch<SetStateAction<string>>;
}

export function IndividualOnboardingForm({
  isMutatingDbResource,
  isMutatingDbResourceHandler,
  updateIndividualDataHandler,
}: IndividualOnboardingFormProps) {
  const form = useForm<z.infer<typeof CreateIndividualProfileSchema>>({
    resolver: zodResolver(CreateIndividualProfileSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({
    email,
  }: z.infer<typeof CreateIndividualProfileSchema>) => {
    console.log("here are the values of email form ", email);
    updateIndividualDataHandler(email);
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
            name="lifeclass_topic"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Life Class Topic </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your life class topic here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* mentor profiel ID here */}
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
            name="birthday"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Birthday </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your birthday number here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* signature */}
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
