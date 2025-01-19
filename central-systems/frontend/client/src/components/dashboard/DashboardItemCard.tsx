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
    // <div className="">
    //   <div
    //     className={`w-full shadow-md bg-primarycol/20  text-primarycol flex flex-col rounded-md px-3 py-3 hover:scale-105 duration-500 ${styles}`}
    //   >
    //     <div className="py-2">{toptext}</div>
    //     <div className="py-2 text-sm">{bottomText}</div>
    //     <div></div>
    //   </div>
    // </div>

    <section className="rounded-lg border border-gray-200 shadow-sm p-4 bg-white max-w-xs">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-500 uppercase">
          Invitation Requests
        </h2>
        <button
          type="button"
          className="flex items-center justify-center w-6 h-6 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100"
          aria-label="Add new request"
        >
          +
        </button>
      </header>
      <div className="mt-4">
        <p className="text-4xl font-bold text-gray-900">{toptext}</p>
        <p className="text-sm font-medium text-gray-500">{bottomText}</p>
      </div>
    </section>
  );
};

export default DashboardItemCard;
