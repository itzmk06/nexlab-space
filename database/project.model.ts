const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensure every project has an author
  },
  authorClerkId: {
    type: String,
    required: true, // Assuming this is critical for integration
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'], // Only allow 'ongoing' or 'completed'
    default: 'ongoing', // Default status is 'ongoing'
  },
  applicants: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Array of user IDs for applicants
  }],
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Array of user IDs for approved collaborators
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists in mongoose.models
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
