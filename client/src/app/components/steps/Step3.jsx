import React from "react";
import { FileBadge, PackageCheck } from "lucide-react";

const Step3 = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="bg-blue-50 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
              You bring the curiosity.
            </h2>
            <p className=" font-semibold text-base sm:text-2xl mb-4">
              <span>We'll </span>
              <span className="text-red-500">back it up with proof.</span>
            </p>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Record is built for people like you – learners, job-seekers,
              builders. Whatever your goal, we help you earn verified skill
              badges and turn effects into outcomes.
            </p>

            <ul className="space-y-3 text-base font-bold text-black">
              {[
                "Earn verified skill badges from projects, courses & YouTube",
                "Take AI-powered assessments to showcase your skills",
                "Share your profile & badges publicly, like a mini portfolio",
                "Be visible to 200+ recruiters hiring via Record",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <PackageCheck
                    className="text-red-500 mt-0.5 shrink-0"
                    size={20}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1F2A44] text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-center items-center">
            <div className="mb-5 pt-24">
              <FileBadge
                size={60}
                strokeWidth={1.2}
                className="text-gray-400"
              />
            </div>

            <p className="text-sm leading-relaxed text-white font-normal text-center md:text-left">
              "Throughout my journey spanning projects, work experience,
              licenses, education, and even my personal YouTube learning
              playlist, I've built a strong skill set. And now, I can see them
              all in one place with Record."
            </p>

            <div className="mt-5 text-left w-full">
              <p className="font-semibold">– Arunmathavan</p>
              <p className="text-sm text-gray-300 mt-1">
                Mobile App Developer in NSIC
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black text-gray-400 text-xs py-3 text-center tracking-widest">
          Trusted & Supported by&nbsp; Zoho &nbsp;·&nbsp; AWS &nbsp;·&nbsp;
          Notion &nbsp;·&nbsp; StartupTN
        </div>
      </div>
    </div>
  );
};

export default Step3;
