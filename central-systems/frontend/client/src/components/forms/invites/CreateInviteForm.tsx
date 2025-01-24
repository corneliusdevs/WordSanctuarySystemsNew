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
import { CreateInvitationFormSchema } from "./CreateInviteFormSchema";
import { accesses } from "./mock-data";

interface CreateInviteFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateInviteDeatilsHandler: Dispatch<
    SetStateAction<z.infer<typeof CreateInvitationFormSchema> | null>
  >;
  customSubmitButton: React.ReactNode;
}

export function CreateInviteForm({
  isMutatingDbResource,
  isMutatingDbResourceHandler,
  updateInviteDeatilsHandler,
  customSubmitButton,
}: CreateInviteFormProps) {
  const form = useForm<z.infer<typeof CreateInvitationFormSchema>>({
    resolver: zodResolver(CreateInvitationFormSchema),
    defaultValues: {
      //
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateInvitationFormSchema>) => {
    console.log("here are the values of create department form ", data);
    updateInviteDeatilsHandler(data);
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
                <FormItem className="mb-5 ">
                  <FormLabel className="text-lg">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g firstname lastname"
                      {...field}
                      className="border-2 h-12 text-lg"
                    />
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
                <FormItem className="mb-5">
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g owolabitosin@gmail.com"
                      {...field}
                      className="border-2 h-12 text-lg"
                    />
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
      <FormItem className="mb-5 flex flex-col">
        <FormLabel className="text-lg">Access Granted</FormLabel>
        <FormControl>
          <select
            className="w-60 px-4 py-2 border-2 h-12 rounded-md text-gray-700"
            {...field}
          >
            <option value="" disabled>
              Select an access
            </option>
            {accesses.map((access) => (
              <option key={access} value={access}>
                {access}
              </option>
            ))}
          </select>
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
                <FormItem className="mb-5">
                  <FormLabel className="text-lg">Invitation Desciption</FormLabel>
                  <FormControl>
                    <Input placeholder="Reason(s) for invitation" {...field} className="border-2 h-12 text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          
            <Button
              type="submit"
              variant={"default"}
              className="bg-primarycol text-white w-full mt-5 rounded-full h-12"
            >
              Invite
            </Button>
        
        </form>
      </Form>
    </div>
  );
}
