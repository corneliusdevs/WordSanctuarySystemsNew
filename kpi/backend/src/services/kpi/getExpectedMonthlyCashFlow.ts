import {
  DepartmentSnapShotSchema,
  Heirarchy,
} from "../../validators/calculateKpiValidator";

export function countDeptMembersByLeadershipLevel(members: Heirarchy[]) {
  return {
    pastors: members.filter(
      (leaderShipLevel) => leaderShipLevel === Heirarchy.PASTOR
    ).length,
    ministers: members.filter(
      (leaderShipLevel) => leaderShipLevel === Heirarchy.MINISTER
    ).length,
    hod: members.filter((leaderShipLevel) => leaderShipLevel === Heirarchy.HOD)
      .length,
    asst_hod: members.filter(
      (leaderShipLevel) => leaderShipLevel === Heirarchy.ASSISTANT_HOD
    ).length,
    executive_assistant: members.filter(
      (leaderShipLevel) => leaderShipLevel === Heirarchy.EXECUTIVE_ASSISTANT
    ).length,
    worker: members.filter(
      (leaderShipLevel) => leaderShipLevel === Heirarchy.WORKER
    ).length,
    member: members.filter(
      (leaderShipLevel) => leaderShipLevel === Heirarchy.MEMBER
    ).length,
  };
}

export function getExpectedCashFlowFromDepartment(
  departmentSnapShot: Zod.infer<typeof DepartmentSnapShotSchema>
) {

  {/*
    THIS FUNCTION RETURNS THE (Amount of dues paid by each rank of leadsership * number of persons in that rank) starting from member -> worker -> executive_assistant -----> Pastors 
    */}
    
  let expectedCashFlow = 0;
  let currentSnapshot =
    departmentSnapShot.snapshots[departmentSnapShot.snapshots.length - 1];
  let dues_paid_per_individual = currentSnapshot.dues_paid_per_individual; // use a negative index for the last snapshot in the array

  const membersByLeadershipLevelCount = countDeptMembersByLeadershipLevel(
    currentSnapshot.members.map((member) => member.leaderShipLevel)
  );

  
  // Multiply the the amount of dues payed by the rank of leadership by the number of leaders in that rank to get the expected amount of dues to be payed
  for (let leaderShipLevel of Object.keys(dues_paid_per_individual)) {

    switch (leaderShipLevel) {
      case "pastors":
        expectedCashFlow +=
          Number(dues_paid_per_individual[leaderShipLevel]) *
          membersByLeadershipLevelCount.pastors; // example, if the amount payed by pastors as dues is 2000, if there are 10 pastors in the department, then the expected amount of dues from the pastorate is 2000 * 10(number of pastors in the department)
        break;
      case "ministers":
        expectedCashFlow +=
          Number(dues_paid_per_individual[leaderShipLevel]) *
          membersByLeadershipLevelCount.ministers;
        break;
      case "hod":
        expectedCashFlow +=
          Number(dues_paid_per_individual[leaderShipLevel]) *
          membersByLeadershipLevelCount.hod;
        break;
      case "asst_hod":
        expectedCashFlow +=
          Number(dues_paid_per_individual[leaderShipLevel]) *
          membersByLeadershipLevelCount.asst_hod;
        break;
      case "executive_assistant":
        expectedCashFlow +=
          Number(dues_paid_per_individual[leaderShipLevel]) *
          membersByLeadershipLevelCount.executive_assistant;
        break;
      case "worker":
        expectedCashFlow +=
          Number(dues_paid_per_individual[leaderShipLevel]) *
          membersByLeadershipLevelCount.worker;
        break;
      case "member":
        expectedCashFlow +=
          Number(dues_paid_per_individual[leaderShipLevel]) *
          membersByLeadershipLevelCount.member;
        break;
    }
  }

  console.log("calculation of expected cash flow result ", expectedCashFlow);

  return expectedCashFlow ;
}
