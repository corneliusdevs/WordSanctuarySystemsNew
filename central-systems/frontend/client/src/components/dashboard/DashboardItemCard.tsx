"use client";

interface DashboardItemCardProps {
  styles?: string;
  title: string;
  toptext: string;
  bottomText: string;
  // imageSrc: string;
  Icon?: React.ReactNode;
  progress?: number;
}

const DashboardItemCard = ({
  title,
  toptext,
  bottomText,
  // imageSrc,
  Icon,
  progress,
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

    <section className="rounded-2xl shadow-lg border p-4 bg-white max-w-full max-h-xs">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-500 uppercase">{title}</h2>
        <div>{Icon && Icon}</div>
      </header>
      <div className="mt-2 flex justify-between">
        <h1 className="font-bold text-gray-900 text-8xl">{toptext}</h1>
        <p className="text-xl font-medium p-5 mt-2">{bottomText}</p>
      </div>
      <div>
        {progress !== undefined && (
          <div className="mt-4">
            <div className="relative h-5 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-[#392C49] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-1 text-lg font-semibold">RESPOSE RATE</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardItemCard;
