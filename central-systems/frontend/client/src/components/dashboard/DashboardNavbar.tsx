"use-client";

import { CalendarDays, Contact2, Mail, MailCheck } from "lucide-react";

import Image from "next/image";

import { Dispatch, FC, SetStateAction } from "react";

import Link from "next/link";

import ButtonWithIcons from "../ButtonWithIcon";
import Sidebar from "../Sidebar";
import { usePathname } from "next/navigation";

interface DashboardNavbarProps {}

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const currentPath = usePathname();

  return (
    <div className="w-full flex flex-row-reverse justify-between items-center sticky top-0 z-40 bg-white shadow-sm">
      {/* logo */}
      <Link href={"/"}>
        <div className="">
          <Image
            src="/assets/logo.jpg"
            alt="mclev logo"
            height={70}
            width={70}
            className="object-fill opacity-100 transform scale-[0.85]"
          />
        </div>
      </Link>
      <div className="">
        <Sidebar
          side={"left"}
          childComponent={
            <div className="h-[90px] flex flex-col justify-around pt-[60px]">
              {/* <ButtonWithIcons
                icon={<Mail size={20} />}
                text={"Chats"}
                extraInfo={`${10}`}
                className={`w-full ${
                  props.dashBoardState === "chats" &&
                  "bg-accentcol hover:bg-accentcol"
                }`}
                variant={`${
                  props.dashBoardState === "chats" ? "default" : "outline"
                }`}
                clickHandler={() => {
                  props.handleDashboardState("chats");
                  console.log("chats  clicked");
                }}
              /> */}
              <Link href={"/dashboard/home"}>
                <ButtonWithIcons
                  text={"Home"}
                  className={`${
                    currentPath.includes("home")
                      ? "text-white bg-primarycol"
                      : "secondary"
                  } w-full bg hover:bg-primarycol/70 hover:text-white mb-2`}
                  variant={`${
                    currentPath.includes("Home") ? "default" : "secondary"
                  }`}
                />
              </Link>
              <Link href={"/dashboard/onboard"}>
                <ButtonWithIcons
                  text={"Onboard"}
                  className={`${
                    currentPath.includes("onboard")
                      ? "text-white bg-primarycol"
                      : "secondary"
                  } w-full bg hover:bg-primarycol/70 hover:text-white mb-2`}
                  variant={`${
                    currentPath.includes("onboard") ? "default" : "secondary"
                  }`}
                />
              </Link>

              <Link href={"/dashboard/onboard"}>
                <ButtonWithIcons
                  text={"Profiles"}
                  className={`${
                    currentPath.includes("profiles")
                      ? "text-white bg-primarycol"
                      : "secondary"
                  } w-full bg hover:bg-primarycol/70 hover:text-white mb-2`}
                  variant={`${
                    currentPath.includes("profiles") ? "default" : "secondary"
                  }`}
                />
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default DashboardNavbar;
