import React from "react";
import { FileBadge } from "lucide-react";

const Step3 = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="flex flex-col md:flex-row">

          <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              You bring the curiosity.
            </h2>
            <p className="text-red-500 font-semibold text-base sm:text-lg mb-4">
              We'll back it up with proof.
            </p>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Record is built for people like you – learners, job-seekers, builders.
            </p>

            <ul className="space-y-3 text-sm text-gray-700">
              {[
                "Earn verified skill badges from projects, courses & YouTube",
                "Take AI-powered assessments to showcase your skills",
                "Share your profile & badges publicly, like a mini portfolio",
                "Be visible to 200+ recruiters hiring via Record",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1F2A44] text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-center items-center">
            <div className="mb-5">
              <FileBadge size={60} strokeWidth={1.2} />
            </div>

            <p className="text-sm leading-relaxed text-gray-200 text-center md:text-left italic">
              "Through my journey spanning projects, work experience, licenses,
              education, and even my personal YouTube learning playlist, I've
              built a strong skill set. And now, I can see them all in one place
              with Record."
            </p>

            <div className="mt-5 text-center">
              <p className="font-semibold">– Arunmathavan</p>
              <p className="text-xs text-gray-300 mt-1">Mobile App Developer in NSIC</p>
            </div>
          </div>

        </div>

        <div className="bg-black text-gray-400 text-xs py-3 text-center tracking-widest">
          Trusted & Supported by&nbsp; Zoho &nbsp;·&nbsp; AWS &nbsp;·&nbsp; Notion &nbsp;·&nbsp; StartupTN
        </div>

      </div>
    </div>
  );
};

export default Step3;