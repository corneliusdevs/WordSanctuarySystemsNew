"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Dispatch, SetStateAction } from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface InputOTPFormProps {
  isProcessingInputHandler: Dispatch<SetStateAction<boolean>>;
  isProcessingInput: boolean;
  updateOTPStateHandler: Dispatch<SetStateAction<string>>;

  customSubmitButton?: React.ReactNode;
}

export function InputOTPForm({
  isProcessingInputHandler,
  updateOTPStateHandler,
  customSubmitButton,
}: InputOTPFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });


  function onSubmit(data: z.infer<typeof FormSchema>) {
    isProcessingInputHandler(true);
    updateOTPStateHandler(data.pin);
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-center w-full flex justify-center">
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full flex justify-evenly my-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="flex justify-center">
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {customSubmitButton ? (
            customSubmitButton
          ) : (
            <Button
              type="submit"
              className="w-full bg-primarycol text-white mt-3"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
