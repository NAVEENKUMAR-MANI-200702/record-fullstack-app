import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { observer } from "mobx-react-lite";
import formStore from "../../store/formStore";
import profileImageStore from "../../store/ProfileImageStore";
import { Checkbox } from "../ui/checkbox";

const Step5 = observer(
  forwardRef((props, ref) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [jobStatus, setJobStatus] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
      const data = formStore.formData?.step5;
      if (data?.jobStatus) setJobStatus(data.jobStatus);
      if (data?.imageUrl) setPreview(data.imageUrl);
    }, [formStore.formData]);

    useImperativeHandle(ref, () => ({
      async save() {
        if (!validate()) return false;

        let imageUrl = preview;
        if (image) {
          imageUrl = await profileImageStore.uploadImage(image);
          if (!imageUrl) return false;
        }

        return await formStore.saveStep("step5", {
          jobStatus,
          imageUrl,
        });
      },
    }));

    const validate = () => {
      let errorMessage = "";

      if (!preview && !image) {
        errorMessage = "Please add a profile image";
      } else if (!jobStatus) {
        errorMessage = "Please select your job status";
      }

      setErrors({ jobStatus: !jobStatus });

      formStore.error = errorMessage;

      return !errorMessage;
    };

    const handleImageChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));

        formStore.error = null;
      }
    };

    return (
      <div className="w-full flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1">Set your profile</h2>
            <p className="text-slate-400 text-sm">This is important!</p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-14 h-14 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <p className="text-slate-500 text-sm">Your Profile Preview</p>
          </div>

          <div className="flex flex-col items-start mb-6">
            <p className="text-slate-700 font-medium mb-2">
              Upload Profile Picture
            </p>

            <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
              <svg
                className="w-4 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V3m0 0l-3 3m3-3l3 3"
                />
              </svg>
              <span className="text-sm text-slate-700 font-medium">
                {profileImageStore.uploading ? "Uploading..." : "Upload Photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={profileImageStore.uploading}
              />
            </label>

            {image && (
              <p className="text-xs text-slate-500 mt-2">{image.name}</p>
            )}

            {profileImageStore.error && (
              <p className="text-red-500 text-xs mt-2">
                {profileImageStore.error}
              </p>
            )}
          </div>

          <div className="mt-6">
            <p className="font-semibold text-slate-900 mb-3">
              Are you actively looking for a job?
            </p>

            <div className="space-y-2 max-w-md">
              {["yes", "no"].map((val) => (
                <label
                  key={val}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition"
                >
                  <Checkbox
                    checked={jobStatus === val}
                    onCheckedChange={() => {
                      setJobStatus(val);

                      setErrors({});
                      formStore.error = null;
                    }}
                  />

                  <span className="text-slate-900 text-sm">
                    {val === "yes"
                      ? "Yes, actively seeking"
                      : "No, I'm not looking"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }),
);

Step5.displayName = "Step5";
export default Step5;
