/* eslint-disable @next/next/no-img-element */
import { Montserrat_Alternates } from "next/font/google";

const montAlternates = Montserrat_Alternates({
  weight: ["600"],
  subsets: ["latin"],
});

export default function Introduction() {
  return (
    <div className="scroll-section introduction-page w-screen p-10 md:p-20">
      <div className="scroll-section-content flex flex-col justify-between h-full">
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start md:pt-10 h-full">
          <div className="flex flex-col items-center justify-center md:items-end md:flex-row md:gap-10 md:pl-10 text-stone-300">
            <div
              className={`font-bold text-[100px] md:text-[130px] m-0 p-0  ${montAlternates.className}`}
            >
              Aga.
            </div>
            <div className="hidden md:block text-[130px]">|</div>

            <div className="flex flex-col flex-wrap items-start md:pb-12 text-lg md:text-2xl">
              <p>FrontEnd/FullStack Developer</p>
              <p>UX/UI Designer.</p>
            </div>
          </div>
        </div>

        <div className="scroll-indicator flex flex-col mb-20 md:mb-0 md:flex-row items-center md:items-end justify-center md:justify-end gap-4 md:gap-10">
          <div className=" text-stone-600 text-sm md:text-base">
            scroll to see more
          </div>
          <div className="flex flex-col items-end justify-end">
            <img
              draggable={false}
              src={"arrow-down.svg"}
              className="scroll-arrow arrow-top"
              alt="arrow"
              width={20}
              height={20}
            />
            <img
              draggable={false}
              src={"arrow-down.svg"}
              className="scroll-arrow arrow-middle"
              alt="arrow"
              width={20}
              height={20}
            />
            <img
              draggable={false}
              src={"arrow-down.svg"}
              className="scroll-arrow arrow-bottom"
              alt="arrow"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
