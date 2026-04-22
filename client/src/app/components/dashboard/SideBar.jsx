import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  Briefcase,
  BookOpen,
  Layers,
  Wrench,
  LifeBuoy,
  MessageSquare,
} from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  const menuClass = (name) =>
    `flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg ${
      active === name
        ? "bg-orange-50 font-semibold text-gray-900"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  const iconColor = (name) =>
    active === name ? "text-orange-500" : "text-gray-400";

  const MenuItem = ({ name, icon: Icon, label }) => (
    <div className={menuClass(name)} onClick={() => setActive(name)}>
      <Icon size={20} className={iconColor(name)} />
      {label}
    </div>
  );

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col justify-between p-4">

      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-md" />
          <div>
            <p className="font-semibold">Record</p>
            <p className="text-xs text-gray-400">v1.25.0</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <MenuItem name="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <MenuItem name="profile"   icon={User}            label="Profile" />
          <MenuItem name="skills"    icon={Layers}          label="Skill Repository" />
          <MenuItem name="learnings" icon={BookOpen}        label="Learnings" />
          <MenuItem name="jobs"      icon={Briefcase}       label="Jobs" />

          <div className="ml-6 border-l border-gray-200 pl-4 space-y-2">
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Offers</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Applied</p>
          </div>

          <MenuItem name="tools" icon={Wrench} label="Tools" />

          <div className="ml-6 border-l border-gray-200 pl-4 space-y-2">
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">YouTube to Course</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">One Click Resume</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">AI Assessment</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <LifeBuoy size={18} /> Support
        </div>
        <div className="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <MessageSquare size={18} /> Feedback
        </div>
        <div className="text-xs text-gray-400 mt-4">
          <p>Privacy Policy | Terms & Conditions</p>
          <p className="mt-1">© 2025 Record Innovation and Enterprises Pvt. Ltd.</p>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;