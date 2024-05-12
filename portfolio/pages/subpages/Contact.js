/* eslint-disable @next/next/no-img-element */

export default function ContactPage() {
  const renderLinksAndIcons = () => {
    const links = [
      { link: "https://www.linkedin.com/in/aga-furgalska", icon: "linkedin" },
      { link: "https://github.com/agaef5", icon: "github" },
      {
        link: "mailto:agafurgalska@wp.pl?subject=I want to contact with you!",
        icon: "mail",
      },
      // { link: "", icon: "downloadCV" },
    ];

    const renderedLinks = [];

    for (let i = 0; i < links.length; i++) {
      renderedLinks.push(
        <a
          key={i}
          href={links[i].link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row gap-4 items-center hover:cursor-pointer"
        >
          <img
            src={`/${links[i].icon}.svg`}
            alt={links[i].icon}
            width={30}
            height={30}
          />
        </a>
      );
    }

    return renderedLinks;
  };

  return (
    <div className="scroll-section contact-page w-screen h-screen px-5 py-10">
      <div className="scroll-section-content flex flex-col justify-between md:items-end md:justify-end h-full w-full md:h-screen relative">
        <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:items-end md:justify-between gap-12  md:p-20">
          <div className="font-semibold text-stone-300 text-[64px] md:text-[130px]">
            & more.
          </div>

          <div className="flex flex-row gap-4 items-center justify-end md:pb-10">
            {renderLinksAndIcons()}
          </div>
        </div>

        <div className="mypic"></div>
      </div>
    </div>
  );
}
