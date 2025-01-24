"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z, ZodError } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SetStateAction, Dispatch } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { CreateInstallationProfileSchema, ValidateCreateInstallationProfileSchema } from "./InstallationOnBoardingFormSchema";
import { AddMemberComponent } from "@/components/AddMemberComponent";
import { useAddMemberStore } from "@/providers/AddMembersStoreProvider";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";

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

  const { selectedInstallationMembers } = useAddMemberStore(state => state.addMemberToinstallationState)

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

    try {
      const submittedData = {
        ...data,
        finance_id: "none" + Date.now(),
        members: selectedInstallationMembers
      }

      // validate the data to detect errors
      const validatedData = ValidateCreateInstallationProfileSchema.parse(submittedData)

      updateInstallationDetailsHandler({
        ...validatedData
      });
      isMutatingDbResourceHandler(true);

    } catch (err) {
      console.log("Error onboard installation department form ", err);
      if (err instanceof ZodError) {
        toast({
          title: "Invalid Inputs",
          description: (
            <div className="mt-2 w-full flex justify-center items-center">
              <span className="text-red-500 mr-2">
                <X />
              </span>
              <span>{err.errors[0].message}</span>
            </div>
          ),
        });
      } else {
        toast({
          title: "Invalid Inputs",
          description: (
            <div className="mt-2 w-full flex justify-center items-center">
              <span className="text-red-500 mr-2">
                <X />
              </span>
              <span>Please make sure all data is correctly entered</span>
            </div>
          ),
        });

      }
    }
  };

  return (
    <div
      className={`${isMutatingDbResource && "pointer-events-none opacity-70"}`}
    >
      {/* New Heading */}
      <h1 className="text-primarycol text-2xl font-extrabold mb-4 text-center">
        INSTALLATION DATA
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  {/* Updated FormLabel Style */}
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">
                    Name of Installation
                  </FormLabel>
                  <FormControl>
                    {/* Updated Input Style */}
                    <Input
                      placeholder="Name of Installation"
                      className="text-[16px] border border-black"
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Installation ID</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="Enter installation ID"
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Finance ID</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="Enter finance ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex justify-center items-center text-xl my-3">
            <span>Members</span>
          </div>

          <AddMemberComponent />
          {
            selectedInstallationMembers.length === 0 ? (
              <Button
                type="button"
                variant={"default"}
                className="bg-primarycol text-white w-full mt-2"
                onClick={() => {
                  toast({
                    title: "No Members selected",
                    description: (
                      <div className="mt-2 w-full flex justify-center items-center">
                        <span className="text-red-500 mr-2">
                          <X />
                        </span>
                        <span>Please select members to add to installation.</span>
                      </div>
                    ),
                  })
                }}
              >
                Enter
              </Button>
            ) : (
              <Button
                type="submit"
                variant={"default"}
                className="bg-primarycol text-white w-full mt-2"
              >
                Enter
              </Button>
            )
          }
        </form>
      </Form>
    </div>
  );
}

