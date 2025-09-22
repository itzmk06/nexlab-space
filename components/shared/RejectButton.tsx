'use client';

import { useState } from 'react';
import { rejectApplicant } from '@/lib/actions/project.action';
// import { revalidatePath } from 'next/cache';
import { toast } from '../ui/use-toast';

const RejectButton = ({ projectId, userId }: { projectId: string, userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleRejectClick = async () => {
    setLoading(true);

    if (loading) return;

    try {
      await rejectApplicant({ projectId, userId });
      // revalidatePath(`/project/${projectId}`);

      toast({
        title: 'Applicant Rejected!',
        variant: 'success',
      });

      setIsRejected(true);
    } catch (error) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: "There was an issue rejecting the applicant. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRejectClick}
      disabled={loading || isRejected}
      className={`px-6 py-1 rounded-md text-white ${isRejected ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'} disabled:bg-gray-500`}
    >
      {loading ? 'Rejecting...' : isRejected ? 'Rejected' : 'Reject'}
    </button>
  );
};

export default RejectButton;
