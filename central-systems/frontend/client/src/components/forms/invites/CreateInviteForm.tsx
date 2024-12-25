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
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g owolabitosin@gmail.com"
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
                  <FormLabel>Invitation Desciption</FormLabel>
                  <FormControl>
                    <Input placeholder="Reason(s) for invitation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {customSubmitButton ? (
            customSubmitButton
          ) : (
            <Button
              type="submit"
              variant={"default"}
              className="bg-primarycol text-white w-full mt-2"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
