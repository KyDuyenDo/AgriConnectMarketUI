import { useState, useEffect } from "react";
import { debounce } from "@/utils/helpers";

/**
 * Hook for debounced search value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Hook for pagination
 */
export function usePagination(initialPage: number = 1, initialLimit: number = 10) {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);

    const nextPage = () => setPage((prev) => prev + 1);
    const prevPage = () => setPage((prev) => Math.max(1, prev - 1));
    const goToPage = (newPage: number) => setPage(Math.max(1, newPage));
    const resetPage = () => setPage(initialPage);

    return {
        page,
        limit,
        setLimit,
        nextPage,
        prevPage,
        goToPage,
        resetPage,
    };
}
