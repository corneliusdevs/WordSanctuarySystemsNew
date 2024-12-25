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
import { CreateInstallationProfileSchema } from "./InstallationOnBoardingFormSchema";

  
  interface CreateInstallationFormProps {
    isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
    isMutatingDbResource: boolean;
    updateInstallationDetailsHandler: Dispatch<
      SetStateAction<z.infer<typeof CreateInstallationProfileSchema> | null>
    >;
  }
  
  export function CreateInstallationForm({
    isMutatingDbResource,
    isMutatingDbResourceHandler,
    updateInstallationDetailsHandler,
  }: CreateInstallationFormProps) {
    const form = useForm<z.infer<typeof CreateInstallationProfileSchema>>({
      resolver: zodResolver(CreateInstallationProfileSchema),
      defaultValues: {
        //
      },
    });
  
    const onSubmit = async (
      data: z.infer<typeof CreateInstallationProfileSchema>
    ) => {
      console.log("here are the values of create department form ", data);
      updateInstallationDetailsHandler(data);
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
                    <FormLabel>Installation name </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g  COHS" {...field} />
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
                    <FormLabel>Finance ID</FormLabel>
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
  