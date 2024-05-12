/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import { useState } from "react";

export default function ProjectsPage() {
  const [image, setImage] = useState("pet-health-app");
  const [tabId, setTabId] = useState("pet-health-app");
  const [visibleTabId, setVisibleTabId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const tabs = [
    {
      id: "pet-health-app",
      title: "PetHealthApp",
      content:
        "A web application for pet owners to track their pets' health and medical history. The app allows users to create profiles for their pets, log their medical appointments, and set reminders for upcoming vaccinations. I developed the app using React for the front-end and Firebase for the back-end and real-time data synchronization.",
      github: "https://github.com/agaef5/pet-health-app",
      livewebsite: "https://gogreen-9326c.web.app/",
    },
    {
      id: "brain-dump",
      title: "Brain Dump",
      content:
        "I worked with a three-person team of UX/UI designers and we developed BrainDump, a journaling web application for creative minds. As the sole coder, I implemented the solution using React for a responsive UI and Firebase for real-time database functionality and user authentication. This project underscores my proficiency in React and showcases my ability to swiftly deliver a feature-rich, collaborative web app with a focus on user experience and technical precision. This project took us over four weeks to complete, including research, design and coding. This project is desktop-view only. ",
      github: "https://github.com/agaef5/creative-diary-webapp",
      livewebsite: "https://creative-journal.furgalska.com/",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      content:
        "This portfolio was created using Next.js, TailwindCSS, and GSAP. It showcases my skills as a front-end developer and UX/UI designer. The site features a horizontal scroll effect and a responsive design that adapts to different screen sizes. The site is optimized for performance and accessibility, with a focus on user experience and visual appeal",
      github: "https://github.com/agaef5/portfolio",
      livewebsite: "",
    },
  ];

  const renderTabs = () => {
    const renderedTabs = [];

    for (let i = 0; i < tabs.length; i++) {
      renderedTabs.push(
        <div
          key={tabs[i].id}
          id={tabs[i].id}
          className={`tab h-fit w-[90vw] max-h-[30vh] md:max-h-min md:h-min md:w-full md:max-w-[500px] ${
            visibleTabId != tabs[i].id && isVisible
              ? "invisible py-2"
              : "visible py-5"
          }`}
          onClick={toggleTab}
        >
          <div
            className={`tab-title py-2 md:py-5 flex flex-row items-center justify-between hover:cursor-pointer`}
          >
            <div className="font-bold text-lg md:text-2xl">{tabs[i].title}</div>

            <img
              src={"/arrow-down.svg"}
              alt="arrow"
              className={
                "tab-arrow hover:cursor-pointer" +
                (visibleTabId === tabs[i].id ? "rotate-180" : "")
              }
              width={20}
              height={20}
            />
          </div>
          <div
            className={`tab-content w-full h-fit text-sm text-justify text-stone-400 ${
              visibleTabId === tabs[i].id ? "visible" : "invisible"
            }`}
          >
            {tabs[i].content}
            <div className="flex flex-row py-4 gap-4 items-center w-full">
              <a
                className={`flex flex-row gap-2 ${
                  tabs[i].github === "" ? "hidden" : ""
                }`}
                href={tabs[i].github}
              >
                <img
                  src={`/github.svg`}
                  alt="github icon"
                  width={20}
                  height={20}
                />
                <p className="text-stone-300">Github</p>
                <img
                  src={`/arrow-up-square.svg`}
                  alt="link"
                  width={10}
                  height={10}
                />
              </a>
              <div>|</div>
              <a
                className={`flex flex-row gap-2 ${
                  tabs[i].livewebsite === "" ? "hidden" : ""
                }`}
                href={tabs[i].livewebsite}
              >
                <img
                  src={`/laptop.svg`}
                  alt="lapop icon"
                  width={20}
                  height={20}
                />
                <p className="text-stone-300">Live solution</p>
                <img
                  src={`/arrow-up-square.svg`}
                  alt="link"
                  width={10}
                  height={10}
                />
              </a>
            </div>
          </div>
        </div>
      );

      if (i + 1 < tabs.length) {
        renderedTabs.push(
          <hr
            key={tabs[i].id + "-hr"}
            className={`divider w-[90vw] md:max-w-[500px] border-b border-stone-500 ${
              isVisible ? "hidden" : " block"
            }`}
          />
        );
      }
    }
    return renderedTabs;
  };

  function toggleTab(event) {
    const tab = event.target.closest(".tab");
    setTabId(tab.id);

    // setTimeout(() => {
    const tabContent = tab.querySelector(".tab-content");
    if (!tabContent.classList.contains("visible")) {
      setImage(tab.id);
      setVisibleTabId(tab.id);
      setIsVisible(true);
    } else {
      setVisibleTabId(null);
      setIsVisible(false);
    }
    ("");
    // }, 500);
  }

  return (
    <div className="scroll-section projects-page h-screen w-screen p-5 md:p-20">
      <div className="scroll-section-content justify-center items-center flex flex-col md:flex-row gap-10 h-full w-screen">
        <div className="flex flex-col justify-center items-center md:justify-between gap-10 relative h-screen md:h-full w-screen">
          <div className="font-semibold text-[64px] md:text-[130px] text-stone-300 w-full absolute top-[20vh] md:relative md:top-0">
            Projects.
          </div>

          <div className="tabs-container text-stone-200 w-full max-w-full md:relative top-[80vh] md:top-auto flex flex-col justify-start">
            {renderTabs()}
          </div>
        </div>

        <div className="hidden xl:block">
          <img
            src={`/project-images/${image}.png`}
            alt="projects"
            width={600}
            height={600}
            className={`current-tab-img transform transition-transform rounded-l-full absolute right-[100vw] h-[500px] bottom-0 z-50 ${
              isVisible ? "slide-in" : "slide-out"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
