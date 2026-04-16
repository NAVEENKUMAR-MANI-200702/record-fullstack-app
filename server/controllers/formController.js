import Form from '../models/Form.js';

export const saveStep = async (req, res) => {
  try {
    const { userId, step, data } = req.body;

    if (!userId || !step || !data) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    let form = await Form.findOne({ userId });

    if (!form) {
      form = await Form.create({ userId });
    }

    form[step] = data;

    await form.save();

    res.json({
      message: `${step} saved successfully`,
      form,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getForm = async (req, res) => {
  try {
    const { userId } = req.params;

    const form = await Form.findOne({ userId });

    if (!form) {
      return res.json({});
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};