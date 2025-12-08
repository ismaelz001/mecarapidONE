'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateWorkOrderStatus } from '@/server/workorders';

interface StatusUpdaterProps {
  workOrderId: string;
  currentStatus: string;
}

const statuses = [
  { value: 'pendiente', label: 'Pendiente', color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' },
  { value: 'diagnostico', label: 'Diagnóstico', color: 'bg-blue-500/20 border-blue-500/50 text-blue-400' },
  { value: 'reparando', label: 'Reparando', color: 'bg-orange-500/20 border-orange-500/50 text-orange-400' },
  { value: 'finalizada', label: 'Finalizada', color: 'bg-mr-accent/20 border-mr-accent/50 text-mr-accent' },
];

export default function WorkOrderStatusUpdater({ workOrderId, currentStatus }: StatusUpdaterProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusClick(newStatus: string) {
    if (newStatus === currentStatus || isUpdating) return;
    
    setIsUpdating(true);
    try {
      await updateWorkOrderStatus(workOrderId, newStatus);
      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="space-y-2">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => handleStatusClick(status.value)}
          disabled={isUpdating}
          className={`w-full px-4 py-3 border text-left uppercase tracking-wide text-sm font-medium transition-all
            ${currentStatus === status.value 
              ? `${status.color} ring-2 ring-offset-2 ring-offset-mr-bg ring-current` 
              : 'border-mr-border text-mr-text/50 hover:border-mr-secondary hover:text-mr-text'
            }
            ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className="flex items-center justify-between">
            <span>{status.label}</span>
            {currentStatus === status.value && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
