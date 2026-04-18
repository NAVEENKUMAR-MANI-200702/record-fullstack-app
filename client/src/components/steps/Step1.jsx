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
      <div className="w-full">
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-2">It's your time!</h2>

            <p className="text-gray-500 mb-6 text-sm">
              Let us know about yourself first.
            </p>

            <div className="space-y-4 text-left">
              <input
                name="name"
                placeholder="Your Name"
                className="w-full border px-4 py-3 rounded-md"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="username"
                placeholder="Your Username"
                className="w-full border px-4 py-3 rounded-md"
                value={form.username}
                onChange={handleChange}
              />

              {/* Radio / Info */}
              <div className="text-sm text-gray-400">
                app.getrecord/username
              </div>

              {/* Dropdowns */}
              <select
                name="role"
                className="w-full border px-4 py-3 rounded-md"
                value={form.role}
                onChange={handleChange}
              >
                <option value="">What best describes you?</option>
                <option>Student</option>
                <option>Developer</option>
              </select>

              <select
                name="location"
                className="w-full border px-4 py-3 rounded-md"
                value={form.location}
                onChange={handleChange}
              >
                <option value="">Select your location</option>
                <option>India</option>
                <option>USA</option>
              </select>

              <select
                name="source"
                className="w-full border px-4 py-3 rounded-md"
                value={form.source}
                onChange={handleChange}
              >
                <option value="">How do you know us?</option>
                <option>Google</option>
                <option>Friend</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }),
);

export default Step1;
