'use client';

import { useState } from 'react';
import { addApplicant, getCollaboratorIdFromClerk } from '@/lib/actions/project.action';
import { revalidatePath } from 'next/cache';
import { toast } from '../ui/use-toast';

interface ColabButtonProps {
  projectId: string;
}

const ColabButton = ({ projectId }: ColabButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    try {
      // Get user ID from server action
      const userId = await getCollaboratorIdFromClerk();
      if (!userId) {
        toast({
          title: 'Error!',
          description: 'Failed to retrieve your user ID.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Add applicant using server action
      const response = await addApplicant({ projectId, userId });

      // Revalidate server-side path
      revalidatePath(`/project/${projectId}`);

      if (response.alreadyApplied) {
        toast({
          title: 'Already Applied!',
          description: response.message,
          variant: 'success',
        });
        setIsApplied(true);
      } else {
        toast({
          title: 'Application Successful!',
          description: response.message,
          variant: 'success',
        });
        setIsApplied(true);
      }
    } catch (error) {
      console.error('Error applying for project:', error);
      toast({
        title: 'Something went wrong!',
        description: 'There was an issue with your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApplyClick}
      disabled={loading || isApplied}
      className={`px-6 py-2 rounded-lg text-white ${
        isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      } disabled:bg-gray-500`}
    >
      {loading ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply to Collaborate'}
    </button>
  );
};

export default ColabButton;
