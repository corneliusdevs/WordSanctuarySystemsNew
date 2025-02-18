import { TCreateDepartmentalProfile } from "@/components/forms/department/CreateDepartmentFormSchema";
import { TIndividualProfile } from "@/components/forms/individuals/IndividualOnboardingFormSchema";
import { TCreateInstallationProfile } from "@/components/forms/installations/InstallationOnBoardingFormSchema";
import { SelectWithSearchOptionType } from "@/components/SelectSearchComponent";
import { DepartmentType, Heirarchy } from "@/types/general";

export function removeItemFromList(item: string, itemsList: string[]) {
  const index = itemsList.indexOf(item);
  const itemsListCopy = [...itemsList];
  if (index !== -1) {
    console.log("splicing the item ", index);
    itemsListCopy.splice(index, 1);
  }

  console.log(item, itemsList, itemsListCopy, index);

  return itemsListCopy;
}

export function updateItemsListHandler(
  item: string,
  itemsList: string[]
): string[] {
  console.log("items in list handler ", item, itemsList);
  if (!itemsList.includes(item) && item.length !== 0) {
    itemsList.push(item);
  }
  console.log("returned list ", itemsList);
  return itemsList;
}

export enum FormattedLeadershipLevelNames {
  PASTOR = "Pastor",
  MINISTER = "Min",
  HOD = "Hod",
  ASSISTANT_HOD = "Asst_Hod",
  EXECUTIVE_ASSISTANT = "Exec_Asst",
  WORKER = "Worker",
  MEMBER = "Member",
}

const leaderShipLevelLookup = new Map([
  [Heirarchy.PASTOR, FormattedLeadershipLevelNames.PASTOR],
  [Heirarchy.MINISTER, FormattedLeadershipLevelNames.MINISTER],
  [Heirarchy.HOD, FormattedLeadershipLevelNames.HOD],
  [Heirarchy.ASSISTANT_HOD, FormattedLeadershipLevelNames.ASSISTANT_HOD],
  [
    Heirarchy.EXECUTIVE_ASSISTANT,
    FormattedLeadershipLevelNames.EXECUTIVE_ASSISTANT,
  ],
  [Heirarchy.WORKER, FormattedLeadershipLevelNames.WORKER],
  [Heirarchy.MEMBER, FormattedLeadershipLevelNames.MEMBER],
]);

const leaderShipLevelLookupReverse = new Map([
  [FormattedLeadershipLevelNames.PASTOR, Heirarchy.PASTOR],
  [FormattedLeadershipLevelNames.MINISTER, Heirarchy.MINISTER],
  [FormattedLeadershipLevelNames.HOD, Heirarchy.HOD],
  [FormattedLeadershipLevelNames.ASSISTANT_HOD, Heirarchy.ASSISTANT_HOD],
  [
    FormattedLeadershipLevelNames.EXECUTIVE_ASSISTANT,
    Heirarchy.EXECUTIVE_ASSISTANT,
  ],
  [FormattedLeadershipLevelNames.WORKER, Heirarchy.WORKER],
  [FormattedLeadershipLevelNames.MEMBER, Heirarchy.MEMBER],
]);

export function extractLeadershipLevelFromProfileId(str: string) {
  // @ts-expect-error this works but typescript complains
  const leadership_level: FormattedLeadershipLevelNames = str.split(" ")[0];

  return leaderShipLevelLookupReverse.get(leadership_level);
}

function formatName(name: string) {
  const formattedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return formattedName;
}

export function extractAddMembersMultiSelectComponentOptions(
  allIndividuals: TIndividualProfile[]
): SelectWithSearchOptionType[] {
  console.log("all individuals from extract select options ", allIndividuals);
  const extractedData = allIndividuals.map((individual) => {
    const value = `${leaderShipLevelLookup.get(
      individual.leadership_level
    )} ${formatName(individual.name)} ${formatName(
      individual.surname
    )} profileId ${individual.profile_id}`;

    const label = `${leaderShipLevelLookup.get(
      individual.leadership_level
    )} ${formatName(individual.name)} ${formatName(individual.surname)}`;

    return {
      value,
      label,
    };
  });

  console.log("extracted data ", extractedData);
  return extractedData;
}

export function extractIndividualNameAndLeadership(
  details: TIndividualProfile
) {
  return `${leaderShipLevelLookup.get(details.leadership_level)} ${formatName(
    details.name
  )} ${formatName(details.surname)}`;
}

export function extractInstallationsSelectOptions(
  allInstallations: TCreateInstallationProfile[]
): SelectWithSearchOptionType[] {
  console.log("all individuals from extract select options ", allInstallations);
  const extractedData = allInstallations.map((installation) => {
    const label = `${installation.name}`;

    const value = `${installation.name} ${installation.installation_id}`;

    return {
      value,
      label,
    };
  });

  console.log("extracted installations data ", extractedData);
  return extractedData;
}

export function extractDepartmentSelectOptions(
  allDepartments: TCreateDepartmentalProfile[]
): SelectWithSearchOptionType[] {
  console.log("all departments from extract select options ", allDepartments);
  const extractedData = allDepartments.map((department) => {
    const label = `${department.department_name}`;

    const value = `${department.department_name} ${department.department_type} ${department.department_id}`;

    return {
      value,
      label,
    };
  });

  console.log("extracted departments data ", extractedData);
  return extractedData;
}

export function extractDeptTypeSelectOptions(
  allDepartmentTypes: DepartmentType[]
): SelectWithSearchOptionType[] {
  console.log(
    "all departmentTypes from extract select options ",
    allDepartmentTypes
  );
  const extractedData = allDepartmentTypes.map((departmentType) => {
    const label = `${departmentType.department_class_name}`;

    const value = `${departmentType.department_class_name} ${departmentType.department_class_id}`;

    return {
      value,
      label,
    };
  });

  console.log("extracted departmentType data ", extractedData);
  return extractedData;
}

export function extractDeptTypeIdFromDeptTypeSelectOption(option: string) {
  const elements = option.split(" ");
  return elements[elements.length - 1];
}

export function extractInstallationIdFromInstallationSelectOption(
  option: string
) {
  const elements = option.split(" ");
  return elements[elements.length - 1];
}

export function extractdepartmentIdFromDepartmentSelectOptions(option: string) {
  const elements = option.split(" ");
  return elements[elements.length - 1];
}

export function extractDepartmentName(inputString: string): string {
  // Split the string into words by space and take all but the last part
  const parts = inputString.split(" ");

  // Join the name parts (everything except the last one) back into a string
  parts.pop(); // Remove the last part (the ID)
  parts.pop(); // Remove the last part (the department_type)

  return parts.join(" "); // Join the remaining parts as the name
}

export function extractDepartmentTypeId(inputString: string): string {
  // Split the string into words by space and take all but the last part
  const parts = inputString.split(" ");

  return parts[parts.length - 2]; // Join the remaining parts as the name
}
