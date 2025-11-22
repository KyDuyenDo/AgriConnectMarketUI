import { useQuery } from '@tanstack/react-query';
import { getSeasonsByFarm } from '@/api/services/seasonService';
import { Season } from '@/types/season';
import { useMemo } from 'react';

interface UseSeasonsOptions {
    search?: string;
    sortBy?: 'date' | 'status' | 'category' | 'product';
    sortOrder?: 'asc' | 'desc';
}

export function useSeasons(farmId?: string, options: UseSeasonsOptions = {}) {
    const { search, sortBy, sortOrder = 'desc' } = options;

    const query = useQuery({
        queryKey: ['seasons', farmId],
        queryFn: () => (farmId ? getSeasonsByFarm(farmId) : Promise.resolve([])),
        enabled: !!farmId,
    });

    const seasons = useMemo(() => {
        if (!query.data) return [];
        let result = [...query.data];

        // Filter
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(s =>
                s.seasonName?.toLowerCase().includes(lowerSearch) ||
                s.product?.productName?.toLowerCase().includes(lowerSearch) ||
                s.product?.category?.categoryName?.toLowerCase().includes(lowerSearch)
            );
        }

        // Sort
        if (sortBy) {
            result.sort((a, b) => {
                let valA: any = '';
                let valB: any = '';

                switch (sortBy) {
                    case 'date':
                        valA = new Date(a.startDate || 0).getTime();
                        valB = new Date(b.startDate || 0).getTime();
                        break;
                    case 'status':
                        valA = a.status || '';
                        valB = b.status || '';
                        break;
                    case 'category':
                        valA = a.product?.category?.categoryName || '';
                        valB = b.product?.category?.categoryName || '';
                        break;
                    case 'product':
                        valA = a.product?.productName || '';
                        valB = b.product?.productName || '';
                        break;
                    default:
                        return 0;
                }

                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [query.data, search, sortBy, sortOrder]);

    return { ...query, seasons };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSeason } from '@/api/services/seasonService';

export function useCreateSeason() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSeason,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seasons'] });
        },
    });
}
