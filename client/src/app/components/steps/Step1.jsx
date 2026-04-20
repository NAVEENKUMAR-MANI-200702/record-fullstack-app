import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { observer } from "mobx-react-lite";
import formStore from "../../store/formStore";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Step1 = observer(
  forwardRef((props, ref) => {
    const [form, setForm] = useState({
      name: "",
      username: "",
      role: "",
      location: "",
      source: "",
    });

    const navigate = useNavigate();

    const userId = authStore.user?._id || authStore.user?.id;

    useImperativeHandle(ref, () => ({
      async save() {
        await formStore.saveStep(userId, "step1", form);
      },
    }));

    useEffect(() => {
      if (userId) {
        formStore.fetchForm(userId);
      }
    }, [userId]);

    useEffect(() => {
      const data = formStore.formData?.step1;
      if (data) {
        setForm((prev) => ({ ...prev, ...data }));
      }
    }, [formStore.formData]);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNext = async () => {
      await formStore.saveStep(userId, "step1", form);
      formStore.nextStep();
    };

    return (
      <div className="w-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">It's your time!</h2>
            <p className="text-slate-500 text-sm">
              Let us know about yourself first.
            </p>
          </div>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Your Name"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-slate-100"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="username"
              placeholder="Your Username"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-slate-100"
              value={form.username}
              onChange={handleChange}
            />
            <div className="flex items-center gap-2 text-xs text-slate-400 ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 16v-4m0-4h.01"
                />
              </svg>
              app.getrecord/{form.username || "username"}
            </div>
            <div className="relative">
              <select
                name="role"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-slate-100"
                value={form.role}
                onChange={handleChange}
              >
                <option value="">What best describes you?</option>
                <option>Student</option>
                <option>Developer</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                ▼
              </div>
            </div>
            <div className="relative">
              <select
                name="location"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-slate-100"
                value={form.location}
                onChange={handleChange}
              >
                <option value="">Select your location</option>
                <option>India</option>
                <option>USA</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                ▼
              </div>
            </div>
            <div className="relative">
              <select
                name="source"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-slate-100"
                value={form.source}
                onChange={handleChange}
              >
                <option value="">How do you know us?</option>
                <option>Google</option>
                <option>Friend</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }),
);

export default Step1;
