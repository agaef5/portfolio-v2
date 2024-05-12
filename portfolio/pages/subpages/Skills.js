/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";

export default function SkillsPage() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allSkills = [
    { skill: "HTML ", image: "html", color: `bg-red-500` },
    { skill: "CSS ", image: "css", color: "bg-sky-500" },
    { skill: "JavaScript", image: "javascript", color: "bg-yellow-500" },
    { skill: "C++", image: "c-sharp", color: "bg-purple-500" },
    { skill: "NextJS(React)", image: "react", color: "bg-sky-500" },
    { skill: "Blazor", image: "blazor", color: "bg-purple-800" },
    { skill: "Firebase", image: "firebase", color: "bg-orange-500" },
    { skill: "Figma", image: "figma", color: "bg-stone-500" },
    // C++, Blazor, SQL, MongoDB, TailwindCSS, NextJS
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [typedWidth, setTypedWidth] = useState(0);

  useEffect(() => {
    const changeSkill = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allSkills.length);
        setTypedWidth(0);
      }
    }, 2000);
    return () => clearInterval(changeSkill);
  }, [allSkills.length, isPaused]);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      setTypedWidth((prevWidth) => {
        if (
          prevWidth <
          allSkills[(currentIndex + 2) % allSkills.length]?.skill.length * 15
        ) {
          return prevWidth + 10;
        }
        clearInterval(typingEffect);
        return prevWidth;
      });
    }, 50);
    return () => clearInterval(typingEffect);
  }, [currentIndex]);

  const renderSkills = () => {
    const renderedSkills = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % allSkills.length;
      renderedSkills.push(
        <div
          // onMouseEnter={i == 2 ? stopSkillChange : null}
          // onMouseLeave={i == 2 ? startSkillChange : null}
          key={allSkills[index].skill}
          className={`carousel-icon-container transform transition-transform flex justify-center items-center   ${
            i === 2
              ? `current-skill scale-150 z-10 `
              : i === 1 || i === 3
              ? "z-0"
              : "z-0"
          }`}
        >
          <div
            className={`w-full h-full flex items-center justify-center rounded-full p-12 blur-lg opacity-50 ${
              i === 2 ? `${allSkills[index].color}` : ""
            }`}
          ></div>

          <img
            src={`/skill-icons/${allSkills[index].image}.svg`}
            alt={allSkills[index].skill}
            width={i === 2 ? 200 : i === 1 || i === 3 ? 50 : 25}
            height={i === 2 ? 200 : i === 1 || i === 3 ? 50 : 25}
            className={`absolute ${
              i === 2
                ? "transform transition-transform  filter backdrop:blur-2xl"
                : i === 1 || i === 3
                ? "blur-[1px] opacity-70"
                : "blur-[3px] opacity-30"
            }`}
          />
        </div>
      );
    }
    return renderedSkills;
  };

  return (
    <div className="scroll-section skills-page h-full w-screen py-20">
      <div className="scroll-section-content flex flex-col-reverse items-center justify-center gap-24 lg:flex-row lg:items-start lg:justify-start h-full">
        <div className="w-full lg:w-[20vw] lg:h-full flex flex-row lg:flex-col items-center justify-center">
          {renderSkills()}
        </div>

        <div className="flex flex-col gap-1 text-stone-300">
          <div className="font-semibold text-[64px] md:text-[130px] ">
            Tech stack.
          </div>
          <div className="flex flex-row items-center justify-start gap-2 text-lg md:text-2xl">
            <div className="pl-2 md:pl-5 w-fit">I worked with </div>
            <div className="typewritter" style={{ width: typedWidth }}>
              {allSkills[(currentIndex + 2) % allSkills.length]?.skill}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
