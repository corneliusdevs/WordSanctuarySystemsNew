import {
  DepartmentKpiMetaData,
  DepartmentSnapShotSchema,
  Heirarchy,
  IndividualProfilesSnapshotValidator,
  LifeClassIndexType,
  membersProfileSnapshotsListSchema,
} from "../../validators/calculateKpiValidator";
import * as z from "zod";
import { countDeptMembersByLeadershipLevel } from "./getExpectedMonthlyCashFlow";
import { CENTRAL_KPI_ENDPOINT } from "../../configs/externalApis";
import { ZodError } from "zod";
import { NUMBER_OF_SECONDS_IN_A_WEEK } from "../../utils/constants";

function calculateIncreaseParameters(
  deparmentSnapshotData: z.infer<typeof DepartmentSnapShotSchema>,
  time_range_in_weeks: number
) {
  const snapshots = deparmentSnapshotData.snapshots;
  const last_dept_snapshot = snapshots[snapshots.length - 1];
  const date_of_last_dept_snapshot = last_dept_snapshot.snapShotDate;

  const time_range_for_comparison_in_mili_seconds =
    time_range_in_weeks * NUMBER_OF_SECONDS_IN_A_WEEK;

  const time_frame_upper_limit = date_of_last_dept_snapshot;
  const time_frame_lower_limit =
    date_of_last_dept_snapshot - time_range_for_comparison_in_mili_seconds;

  const membership_history_within_time_range = snapshots.filter((snapshot) => {
    return (
      time_frame_lower_limit <= snapshot.snapShotDate &&
      snapshot.snapShotDate <= time_frame_upper_limit
    );
  }); // if the snapshot date falls within the specfied limit, return it

  const current_membership =
    membership_history_within_time_range[
      membership_history_within_time_range.length - 1
    ]?.members.length;

  const last_membership =
    membership_history_within_time_range[0]?.members.length;

  const increase_factor =
    (current_membership - last_membership) / current_membership;

  const increase_parameters = {
    increase: current_membership - last_membership,
    increase_factor: increase_factor * 100,
    membership_history_within_time_range,
  };

  return increase_parameters;
}

function calculateLeadershipParameters(
  deparmentSnapShotData: z.infer<typeof DepartmentSnapShotSchema>,
  time_range_in_weeks: number
) {
  const snapshots = deparmentSnapShotData.snapshots;
  const last_dept_snapshot = snapshots[snapshots.length - 1];
  const date_of_last_dept_snapshot = last_dept_snapshot.snapShotDate;

  const time_range_for_comparison_in_mili_seconds =
    time_range_in_weeks * NUMBER_OF_SECONDS_IN_A_WEEK;

  const time_frame_upper_limit = date_of_last_dept_snapshot;
  const time_frame_lower_limit =
    date_of_last_dept_snapshot - time_range_for_comparison_in_mili_seconds;

  const membership_history_within_time_range = snapshots.filter(
    (snapshot) =>{
      console.log("from leadership parameters ", time_frame_lower_limit <= snapshot.snapShotDate &&
        snapshot.snapShotDate <= time_frame_upper_limit)
      return time_frame_lower_limit <= snapshot.snapShotDate &&
      snapshot.snapShotDate <= time_frame_upper_limit}
  ); // if the snapshot date falls within the specfied limit, return it

  // const membership_history_within_time_range =
  // deparmentSnapShotData.snapshots.filter(
  //   (snapshot) =>
  //     snapshot
  // );

  const current_leadership_strength = countDeptMembersByLeadershipLevel(
    membership_history_within_time_range[
      membership_history_within_time_range.length - 1
    ].members.map((member) => member.leaderShipLevel)
  );

  const previous_leadership_strength = countDeptMembersByLeadershipLevel(
    membership_history_within_time_range[0].members.map(
      (member) => member.leaderShipLevel
    )
  );

  // exclude the membership count
  const { member: _, ...previous_leaders } = previous_leadership_strength;

  //  exclude the membership count
  const { member: __, ...current_leaders } = current_leadership_strength;

  const leadership_strength = {
    previous_leadership_strength: {
      ...previous_leaders,
    },
    current_leadership_strength: {
      ...current_leaders,
    },
    leadership_index: {
      pastors: {
        increase: current_leaders.pastors - previous_leaders.pastors,
        increase_factor:
          current_leaders.pastors === 0
            ? null
            : ((current_leaders.pastors - previous_leaders.pastors) /
                current_leaders.pastors) *
              100,
      },
      ministers: {
        increase: current_leaders.ministers - previous_leaders.ministers,
        increase_factor:
          current_leaders.ministers === 0
            ? null
            : ((current_leaders.ministers - previous_leaders.ministers) /
                current_leaders.ministers) *
              100,
      },
      hods: {
        increase: current_leaders.hod - previous_leaders.hod,
        increase_factor:
          current_leaders.hod === 0
            ? null
            : ((current_leaders.hod - previous_leaders.hod) /
                current_leaders.hod) *
              100,
      },
      asst_hods: {
        increase: current_leaders.asst_hod - previous_leaders.asst_hod,
        increase_factor:
          current_leaders.asst_hod === 0
            ? null
            : ((current_leaders.asst_hod - previous_leaders.asst_hod) /
                current_leaders.asst_hod) *
              100,
      },
      executive_assistants: {
        increase:
          current_leaders.executive_assistant -
          previous_leaders.executive_assistant,
        increase_factor:
          current_leaders.executive_assistant === 0
            ? null
            : ((current_leaders.executive_assistant -
                previous_leaders.executive_assistant) /
                current_leaders.executive_assistant) *
              100,
      },
      workers: {
        increase: current_leaders.worker - previous_leaders.worker,
        increase_factor:
          current_leaders.worker === 0
            ? null
            : ((current_leaders.worker - previous_leaders.worker) /
                current_leaders.worker) *
              100,
      },
    },
  };

  return leadership_strength;
}

