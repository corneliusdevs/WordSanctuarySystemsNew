import { ChevronRight } from "lucide-react";
import Image from "next/image";

function Dashboard() {
  return (
    <div>
      <div className="w-full justify-center flex flex-col items-center">
        <div className="w-full h-[70vh] overflow-hidden">
          <Image
            src="/assets/hero1.jpg"
            alt="background image"
            height={400}
            width={500}
            className="w-full h-full"
          />
        </div>
        <div className="bg-gradient-to-b from-primarycol to-[rgb(53,46,107)] h-[50vh] flex justify-center ">
          <div className="w-fit flex flex-wrap jusify-center mx-auto items-center gap-5 max-w-[70%]">
            <div className="p-2 flex flex-1 justify-between bg-white rounded-lg h-fit min-w-[400px]">
              <div className="w-5 h-5">
                <Image
                  src="/assets/starIcon.svg"
                  alt="background image"
                  height={50}
                  width={50}
                  className="w-full h-full"
                />
              </div>
              <div>Individual</div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="p-2 flex flex-1 justify-between bg-white rounded-lg h-fit min-w-[400px]">
              <div className="w-5 h-5">
                <Image
                  src="/assets/starIcon.svg"
                  alt="background image"
                  height={50}
                  width={50}
                  className="w-full h-full"
                />
              </div>
              <div>Individual</div>
              <div>
                <ChevronRight />
              </div>
            </div>

            <div className="p-2 flex flex-1 justify-between bg-white rounded-lg h-fit min-w-[400px]">
              <div className="w-5 h-5">
                <Image
                  src="/assets/starIcon.svg"
                  alt="background image"
                  height={50}
                  width={50}
                  className="w-full h-full"
                />
              </div>
              <div>Individual</div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="p-2 flex flex-1 justify-between bg-white rounded-lg h-fit min-w-[400px]">
              <div className="w-5 h-5">
                <Image
                  src="/assets/starIcon.svg"
                  alt="background image"
                  height={50}
                  width={50}
                  className="w-full h-full"
                />
              </div>
              <div>Individual</div>
              <div>
                <ChevronRight />
              </div>
            </div>
            <div className="p-2 flex flex-1 justify-between bg-white rounded-lg h-fit min-w-[400px] max-w-[400px]">
              <div className="w-5 h-5">
                <Image
                  src="/assets/starIcon.svg"
                  alt="background image"
                  height={50}
                  width={50}
                  className="w-full h-full"
                />
              </div>
              <div>Individual</div>
              <div>
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
