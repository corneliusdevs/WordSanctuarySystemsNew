import React from "react";

interface AdminDashboardItemCardProps {
  styles: string;
  title: string;
  text: string;
  // imageSrc: string;
  Icon: React.ReactNode;
  progress?: number;
}

const AdminDashboardHomeCard = ({
  title,
  text,
  // imageSrc,
  Icon,
}: AdminDashboardItemCardProps) => {
  return (
    <div>
      <section className="rounded-2xl shadow-lg border p-4 bg-white max-w-full max-h-xs">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-500 uppercase pl-5">
            {title}
          </h2>
        </header>
        <div className="mt-4 flex justify-evenly">
          <h1 className="font-bold text-gray-900 text-6xl mt-5">{text}</h1>
          <div>{Icon}</div>
          {/* <div>
          <Image src={imageSrc} alt={`${title} logo`} height={50} width={50} />
        </div> */}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardHomeCard;