const calculateRetentionParameters = (
  deparmentSnapShots: z.infer<typeof DepartmentSnapShotSchema>,
  parameters: z.infer<typeof DepartmentKpiMetaData>
) => {
  // if meetings did not hold, do not calculate the retention parameters
  if (parameters.people_details.did_meeting_hold !== true) {
    return {
      retention_factor: -1,
      current_membership: -1,
      attendance_in_the_week: -1,
    };
  }
  // look at the length of the members array in the last snaphot of the department
  const current_membership =
    deparmentSnapShots.snapshots[deparmentSnapShots.snapshots.length - 1]
      .members.length;
  const attendance_in_the_week =
    parameters.people_details.attendance_in_the_week;
  const retention_factor = attendance_in_the_week / current_membership;

  const retention_parameters = {
    retention_factor: retention_factor * 100,
    current_membership,
    attendance_in_the_week,
  };

  return retention_parameters;
};

const calculateLifeClassIndexes = (
  membersProfileSnapShots: z.infer<
    typeof IndividualProfilesSnapshotValidator
  >[],
  time_range_in_weeks: number
) => {
  const time_duration_for_comparison_in_mili_seconds =
    time_range_in_weeks * NUMBER_OF_SECONDS_IN_A_WEEK;

  let lifeclass_indexes: LifeClassIndexType[] = [];

  console.log("life class", membersProfileSnapShots);
  // for each member in the snapshot loop over the membersprofileSnapShots and calculate the lifeclass parameters for that member before going to the next member in the snapshot
  for (let i = 0; i < membersProfileSnapShots.length; i++) {
    const profile_of_member = membersProfileSnapShots[i];
    const last_snapshot_of_member_profile =
      profile_of_member.snapshots[profile_of_member.snapshots.length - 1]; // the last snapshot is the last element in the array

    const date_of_last_profile_snapshot =
      last_snapshot_of_member_profile.snapShotDate;

    // time_frame_upper_limit is date of the last snapshot taken
    const time_frame_upper_limit = date_of_last_profile_snapshot;
    const time_frame_lower_limit =
      date_of_last_profile_snapshot -
      time_duration_for_comparison_in_mili_seconds;
    const life_class_history_within_time_range = membersProfileSnapShots[
      i
    ].snapshots.filter((snapshot) => {
      return (
        time_frame_lower_limit <= snapshot.snapShotDate &&
        snapshot.snapShotDate <= time_frame_upper_limit
      );
    }); // if the snapshot date falls within the specfied limit, return it
    const current_state =
      life_class_history_within_time_range[
        life_class_history_within_time_range.length - 1
      ];

    const previous_state = life_class_history_within_time_range[0];

    lifeclass_indexes.push({
      profile_id: current_state.profile_id,
      full_name: `${current_state.surname} ${current_state.name}`,
      previous_topic: previous_state.lifeclass_topic,
      current_topic: current_state.lifeclass_topic,
      growth_index:
        current_state.lifeclass_topic - previous_state.lifeclass_topic,
      time_frame_lower_limit,
      time_frame_upper_limit,
    });
  }

  console.log(`lifeclass indexes are  `, lifeclass_indexes);

  return lifeclass_indexes;
};

