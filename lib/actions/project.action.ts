'use server';

import Project from "@/database/project.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateProjectParams,
  GetProjectByIdParams,
  GetProjectsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Helper to convert Mongoose doc to plain object
const toPlainProject = (projectDoc: any) => ({
  _id: projectDoc._id.toString(),
  title: projectDoc.title,
  description: projectDoc.description,
  status: projectDoc.status,
  createdAt: projectDoc.createdAt,
  authorClerkId: projectDoc.authorClerkId,
  author: projectDoc.author
    ? {
        _id: projectDoc.author._id.toString(),
        name: projectDoc.author.name,
        picture: projectDoc.author.picture,
      }
    : null,
  collaborators: projectDoc.collaborators?.map((c: any) => ({
    _id: c._id.toString(),
    name: c.name,
    picture: c.picture,
  })) || [],
  applicants: projectDoc.applicants?.map((a: any) => ({
    _id: a._id.toString(),
    name: a.name,
    picture: a.picture,
  })) || [],
});

// Create a new project
export async function createProject(params: CreateProjectParams) {
  const { userId: authorClerkId } = await auth();
  try {
    await connectToDatabase();

    const { title, description, author } = params;

    const projectDoc = await Project.create({
      title,
      description,
      author,
      status: "ongoing",
      authorClerkId,
    });

    await User.findByIdAndUpdate(author, {
      $push: { projects: projectDoc._id },
    });

    revalidatePath(`/projects/${projectDoc._id}`);
    return { project: toPlainProject(projectDoc) };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get all projects with optional search and filter
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

    const projectDocs = await Project.find(query)
      .populate("author", "name picture")
      .populate("collaborators", "name picture");

    const projects = projectDocs.map(toPlainProject);
    return { projects };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get project details by ID
export async function getProjectById(params: GetProjectByIdParams) {
  try {
    await connectToDatabase();
    const { projectId } = params;

    const projectDoc = await Project.findById(projectId)
      .populate("author", "name picture")
      .populate("collaborators", "name picture")
      .populate("applicants", "name picture");

    if (!projectDoc) {
      throw new Error("Project does not exist.");
    }

    return { project: toPlainProject(projectDoc), revalidate: 10 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Add an applicant to a project
export async function addApplicant({ projectId, userId }: { projectId: string; userId: string }) {
  try {
    await connectToDatabase();
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");
    // Block owner
    if (project.author.toString() === userId.toString()) {
      return { alreadyApplied: true, message: "Project owner cannot apply as collaborator" };
    }

    if (project.applicants.includes(userId)) {
      return { alreadyApplied: true, message: "Already applied" };
    }

    project.applicants.push(userId);
    await project.save();

    revalidatePath(`/project/${projectId}`);
    return { alreadyApplied: false, message: "Successfully applied" };
  } catch (error) {
    console.error(error);
    return { alreadyApplied: false, message: "Error processing application" };
  }
}

// Approve applicant
export async function approveApplicant({ projectId, userId }: { projectId: string; userId: string }) {
  try {
    await connectToDatabase();
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");

    const index = project.applicants.indexOf(userId);
    if (index === -1) throw new Error("Applicant not found");

    if (!project.collaborators.includes(userId)) project.collaborators.push(userId);
    project.applicants.splice(index, 1);

    await project.save();
    revalidatePath(`/project/${projectId}`);
    return { message: "Applicant approved" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to approve applicant");
  }
}

// Reject applicant
export async function rejectApplicant({ projectId, userId }: { projectId: string; userId: string }) {
  try {
    await connectToDatabase();
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");

    const index = project.applicants.indexOf(userId);
    if (index === -1) throw new Error("Applicant not found");

    project.applicants.splice(index, 1);
    await project.save();
    revalidatePath(`/project/${projectId}`);
    return { message: "Applicant rejected" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reject applicant");
  }
}

// Get collaborator ID from Clerk
export async function getCollaboratorIdFromClerk() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });
  if (!user) throw new Error("User not found");

  return user._id.toString();
}

// Mark project as completed
export async function markProjectAsCompleted({ projectId }: { projectId: string }) {
  try {
    await connectToDatabase();
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");

    if (project.status === "completed") return { message: "Already completed" };

    project.status = "completed";
    await project.save();
    revalidatePath(`/projects/${projectId}`);
    return { message: "Project marked as completed" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to complete project");
  }
}

// Get all projects of a user
export async function getUserProjects(userId: string) {
  try {
    await connectToDatabase();
    const projectDocs = await Project.find({ author: userId })
      .populate("author", "name picture")
      .populate("collaborators", "name picture");

    const projects = projectDocs.map(toPlainProject);
    return { projects };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
