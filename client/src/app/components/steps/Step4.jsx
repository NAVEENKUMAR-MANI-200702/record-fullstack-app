import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { observer } from "mobx-react-lite";
import formStore from "../../store/formStore";
import { X } from "lucide-react";
import skillsStore from "../../store/SkillsStore";

const Step4 = observer(
  forwardRef((props, ref) => {
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [expandedCategories, setExpandedCategories] = useState({});

    useImperativeHandle(ref, () => ({
      async save() {
        return await formStore.saveStep("step4", { skills: selected });
      },
    }));

    useEffect(() => {
      const data = formStore.formData?.step4;
      if (data?.skills) setSelected(data.skills);
    }, [formStore.formData]);

    const toggleSkill = (skill) => {
      if (selected.includes(skill)) {
        setSelected(selected.filter((s) => s !== skill));
      } else if (selected.length < 5) {
        setSelected([...selected, skill]);
      }
    };

    const removeSkill = (skill) =>
      setSelected(selected.filter((s) => s !== skill));

    const SKILLS_TO_SHOW = 15;

    const skillsByCategory = skillsStore.skills || {};

    const getFilteredSkills = (category) =>
      (skillsByCategory[category] || []).filter((skill) =>
        skill.toLowerCase().includes(search.toLowerCase()),
      );

    const getDisplayedSkills = (category, filtered) =>
      expandedCategories[category]
        ? filtered
        : filtered.slice(0, SKILLS_TO_SHOW);

    const toggleCategoryExpand = (category) =>
      setExpandedCategories((prev) => ({
        ...prev,
        [category]: !prev[category],
      }));

    if (skillsStore.loading) {
      return (
        <div className="w-full flex items-center justify-center py-12">
          <p className="text-slate-400 text-sm animate-pulse">
            Loading skills...
          </p>
        </div>
      );
    }

    if (skillsStore.error) {
      return (
        <div className="w-full flex items-center justify-center py-12">
          <p className="text-red-400 text-sm">{skillsStore.error}</p>
        </div>
      );
    }

    return (
      <div className="w-full px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-3 text-center">
            <h2 className="text-3xl font-bold mb-2">What's your Interest?</h2>
            <p className="text-slate-500 text-sm">
              Let us know what you are most curious about.
            </p>
          </div>

          <div className="mb-6 flex flex-col items-center w-full">
            <input
              placeholder="Search Skills i.e figma, front end"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-2xl px-6 py-3 bg-gray-100 border border-gray-200 rounded-2xl shadow-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            <p className="text-xs text-slate-400 mt-2">
              ({selected.length}/5 skills selected — you can edit later)
            </p>
          </div>

          {selected.length > 0 && (
            <div className="mb-8 pb-6 border-b">
              <h3 className="font-bold text-slate-900 mb-3">Selected Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selected.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm bg-orange-500 text-white hover:bg-orange-600 transition"
                  >
                    {skill} <X size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {Object.keys(skillsByCategory)
              .sort((a, b) => a.localeCompare(b))
              .map((category) => {
                const filtered = getFilteredSkills(category);
                if (filtered.length === 0 && search) return null;

                const displayed = getDisplayedSkills(category, filtered);
                const hasMore = filtered.length > SKILLS_TO_SHOW;
                const isExpanded = expandedCategories[category];

                return (
                  <div key={category}>
                    <h3 className="font-bold text-slate-900 mb-3 text-center">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {displayed.map((skill) => {
                        const isSelected = selected.includes(skill);
                        const canSelect = isSelected || selected.length < 5;

                        return (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            disabled={!canSelect}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                              isSelected
                                ? "bg-orange-500 text-white hover:bg-orange-600"
                                : canSelect
                                  ? "bg-white border border-slate-300 text-slate-700 hover:border-slate-400"
                                  : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}

                      {hasMore && (
                        <button
                          onClick={() => toggleCategoryExpand(category)}
                          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {isExpanded ? "See less" : "See more"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }),
);

Step4.displayName = "Step4";
export default Step4;
