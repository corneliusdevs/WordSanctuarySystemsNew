import DashboardItemCard from "./DashboardItemCard";

const DashboardHomeComponent = () => {
  return (
    <div className="mt-4">
      <div className="w-full justify-center items-center flex">
        <span className="text-primarycol text-center text-2xl">Home</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-3">
          <DashboardItemCard
            toptext="Invitations"
            bottomText="25 invitations sents"
            styles=""
          />
          <DashboardItemCard
            toptext="Access Requests"
            bottomText="10 new requests"
            styles=""
          />
          <DashboardItemCard
            toptext="Invitations"
            bottomText="10 new requests"
            styles={""}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeComponent;
