import React from "react";
import { FileBadge } from "lucide-react";

const Step3 = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Main Content */}
        <div className="flex flex-row min-h-[350px]">
          {/* LEFT */}
          <div className="p-5 md:w-3/5 flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              You bring the curiosity.
            </h2>

            <p className="text-red-500 font-medium mb-4">
              We'll back it up with proof.
            </p>

            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Record is built for people like you – learners, job-seekers,
              builders.
            </p>

            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span>✔</span>
                Earn verified skill badges from projects, courses & YouTube
              </li>

              <li className="flex items-start gap-2">
                <span>✔</span>
                Take AI-powered assessments to showcase your skills
              </li>

              <li className="flex items-start gap-2">
                <span>✔</span>
                Share your profile & badges publicly, like a mini portfolio
              </li>

              <li className="flex items-start gap-2">
                <span>✔</span>
                Be visible to 200+ recruiters hiring via Record
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="bg-[#1F2A44] text-white p-5 md:w-2/5 flex flex-col justify-center items-start">
            <div className="mb-6 flex justify-center align-middle w-full">
              <FileBadge size={70} strokeWidth={1.2} />
            </div>

            <p className="text-sm leading-relaxed text-gray-200 text-left">
              “Through my journey spanning projects, work experience, licenses,
              education, and even my personal YouTube learning playlist, I’ve
              built a strong skill set. And now, I can see them all in one place
              with Record.”
            </p>

            <div className="mt-6 text-center">
              <p className="font-medium">– Arunmathavan</p>
              <p className="text-xs text-gray-300 mt-1">
                Mobile App Developer in NSIC
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-black text-gray-400 text-xs py-4 text-center tracking-wide">
          Trusted & Supported by Zoho &nbsp; AWS &nbsp; Notion &nbsp; StartupTN
        </div>
      </div>
    </div>
  );
};

export default Step3;
