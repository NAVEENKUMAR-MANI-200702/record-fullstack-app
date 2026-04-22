import React, { useState, useRef, useEffect } from "react";
import { LayoutDashboard, Bell, Plus, LogOut, User } from "lucide-react";
import { observer } from "mobx-react-lite";
import authStore from "../../store/auth/authStore";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";

const TopNavbar = observer(() => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = toJS(authStore.userDetails);
  const profileImg = authStore.isOnboardingCompleted ? user?.imageUrl : null;

  console.log("User Object:", user);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authStore.reset?.();
    localStorage.clear();
    authStore.checkLoginStatus();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white border-b px-6 py-3 w-full">
      <div className="flex items-center gap-2 text-gray-700">
        <LayoutDashboard size={18} />
        <span className="font-medium">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-lg text-sm">
          ⚡ Upgrade
        </button>

        <div className="bg-orange-500 p-2 rounded-lg cursor-pointer">
          <Plus size={16} className="text-white" />
        </div>

        <Bell size={18} className="text-gray-600 cursor-pointer" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            {profileImg ? (
              <img
                src={profileImg}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-400"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    @{user?.username || "username"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default TopNavbar;
