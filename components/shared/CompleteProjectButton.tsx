'use client';

import { useState } from 'react';
import { markProjectAsCompleted } from '@/lib/actions/project.action';
// import { revalidatePath } from 'next/cache';
import { toast } from "../ui/use-toast";

const CompleteProjectButton = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteClick = async () => {
    setLoading(true);

    if (loading) return;

    try {
      await markProjectAsCompleted({ projectId });
      // revalidatePath(`/projects/${projectId}`);

      toast({
        title: 'Project marked as completed!',
        variant: 'success',
      });

      setIsCompleted(true);
    } catch (error) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: 'An error occurred while marking the project as completed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCompleteClick}
      disabled={loading || isCompleted}
      className={`px-6 py-2 rounded-lg text-white ${isCompleted ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-gray-500`}
    >
      {loading ? 'Completing...' : isCompleted ? 'Completed' : 'Mark as Completed'}
    </button>
  );
};

export default CompleteProjectButton;
