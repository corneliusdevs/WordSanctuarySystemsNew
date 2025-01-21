// Import necessary dependencies
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
import { Input } from "../Input";
import { LoginFormSchema } from "./LoginSchema";
import { Button } from "../ui/button";

interface LoginFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateEmailStateHandler: Dispatch<SetStateAction<string>>;
}

export function LoginForm({
  isMutatingDbResource,
  isMutatingDbResourceHandler,
  updateEmailStateHandler,
}: LoginFormProps) {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: z.infer<typeof LoginFormSchema>) => {
    console.log("here are the values of email form ", email);
    updateEmailStateHandler(email);
    isMutatingDbResourceHandler(true);
  };

  return (
    <div className={`${isMutatingDbResource && "pointer-events-none opacity-70"}`}>
      <Form {...form}>
        <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="mb-8">
                    <FormLabel className="text-base">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
              Sign In
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}
