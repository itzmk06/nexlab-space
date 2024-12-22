"use server";

import Project from "@/database/project.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateProjectParams,
  GetProjectByIdParams,
  GetProjectsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

// Create a new project
export async function createProject(params: CreateProjectParams) {
  const { userId: authorClerkId } = auth();
  try {
    await connectToDatabase();

    const { title, description, author } = params;

    const project = await Project.create({
      title,
      description,
      author,
      status: "ongoing",
      authorClerkId,
    });

    await User.findByIdAndUpdate(author, {
      $push: { projects: project._id },
    });

    revalidatePath(`/projects/${project._id}`);
    return { project };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get all projects with optional search and filter
// Get all projects with optional search and filter
// Get all projects without pagination and filters
export async function getProjects(params: GetProjectsParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter } = params;

    const query: any = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    if (filter) {
      query.status = filter;
    }

    const projects = await Project.find(query)
      .populate("author", "name picture")
      .populate("collaborators", "name picture");

    return { projects };
  } catch (error) {
    console.log(error);
    throw error;
  }
}



// Get project details by ID
export async function getProjectById(params: GetProjectByIdParams) {
  try {
    await connectToDatabase();
    const { projectId } = params;

    const project = await Project.findById(projectId)
      .populate("author", "name picture")
      .populate("collaborators", "name picture")
      .populate("applicants", "name picture");

    if (!project) {
      throw new Error("Project does not exist.");
    }

    return { project,  revalidate: 10 };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Add an applicant to a project

export async function addApplicant({ projectId, userId }: { projectId: string, userId: string }) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Find the project and add the user to the applicants list
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Check if the user is already an applicant to avoid duplicates
    if (project.applicants.includes(userId)) {
      // Return a success message that the user is already applied
      return { alreadyApplied: true, message: 'You have already applied to collaborate on this project.' };
    }

    // Add user to the applicants list
    project.applicants.push(userId);

    // Save the updated project document
    await project.save();

    // Return success message
    return { alreadyApplied: false, message: 'Successfully applied to collaborate on the project.' };
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding applicant:', error);
    
    // Return error message in case of failure
    return { alreadyApplied: false, message: 'An error occurred while processing your application. Please try again later.' };
  }
}


// Approve an applicant and make them a collaborator
// project.actions.ts

// Approve an applicant and make them a collaborator
export async function approveApplicant({ projectId, userId }: { projectId: string, userId: string }) {
  try {
    await connectToDatabase();

    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Check if the user is in the applicants list
    const applicantIndex = project.applicants.indexOf(userId);
    if (applicantIndex === -1) {
      throw new Error('Applicant not found');
    }

    // Check if the user is already a collaborator
    if (project.collaborators.includes(userId)) {
      return { message: 'User is already a collaborator on this project' };
    }

    // Remove the user from the applicants list and add to the collaborators list
    project.applicants.splice(applicantIndex, 1); // Remove the applicant
    project.collaborators.push(userId); // Add the user to collaborators list

    await project.save();

    // Revalidate the project path for cache updates
    revalidatePath(`/project/${projectId}`);
    return { message: 'Applicant approved successfully and added as collaborator' };
  } catch (error) {
    console.error('Error approving applicant:', error);
    throw new Error('Failed to approve applicant');
  }
}


export async function rejectApplicant({ projectId, userId }: { projectId: string, userId: string }) {
  try {
    await connectToDatabase();

    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Check if the user is in the applicants list
    const applicantIndex = project.applicants.indexOf(userId);
    if (applicantIndex === -1) {
      throw new Error('Applicant not found');
    }

    // Remove the user from the applicants list
    project.applicants.splice(applicantIndex, 1);

    await project.save();

    // Revalidate the project path for cache updates
    revalidatePath(`/project/${projectId}`);
    return { message: 'Applicant rejected successfully' };
  } catch (error) {
    console.error('Error rejecting applicant:', error);
    throw new Error('Failed to reject applicant');
  }
}


// Get collaborator ID from Clerk
export async function getCollaboratorIdFromClerk() {
  const { userId } = auth(); // Get Clerk's userId

  if (!userId) {
    throw new Error("Unauthorized: No userId found");
  }

  await connectToDatabase(); // Ensure the DB connection is established

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    throw new Error("User not found");
  }

  return user._id; // Return the _id of the user
}


