"use client";

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

import { SetStateAction, Dispatch, useState } from "react";

import { CreateIndividualProfileSchema } from "./IndividualOnboardingFormSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectComponent from "@/components/SelectComponent";
import { Heirarchy } from "@/types/general";
import {
  leaderShipLevelSelectComponentPayload,
  lifeClassTopicsSelectComponentPayload,
} from "@/utils";

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

  const [leadershipLevel, setLeadershipLevel] = useState<string>(
    Heirarchy.MEMBER
  );

  const [lifeclass_topic, setLifeClassTopic] = useState<string>("1");

  const onSubmit = async (data: any) => {
    console.log(
      "here are the values of individualProfile onboarding form ",
      data
    );
    updateIndividualDataHandler({
      //  the fields that have a "none" value will be updated later when the profile is updated
      ...data,
      leadership_level: leadershipLevel,
      lifeclass_topic: Number(lifeclass_topic),
      lifeclass_teacher_profile_id: "none",
      mentor_profile_id: "none",
      installation_id: "none",
      departments: ["none"],
      centrals: ["none"],
    });
    isMutatingDbResourceHandler(true);
  };

  return (
    <div
      className={`${isMutatingDbResource && "pointer-events-none opacity-70"} p-4`} // Padding added
    >
      {/* Heading with extra bold and centered */}
      <h1 className="text-primarycol text-2xl font-extrabold mb-4 text-center">INDIVIDUAL DATA</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => {
              return (
                <FormItem className="mb-4"> {/* Increased margin for better spacing */}
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your surname" {...field} className="text-[16px] border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} className="text-[16px] border-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your middle name" {...field} className="text-[16px] border-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => {
              return (
                <FormItem className="mb-4">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Birthday</FormLabel>
                  <FormControl>
                    <Input placeholder="DD-MM-YYYY" {...field} className="text-[16px] border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="profile_id"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Profile No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your profile number" {...field} className="text-[16px] border-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="giving_number"
            render={({ field }) => {
              return (
                <FormItem className="mb-4">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Giving Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your giving number here" {...field} className="text-[16px] border-black" />
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
                <FormItem className="mb-4">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email here" {...field} className="text-[16px] border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Leadership Level dropdown */}
          <div className="my-4">
            <div className="font-bold text-[#3A2D4A] text-[16px">Leadership Level</div>
            <SelectComponent
              placeholder={"Select leadership level"}
              label="Leadership level"
              onValueChange={setLeadershipLevel}
              itemsToSelect={leaderShipLevelSelectComponentPayload}
            />
          </div>

          {/* Life class topic dropdown */}
          <div className="my-4">
            <div className="text-sm font-bold">Life class topic</div>
            <SelectComponent
              placeholder={"Select Lifeclass topic"}
              label="Life class topics"
              onValueChange={setLifeClassTopic}
              itemsToSelect={lifeClassTopicsSelectComponentPayload}
            />
          </div>

          <FormField
            control={form.control}
            name="lifeclass_teacher"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Lifeclass Teacher</FormLabel>
                <FormControl>
                  <Input placeholder="Enter teacher's name" {...field} className="text-[16px] border-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mentor"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Mentor</FormLabel>
                <FormControl>
                  <Input placeholder="Enter mentor's name" {...field} className="text-[16px] border-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name={"passport"}
            render={({ field: { value, onChange, ...fieldProps } }) => {
              return (
                <FormItem className="mb-4">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Passport</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      type="file"
                      {...fieldProps}
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
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
                <FormItem className="mb-4">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Signature</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      type="file"
                      {...fieldProps}
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
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
            } mt-2 bg-primarycol text-white w-full`}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
