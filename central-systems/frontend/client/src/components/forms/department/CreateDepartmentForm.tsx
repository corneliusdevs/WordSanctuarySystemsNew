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
import { CreateDepartmetalProfileSchema, DepartmentMemberArrayValidator, OtherCreateDepartmentValidators, ValidateCreateDepartmetalProfileSchema } from "./CreateDepartmentFormSchema";

import { AddDepartmentMemberComponent } from "@/components/AddDepartmentMemberComponent";
import { SelectInstallationComponent } from "@/components/SelectInstallationComponent";
import { SelectDepartmentTypeComponent } from "@/components/SelectDepartmentType";
import { useAddDepartmentMemberStore } from "@/providers/AddDeptMemberProvider";
import { useAddMemberStore } from "@/providers/AddMembersStoreProvider";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface CreateDepartmentFormProps {
  isMutatingDbResourceHandler: Dispatch<SetStateAction<boolean>>;
  isMutatingDbResource: boolean;
  updateDepartmentDetailsHandler: Dispatch<SetStateAction<z.infer<typeof ValidateCreateDepartmetalProfileSchema> | null>>;
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

  const { currentlySelectedDeptTypeId, selectedDepartmentMembers } = useAddDepartmentMemberStore((state) => state.addMemberToDepartmentState);
  const { currentlySelectedInstallationId } = useAddMemberStore((state) => state.addMemberToinstallationState);

  const onSubmit = async (data: z.infer<typeof CreateDepartmetalProfileSchema>) => {
    try {
      const validatedExtraInputs = OtherCreateDepartmentValidators.parse({
        members: selectedDepartmentMembers,
        installation_id: currentlySelectedInstallationId,
        department_type_id: currentlySelectedDeptTypeId
      });

      const { pastors_dues, ministers_dues, hods_dues, asst_hods_dues, executive_assistants_dues, workers_dues, members_dues, ...restFields } = data;

      // reorganize the submitted data
      const submittedData = {
        ...restFields,
        members: validatedExtraInputs.members,
        finance_id: "none" + data.department_name,
        installation_id: currentlySelectedInstallationId,
        department_type: currentlySelectedDeptTypeId,
        centrals: [],
        dues_paid_per_individual: {
          pastors: pastors_dues,
          ministers: ministers_dues,
          hod: hods_dues,
          asst_hod: asst_hods_dues,
          executive_assistant: executive_assistants_dues,
          worker: workers_dues,
          member: members_dues,
        },
      };

      console.log("here are the values of create department form ", submittedData);

      updateDepartmentDetailsHandler({
        ...submittedData
      });

      isMutatingDbResourceHandler(true);
    } catch (err) {
      console.log("Error from department members form ", err);
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
    <div className={`${isMutatingDbResource && "pointer-events-none opacity-70"}`} style={{ padding: '0 20px' }}>
      {/* Heading */}
      <h2 className="text-primarycol text-2xl font-extrabold mb-4 text-center">
        DEPARTMENT DATA
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="department_name"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Department name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="Enter name"
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Description</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="Enter description"
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
            name="central"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  {/* Label */}
                  <FormLabel className="block text-[#3A2D4A] text-[16px] capitalize font-bold mb-2">
                    Central
                  </FormLabel>

                  {/* Dropdown */}
                  <FormControl>
                    <select
                      className="w-full text-[16px] border border-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="MPCD-ML">MPCD-ML</option>
                      <option value="Airspace">Airspace</option>
                      <option value="Evangelism">Evangelism</option>
                    </select>
                  </FormControl>

                  {/* Message */}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

           <FormField
            control={form.control}
            name="central_id"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Central ID</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="Enter central ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* <div className="my-4">
            <div className="text-[#3A2D4A] text-[16px] capitalize font-bold">Central</div>
            <SelectInstallationComponent />
          </div> */}

          <div className="flex justify-center items-center text-xl">
            <span>Dues</span>
          </div>

          <FormField
            control={form.control}
            name="pastors_dues"
            render={({ field }) => {
              return (
                <FormItem className="mb-2">
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Amount paid by Pastors</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value === "" ? e.target.value : Number(e.target.value)
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Amount paid by Ministers</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value === "" ? e.target.value : Number(e.target.value)
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Amount paid by HODs</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value === "" ? e.target.value : Number(e.target.value)
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Amount paid by Asst HODs</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value === "" ? e.target.value : Number(e.target.value)
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Amount paid by Executive Assistants</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value === "" ? e.target.value : Number(e.target.value)
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Amount paid by Workers</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value === "" ? e.target.value : Number(e.target.value)
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
                  <FormLabel className="text-[#3A2D4A] text-[16px] capitalize font-bold">Amount paid by Members</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[16px] border-black"
                      placeholder="enter amount paid as dues"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value === "" ? e.target.value : Number(e.target.value)
                        );
                      }}
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

          {/* ADD MEMBER COMPONENT */}
          <AddDepartmentMemberComponent />

          {/* Submit Button */}
          <Button
            type="submit"
            variant={"default"}
            className="bg-primarycol text-white w-full mt-2"
          >
            Enter
          </Button>
        </form>
      </Form>
    </div>
  );
}
