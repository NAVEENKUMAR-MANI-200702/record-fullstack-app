import React from "react";

const Step3 = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">

      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">

        {/* LEFT CONTENT */}
        <div className="p-6 md:w-2/3">

          <h2 className="text-lg font-semibold mb-2">
            You bring the curiosity.
          </h2>

          <p className="text-red-500 font-medium mb-4">
            We'll back it up with proof.
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Record is built for people like you – learners, job-seekers, builders.
          </p>

          <ul className="space-y-3 text-sm">

            <li>✔ Earn verified skill badges from projects, courses & YouTube</li>

            <li>✔ Take AI-powered assessments to showcase your skills</li>

            <li>✔ Share your profile & badges publicly, like a mini portfolio</li>

            <li>✔ Be visible to 200+ recruiters hiring via Record</li>

          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-blue-900 text-white p-6 md:w-1/3 flex items-center justify-center text-center">
          <p className="text-sm">
            “Through my journey spanning projects, work experience, licenses,
            education, and even my personal YouTube learning playlist, I’ve built
            a strong skill set. And now, I can see them all in one place with Record.”
          </p>
        </div>

      </div>

      {/* Footer Logos */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Trusted & Supported by Zoho • AWS • Notion • StartupTN
      </div>

    </div>
  );
};

export default Step3;