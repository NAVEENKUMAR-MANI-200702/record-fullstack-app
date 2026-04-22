import Skill from "../models/Skills.js";
import APIResponse from "../utils/APIResponse.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    return res.json(APIResponse.success(grouped));
  } catch (err) {
    return res.status(500).json(APIResponse.failure(500, err.message));
  }
};
