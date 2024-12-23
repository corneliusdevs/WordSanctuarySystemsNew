"use client";

interface DashboardItemCardProps {
  styles: string;
  toptext: string;
  bottomText: string;
}

const DashboardItemCard = ({
  styles,
  toptext,
  bottomText,
}: DashboardItemCardProps) => {
  return (
    <div className="">
      <div
        className={`w-full shadow-md bg-primarycol/20  text-primarycol flex flex-col rounded-md px-3 py-3 hover:scale-105 duration-500 ${styles}`}
      >
        <div className="py-2">{toptext}</div>
        <div className="py-2 text-sm">{bottomText}</div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardItemCard;