const calculateLifeClassIncrease = async (
  deparmentSnapShots: z.infer<typeof DepartmentSnapShotSchema>,
  time_range_in_weeks: number,
  filteredProfileIds: string[]
) => {
  try {
    //  get the individual profiles of all members of the department below the HOD level because, the HODS until they are ministers are not able to take life classes

    // get the individualProfilesSnapshot
    const individualProfilesSnapshot = await fetch(
      `${CENTRAL_KPI_ENDPOINT}/individuals/snapshots/byProfileIds/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile_ids: filteredProfileIds }),
      }
    )
      .then((result) => {
        return result.json();
      })
      .catch((err) => {
        console.error(
          "error fetching individualProfilesSnapshot from calculate department snapShot ",
          err
        );
        throw new Error(`Error fetching individualProfilesSnapshot snapshot`);
      });

    console.log(`individual snapshots `, individualProfilesSnapshot);

    // parse the snapshot before going further
    const parsedMembersSnapshots = membersProfileSnapshotsListSchema.parse(
      individualProfilesSnapshot?.individualProfilesSnapshots
    );

    console.log(`parsed snapshots `, parsedMembersSnapshots);

    const lifeclass_indexes = calculateLifeClassIndexes(
      parsedMembersSnapshots,
      time_range_in_weeks
    );

    return {
      lifeclass_indexes,
    };
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(`zod validation error `, err.errors);
      return {
        lifeclass_indexes: [],
      };
    }
    console.log(`calculateLifeClassIncrease encountered an error `, err);
    return {
      lifeclass_indexes: [],
    };
  }
};

const calculateLifeClassParameters = async (
  deparmentSnapShots: z.infer<typeof DepartmentSnapShotSchema>,
  parameters: z.infer<typeof DepartmentKpiMetaData>
) => {
  // look at the length of the members array in the last snaphot of the department
  const snapshot =
    deparmentSnapShots.snapshots[deparmentSnapShots.snapshots.length - 1];

  const members_excluding_hod_upwards_list = snapshot.members.filter((member) =>
    [
      Heirarchy.ASSISTANT_HOD,
      Heirarchy.EXECUTIVE_ASSISTANT,
      Heirarchy.WORKER,
      Heirarchy.MEMBER,
    ].includes(member.leaderShipLevel)
  );

  const number_that_took_life_class =
    parameters.people_details.number_that_took_life_class_in_week;

  const lifeclass_factor =
    number_that_took_life_class / members_excluding_hod_upwards_list.length;

  const lifeclass_increase = await calculateLifeClassIncrease(
    deparmentSnapShots,
    parameters.time_range_in_weeks,
    members_excluding_hod_upwards_list.map((member) => member.profile_id)
  );

  return {
    lifeclass_factor: lifeclass_factor * 100, // express in percentage
    ...lifeclass_increase,
  };
};

export const getPeopleScoreService = async (
  parameters: z.infer<typeof DepartmentKpiMetaData>,
  deparmentSnapShots: z.infer<typeof DepartmentSnapShotSchema>
) => {
  const time_range_in_weeks = parameters.time_range_in_weeks;

  console.log("list of dept snapshots ", deparmentSnapShots);
  // calculate membership increase parameters
  const increase_parameters = calculateIncreaseParameters(
    deparmentSnapShots,
    time_range_in_weeks
  );

  // calculate leadership parameters
  const leadership_parameters = calculateLeadershipParameters(
    deparmentSnapShots,
    time_range_in_weeks
  );

  // calculate retention parameters
  const retention_parameters = calculateRetentionParameters(
    deparmentSnapShots,
    parameters
  );

  // calculate lifeclass parameters
  const life_class_parameters = await calculateLifeClassParameters(
    deparmentSnapShots,
    parameters
  );
  return {
    increase_parameters,
    leadership_parameters,
    retention_parameters,
    life_class_parameters,
  };
};
