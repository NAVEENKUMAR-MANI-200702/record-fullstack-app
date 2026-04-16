import mongoose from 'mongoose';

const formSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    step1: {
      name: String,
      username: String,
    },

    step2: {
      role: String,
      location: String,
    },

    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {},
    step8: {},

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model('Form', formSchema);

export default Form;