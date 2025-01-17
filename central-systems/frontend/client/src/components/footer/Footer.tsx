"use client"
import Link from "next/link";
import TooltipComponent from "../TooltipComponent";
import { Facebook, Mail } from "lucide-react";

export default function Footer (){

    return (
        <main>
            <footer >
      {/* top part of footer */}
      <div className="bg-primarycol px-6 py-4 text-white flex justify-center items-center w-full" >
        {/* Useful links section */}
        {/* <div className="text-secondarycol pt-8 pb-4">
          <span>Useful Links</span>
        </div> */}

        {/* Useful links */}
        {/* <div>
          {usefulLinks.map((usefulLink, index) => {
            return (
              <div
                key={usefulLink.link + index}
                className="text-white/70 flex border-b-[1px] border-secondarycol py-2 transition-all duration-300 hover:cursor-pointer  hover:text-secondarycol"
              >
                <span className="mr-2">
                  <ArrowRightIcon />
                </span>
                <Link href={usefulLink.link}>
                  <span>{usefulLink.name}</span>
                </Link>
              </div>
            );
          })}
        </div> */}

        {/* Our services section */}
        {/* <div className="text-secondarycol pt-8 pb-4">
          <span>Our Services</span>
        </div> */}

        {/* Our Services Links
        <div>
          {ourServicesLinks.map((serviceLink, index) => {
            return (
              <div
                key={serviceLink + index}
                className="text-white/75 flex border-b-[1px] border-secondarycol py-2 transition-all duration-300 hover:cursor-pointer hover:text-secondarycol"
              >
                <span className="mr-0.9">
                  <ChevronRight />
                </span>
                <span>{serviceLink}</span>
              </div>
            );
          })}
        </div> */}

        {/* address */}
        <div className="w-[96%] flex justify-center items-center flex-col">
          <div>
            <h5 className="text-secondarycol pt-8 pb-4">
              Word Sanctuary Global
            </h5>
          </div>
          <div className="">
            {/* <div className="text-textwhitecol">
              Address <br />
              {}
            </div> */}
            <div className="text-textwhitecol">
              {/* <span className="text-secondarycol">
                Phone: {companyPhoneNumber}{" "}
              </span> */}
              {/* this is the email address */}
              {/* <span className="block break-words">{companyEmail}</span> */}
            </div>

            {/* social media links and icons */}
            <div className="flex font-bolder mt-8 text-secondarycol mb-4">
              <TooltipComponent
                childComponent={
                  <Link href={""}>
                    <div className="bg-white mr-2 p-[2px] rounded-full shadow-xl flex justify-center items-center w-8 h-8  hover:cursor-pointer transition-all duration-200 hover:text-textwhitecol hover:bg-secondarycol text-primarycol">
                      <Facebook className="" size={20} />
                    </div>
                  </Link>
                }
                info="facebook"
              />

              {/* Tiktok */}
              {/* <TooltipComponent
                childComponent={
                  <Link href={tiktokPageUrl}>
                    <div className="bg-white mr-2 p-[2px] rounded-full shadow-xl flex justify-center items-center w-8 h-8 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol transform-[1.2]">
                      <FontAwesomeIcon
                        icon={faTiktok}
                        className="w-[18px] h-[18px]"
                      />
                    </div>
                  </Link>
                }
                info="tiktok"
              /> */}


              {/* EMAIL ICON */}
              <TooltipComponent
                info="email"
                childComponent={
                  <div
                    className="bg-white mr-2 p-[2px] rounded-full shadow-xl flex justify-center items-center w-8 h-8 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol text-primarycol"
                    onClick={() => {
                      window.location.href = `mailto:${''}`;
                    }}
                  >
                    <Mail className="" size={20} />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="bg-white text-black/75 text-center font-smallCustom py-4 flex flex-col justify-center items-center break-words px-2">
        <div>
          &#169; copyright {new Date().getFullYear()} |{" "}
          <span className="">www.wordsanctuaryglobal.com</span> | All
          Rights Reserved |{" "}
          <Link href={"/"} className="underline mx-2">
            Terms & Conditions{" "}
          </Link>{" "}
          |{" "}
        </div>
        <div>
          <Link href={"/"} className="underline mx-2">
            Privacy Policy
          </Link>
          |{" "}
          <Link href={"/"} className="underline mx-2">
            Cookies Policy
          </Link>
        </div>
      </div>
    </footer>
        </main>
    )
}