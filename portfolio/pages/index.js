/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
// import "./";

const montserrat = Montserrat({
  subsets: ["latin"],
});

import ProjectsPage from "@/pages/subpages/Projects";
import IntroductionPage from "@/pages/subpages/Introduction";
import SkillsPage from "@/pages/subpages/Skills";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ContactPage from "./subpages/Contact";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  let width;

  if (typeof window !== "undefined") {
    let width = window.innerWidth;
  }
  const [screenWidth, setScreenWidth] = useState(width);

  useEffect(() => {
    const sections = gsap.utils.toArray(".scroll-section");

    const screenWidth = window.innerWidth;
    const sectionWidth =
      screenWidth < 640 ? window.innerHeight : window.innerWidth;
    const translateXWidth =
      screenWidth < 640 ? window.innerHeight * 3 : -sectionWidth * 3;
    const scrollEndWidth =
      screenWidth < 640 ? window.innerHeight * 3 : sectionWidth * 4;

    const horizontalScrolling = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
        translateY: 0,
      },
      {
        translateX: screenWidth < 640 ? 0 : translateXWidth,
        translateY: screenWidth < 640 ? -translateXWidth : 0,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `${scrollEndWidth} top`,
          scrub: 0.2,
          // markers: true,
          snap: {
            snapTo: 1 / 3,
            duration: 0.5,
            directional: false,
            delay: 0.5,
          },
          pin: true,
        },
      }
    );

    // arrows on introduction page disappear
    const scrollArrows = gsap.timeline({
      scrollTrigger: {
        trigger: ".introduction-page",
        start: "bottom 90%",
        toggleActions: "play pause reverse reverse",
        end: "200% top",
      },
    });
    scrollArrows.to(".scroll-indicator", { opacity: 0, duration: 0.5 });
    gsap.fromTo(
      ".scroll-indicator",
      {
        opacity: 0,
        y: 20,
      },
      { opacity: 1, y: 0, duration: 1, delay: 1 }
    );

    const showBlobs = (bigBlobColor, smallBlobColor) => {
      setBigBlob({ image: `${bigBlobColor}-blob.svg` });
      setSmallBlob({ image: `${smallBlobColor}-blob.svg` });

      const timeline = gsap.timeline();
      timeline
        .to(".red-blob, .yellow-blob", {
          opacity: 1,
          duration: 0.75,
          // delay: 0.5,
        })
        .to(
          ".red-blob",
          {
            x: 20,
            y: 10,
            rotation: 45,
            yoyo: true,
            repeat: -1,
            duration: 3,
            ease: "power1.inOut",
          },
          "-=0.75"
        )
        .to(
          ".yellow-blob",
          {
            x: -20,
            y: -10,
            rotation: -45,
            yoyo: true,
            repeat: -1,
            duration: 3,
            ease: "power1.inOut",
          },
          "-=0.75"
        );

      timeline.play();
    };

    const showBlobsAnimation = {
      "introduction-page": () => {
        showBlobs("yellow", "red");
      },
      "skills-page": () => {
        showBlobs("green", "blue");
      },
      "projects-page": () => {
        showBlobs("orange", "purple");
      },
      "contact-page": () => {
        showBlobs("white", "silver");
      },
    };

    const dissolveBlobs = (bigBlobColor, smallBlobColor) => {
      setTimeout(() => {
        setBigBlob({ image: `${bigBlobColor}-blob.svg` });
        setSmallBlob({ image: `${smallBlobColor}-blob.svg` });
      }, 500);

      const timeline = gsap.timeline();

      timeline.to(".red-blob, .yellow-blob", { opacity: 0, duration: 0.75 });

      timeline.play();
    };

    const dissolveBlobsAnimation = {
      "introduction-page": () => {
        dissolveBlobs("yellow", "red");
      },
      "skills-page": () => {
        dissolveBlobs("green", "blue");
      },
      "projects-page": () => {
        dissolveBlobs("orange", "purple");
      },
      "contact-page": () => {
        dissolveBlobs("white", "silver");
      },
    };

    const updateNav = (scrolledClass) => {
      const activeNavItem = document.querySelector(`.${scrolledClass}-nav`);
      const activeSectionIndicator = activeNavItem.querySelector(
        ".active-section-indicator"
      );

      gsap.to(activeNavItem, {
        color: "rgb(226 232 240)",
        duration: 1,
        ease: "elastic.out",
      });
      gsap.to(activeSectionIndicator, {
        opacity: 1,
        y: 0,
        ease: "elastic.out(1,0.4)",
        duration: 0.75,
      });

      activeNavItem.classList.add("active");
      gsap.set(activeSectionIndicator, { opacity: 1 });
    };

    const dissolveNavStyles = (scrolledClass) => {
      const activeNavItem = document.querySelector(`.${scrolledClass}-nav`);
      gsap.to(activeNavItem, {
        color: "rgb(87 83 78)",
        duration: 1,
        ease: "elastic.out",
      });
      const activeSectionIndicator = activeNavItem.querySelector(
        ".active-section-indicator"
      );
      gsap.to(activeSectionIndicator, {
        opacity: 0,
        y: 10,
        ease: "elastic.out(1,0.4)",
        duration: 0.5,
      });
      gsap.set(activeSectionIndicator, { opacity: 0 });

      // ensure all nav items are inactive
      const navItems = document.querySelectorAll(".nav-item");
      const sectionIndicators = document.querySelectorAll(
        ".active-section-indicator"
      );

      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
      });
      sectionIndicators.forEach((navItem) => {
        gsap.set(navItem, { opacity: 0 });
      });
    };

    const scrollFinished = () => {
      if (screenWidth < 640) {
        const scrollY = window.scrollY;
        const sectionWidth = window.innerHeight;

        const scrolledClass = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          const sectionStart = bounds.top - scrollY;
          const sectionEnd = bounds.bottom - scrollY;
          return (
            sectionStart <= sectionWidth / 2 && sectionEnd >= sectionWidth / 2
          );
        }).classList[1];

        showBlobsAnimation[scrolledClass]();
        updateNav(scrolledClass);
      } else {
        const scrollX = window.scrollX;
        const sectionWidth = window.innerWidth;

        const scrolledClass = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          const sectionStart = bounds.left - scrollX;
          const sectionEnd = bounds.right - scrollX;
          return (
            sectionStart <= sectionWidth / 2 && sectionEnd >= sectionWidth / 2
          );
        }).classList[1];

        showBlobsAnimation[scrolledClass]();
        updateNav(scrolledClass);
      }
    };

    const scrollStarted = () => {
      if (screenWidth < 640) {
        const scrollY = window.scrollY;
        const sectionWidth = window.innerHeight;

        const scrolledClass = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          const sectionStart = bounds.top - scrollY;
          const sectionEnd = bounds.bottom - scrollY;
          return (
            sectionStart <= sectionWidth / 2 && sectionEnd >= sectionWidth / 2
          );
        }).classList[1];

        dissolveBlobsAnimation[scrolledClass]();
        dissolveNavStyles(scrolledClass);
      } else {
        const scrollX = window.scrollX;
        const sectionWidth = window.innerWidth;

        const scrolledClass = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          const sectionStart = bounds.left - scrollX;
          const sectionEnd = bounds.right - scrollX;
          return (
            sectionStart <= sectionWidth / 2 && sectionEnd >= sectionWidth / 2
          );
        }).classList[1];

        dissolveBlobsAnimation[scrolledClass]();
        dissolveNavStyles(scrolledClass);
      }
    };

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    scrollFinished();
    ScrollTrigger.addEventListener("scrollEnd", scrollFinished);
    ScrollTrigger.addEventListener("scrollStart", scrollStarted);
    // window.addEventListener("resize", handleResize);

    return () => {
      horizontalScrolling.kill();
      scrollArrows.kill();
      ScrollTrigger.removeEventListener("scrollEnd", scrollFinished);
      ScrollTrigger.removeEventListener("scrollStart", scrollStarted);
      // window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Call once to set initial blobs
  const [bigBlob, setBigBlob] = useState({
    image: "yellow-blob.svg",
  });
  const [smallBlob, setSmallBlob] = useState({
    image: "red-blob.svg",
  });

  const moveToSection = (section) => {
    const container = sectionRef.current;
    const sectionElement = sectionRef.current.querySelector(`.${section}`);
    const sectionIndex = Array.from(sectionElement.parentNode.children).indexOf(
      sectionElement
    );
    const scrollAmount =
      container.offsetTop +
      sectionElement.offsetLeft *
        (container.offsetWidth / (container.scrollWidth - window.innerWidth));

    window.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    });
  };

  const renderNavBar = () => {
    const navItems = [
      { class: "introduction", headline: "About" },
      { class: "skills", headline: "Tech Stack" },
      { class: "projects", headline: "Projects" },
      { class: "contact", headline: "Contact" },
    ];

    const renderedNavItems = [];

    for (let i = 0; i < navItems.length; i++) {
      renderedNavItems.push(
        <div
          key={navItems[i].class}
          className={`flex flex-row items-baseline gap-1 nav-item ${navItems[i].class}-page-nav`}
        >
          <div
            className={`hover:text-stone-300 hover:cursor-pointer `}
            onClick={() => {
              moveToSection(navItems[i].class + "-page");
            }}
          >
            {navItems[i].headline}
          </div>
          <div className="active-section-indicator h-2 w-2 rounded-full bg-stone-300"></div>
        </div>
      );
    }
    return renderedNavItems;
  };

  return (
    <section
      className={`scroll-section-outer  select-none bg-black ${montserrat.className}`}
    >
      <div ref={triggerRef}>
        <div className="yellow-blob filter fixed top-20 right-20 blur-[150px] min-[1700px]:opacity-50 min-[1700px]:scale-[2.2]">
          <img
            draggable={false}
            src={`/${bigBlob.image}`}
            alt="blob"
            width={400}
            height={400}
          />
        </div>
        <div className="red-blob filter fixed bottom-20 right-96 blur-[150px] min-[1700px]:opacity-40 min-[1700px]:scale-[2.2]">
          <img
            draggable={false}
            src={`/${smallBlob.image}`}
            alt="blob"
            width={400}
            height={400}
          />
        </div>

        <div className="absolute z-50 top-0 p-10 hidden sm:flex flex-row gap-10 items-center justify-end w-screen text-stone-500 font-semibold text-lg">
          {renderNavBar()}
        </div>

        <div
          ref={sectionRef}
          className="w-screen sm:w-[400vw] sm:h-screen relative scroll-section-inner filter backdrop-blur-2xl sm:flex flex-col md:flex-row items-center justify-center"
        >
          <IntroductionPage />
          <SkillsPage />
          <ProjectsPage />
          <ContactPage />
        </div>
      </div>
    </section>
  );
}

// todo: rerender page on resize,
