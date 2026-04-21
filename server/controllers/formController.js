import Form from "../models/Form.js";
import APIResponse from "../utils/APIResponse.js";

export const saveStep = async (req, res) => {
  try {
    const { userId, step, data } = req.body;

    if (!userId || !step || !data) {
      return res.status(400).json(APIResponse.failure(400, "Missing fields"));
    }

    let form = await Form.findOne({ userId });

    if (!form) {
      form = await Form.create({ userId });
    }

    form[step] = data;

    await form.save();

    return res.status(200).json(
      APIResponse.success(
        {
          message: `${step} saved successfully`,
          form,
        },
        200,
      ),
    );
  } catch (error) {
    return res.status(500).json(APIResponse.failure(500, error.message));
  }
};

export const getForm = async (req, res) => {
  try {
    const { userId } = req.params;

    const form = await Form.findOne({ userId });

    if (!form) {
      return res.status(200).json(APIResponse.success({}, 200));
    }

    return res.status(200).json(APIResponse.success(form, 200));
  } catch (error) {
    return res.status(500).json(APIResponse.failure(500, error.message));
  }
};
