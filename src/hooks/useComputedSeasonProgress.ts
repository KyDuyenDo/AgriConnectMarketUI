import { useMemo } from 'react';

interface ProgressProps {
    status: string;
    startDate?: string;
    endDate?: string;
}

export function useComputedSeasonProgress({ status, startDate, endDate }: ProgressProps) {
    return useMemo(() => {
        if (!status) return { percent: 0, label: 'Unknown' };

        const normalizedStatus = status.toLowerCase();

        if (normalizedStatus === 'pending') {
            return { percent: 0, label: 'Not started' };
        }

        if (normalizedStatus === 'completed' || normalizedStatus === 'done') {
            return { percent: 100, label: 'Completed' };
        }

        if (normalizedStatus === 'active' && startDate && endDate) {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            const now = new Date().getTime();

            if (end <= start) return { percent: 0, label: 'Invalid dates' };

            const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
            return { percent: Math.round(progress), label: `${Math.round(progress)}%` };
        }

        return { percent: 0, label: status };
    }, [status, startDate, endDate]);
}
