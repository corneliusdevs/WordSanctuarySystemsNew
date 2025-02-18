import IndividualsWrapperList from "@/components/dashboard/tables/IndividualsListWrapper";

function IndividualsProfiles() {
  return (
    <div className="mt-4">
      <div className="w-full justify-center items-center flex">
        <span className="text-primarycol text-center text-2xl">
          Individuals
        </span>
      </div>

      <IndividualsWrapperList />
    </div>
  );
}

export default IndividualsProfiles;
