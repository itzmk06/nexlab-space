'use client';

import { useState } from 'react';
import { approveApplicant } from '@/lib/actions/project.action';
import { revalidatePath } from 'next/cache';
import { toast } from "../ui/use-toast";

const ApproveButton = ({ projectId, userId }: { projectId: string, userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleApproveClick = async () => {
    setLoading(true);

    if (loading) return;

    try {
      await approveApplicant({ projectId, userId });
      revalidatePath(`/project/${projectId}`);

      toast({
        title: 'Applicant sent!',
        variant: 'success',
      });

      setIsApproved(true);
    } catch (error) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: "you're already a collaborator!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApproveClick}
      disabled={loading || isApproved}
      className={`px-6 py-2 rounded-lg text-white ${isApproved ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} disabled:bg-gray-500`}
    >
      {loading ? 'Approving...' : isApproved ? 'Approved' : 'Approve'}
    </button>
  );
};

export default ApproveButton;
