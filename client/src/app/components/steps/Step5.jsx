import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import formStore from "../../store/formStore";
import authStore from "../../store/auth/authStore";

const Step5 = observer(() => {
    const userId = authStore.data.response.user?._id || authStore.data.response.user?.id;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [jobStatus, setJobStatus] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = async () => {
    await formStore.saveStep(userId, "step5", {
      jobStatus,
      // image upload later (optional)
    });

    formStore.nextStep();
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-2">Set your profile</h2>

      <p className="text-gray-500 text-sm mb-6">This is important!</p>

      {/* Avatar */}
      <div className="mb-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">Preview</span>
          )}
        </div>
      </div>

      {/* Upload */}
      <label className="cursor-pointer text-blue-600 text-sm block mb-4">
        Upload Photo
        <input type="file" className="hidden" onChange={handleImageChange} />
      </label>

      {/* Radio */}
      <div className="text-left space-y-2 text-sm">
        <p className="mb-2">Are you actively looking for a job?</p>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="job"
            value="yes"
            onChange={(e) => setJobStatus(e.target.value)}
          />
          Yes, actively seeking
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="job"
            value="no"
            onChange={(e) => setJobStatus(e.target.value)}
          />
          No, I'm not looking
        </label>
      </div>
    </div>
  );
});

export default Step5;
