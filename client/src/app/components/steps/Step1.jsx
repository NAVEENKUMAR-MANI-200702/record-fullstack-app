import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { observer } from "mobx-react-lite";
import formStore from "../../store/formStore";
import { SelectField, InputField } from "../common/FormFields"; // ← import

const SELECT_FIELDS = [
  {
    name: "role",
    placeholder: "What best describes you?",
    options: ["Student", "Developer", "Designer", "Entrepreneur", "Other"],
  },
  {
    name: "location",
    placeholder: "Select your location",
    options: ["India", "USA", "UK", "Other"],
  },
  {
    name: "source",
    placeholder: "How do you know us?",
    options: ["Google", "Friend", "Social Media", "Other"],
  },
];

const Step1 = observer(
  forwardRef((props, ref) => {
    const [form, setForm] = useState({
      name: "",
      username: "",
      role: "",
      location: "",
      source: "",
    });
    const [errors, setErrors] = useState({});

    useImperativeHandle(ref, () => ({
      validate() {
        return validate();
      },
      async save() {
        if (!validate()) return false;
        return await formStore.saveStep("step1", form);
      },
    }));

    useEffect(() => {
      formStore.fetchForm();
    }, []);

    useEffect(() => {
      const data = formStore.formData?.step1;
      if (data) setForm((prev) => ({ ...prev, ...data }));
    }, [formStore.formData]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const validate = () => {
      const newErrors = {};
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.username.trim()) newErrors.username = "Username is required";
      if (!form.role) newErrors.role = "Please select your role";
      if (!form.location) newErrors.location = "Please select your location";
      if (!form.source) newErrors.source = "Please tell us how you found us";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (formStore.loading) {
      return (
        <div className="w-full flex items-center justify-center py-12">
          <p className="text-slate-400 text-sm animate-pulse">
            Loading your data...
          </p>
        </div>
      );
    }

    return (
      <div className="w-full flex items-center justify-center px-4 py-12 max-w-md mx-auto">
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">It's your time!</h2>
            <p className="text-slate-500 text-sm">
              Let us know about yourself first.
            </p>
          </div>

          <div className="space-y-4">
            <InputField
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <InputField
              name="username"
              placeholder="Your Username"
              value={form.username}
              onChange={handleChange}
              error={errors.username}
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 ml-1 mt-1">
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
            </InputField>

            {SELECT_FIELDS.map(({ name, placeholder, options }) => (
              <SelectField
                key={name}
                name={name}
                placeholder={placeholder}
                options={options}
                value={form[name]}
                onChange={handleChange}
                error={errors[name]}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }),
);

export default Step1;
