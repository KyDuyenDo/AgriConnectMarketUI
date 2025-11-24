import { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"

// GHTK API configuration
const GHTK_BASE_URL = "https://services.giaohangtietkiem.vn/services/address"
// TODO: Get token from GHTK dashboard
const GHTK_TOKEN = "YOUR_GHTK_TOKEN_HERE"

export interface GHTKProvince {
    id: string
    name: string
}

export interface GHTKDistrict {
    id: string
    name: string
    provinceId: string
}

export interface GHTKWard {
    id: string
    name: string
    districtId: string
}

interface GHTKResponse<T> {
    success: boolean
    message: string
    data: T
}

export function useGHTKLocation() {
    const [provinces, setProvinces] = useState<GHTKProvince[]>([])
    const [districts, setDistricts] = useState<GHTKDistrict[]>([])
    const [wards, setWards] = useState<GHTKWard[]>([])

    const [loadingProvinces, setLoadingProvinces] = useState(false)
    const [loadingDistricts, setLoadingDistricts] = useState(false)
    const [loadingWards, setLoadingWards] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const cacheRef = useRef({
        provinces: null as GHTKProvince[] | null,
        districtsByProvince: {} as Record<string, GHTKDistrict[]>,
        wardsByDistrict: {} as Record<string, GHTKWard[]>,
    })

    // Auto-fetch provinces on mount
    useEffect(() => {
        fetchProvinces()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchProvinces = useCallback(async () => {
        // Return cached data if available
        if (cacheRef.current.provinces) {
            setProvinces(cacheRef.current.provinces)
            return
        }

        setLoadingProvinces(true)
        setError(null)
        try {
            const response = await axios.get<GHTKResponse<GHTKProvince[]>>(
                `${GHTK_BASE_URL}/list/province`,
                {
                    headers: {
                        'Token': GHTK_TOKEN,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.data.success) {
                const data = response.data.data
                setProvinces(data)
                cacheRef.current.provinces = data
            } else {
                throw new Error(response.data.message || "Failed to fetch provinces")
            }
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || err?.message || "Unknown error"
            setError(errorMsg)
            console.error("Error fetching GHTK provinces:", err)
        } finally {
            setLoadingProvinces(false)
        }
    }, [])

    const fetchDistricts = useCallback(async (provinceId: string) => {
        if (!provinceId) {
            console.warn("Province ID is required to fetch districts")
            return
        }

        // Return cached data if available
        const cached = cacheRef.current.districtsByProvince[provinceId]
        if (cached) {
            setDistricts(cached)
            return
        }

        setLoadingDistricts(true)
        setError(null)
        try {
            const response = await axios.get<GHTKResponse<GHTKDistrict[]>>(
                `${GHTK_BASE_URL}/list/district?province=${provinceId}`,
                {
                    headers: {
                        'Token': GHTK_TOKEN,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.data.success) {
                const districtsList = response.data.data
                setDistricts(districtsList)
                cacheRef.current.districtsByProvince[provinceId] = districtsList
            } else {
                throw new Error(response.data.message || "Failed to fetch districts")
            }
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || err?.message || "Unknown error"
            setError(errorMsg)
            console.error("Error fetching GHTK districts:", err)
        } finally {
            setLoadingDistricts(false)
        }
    }, [])

    const fetchWards = useCallback(async (districtId: string) => {
        if (!districtId) {
            console.warn("District ID is required to fetch wards")
            return
        }

        // Return cached data if available
        const cached = cacheRef.current.wardsByDistrict[districtId]
        if (cached) {
            setWards(cached)
            return
        }

        setLoadingWards(true)
        setError(null)
        try {
            const response = await axios.get<GHTKResponse<GHTKWard[]>>(
                `${GHTK_BASE_URL}/list/ward?district=${districtId}`,
                {
                    headers: {
                        'Token': GHTK_TOKEN,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.data.success) {
                const wardsList = response.data.data
                setWards(wardsList)
                cacheRef.current.wardsByDistrict[districtId] = wardsList
            } else {
                throw new Error(response.data.message || "Failed to fetch wards")
            }
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || err?.message || "Unknown error"
            setError(errorMsg)
            console.error("Error fetching GHTK wards:", err)
        } finally {
            setLoadingWards(false)
        }
    }, [])

    const clearDistricts = useCallback(() => {
        setDistricts([])
        setWards([])
    }, [])

    const clearWards = useCallback(() => {
        setWards([])
    }, [])

    return {
        provinces,
        districts,
        wards,
        loading: {
            provinces: loadingProvinces,
            districts: loadingDistricts,
            wards: loadingWards,
        },
        error,
        fetchProvinces,
        fetchDistricts,
        fetchWards,
        clearDistricts,
        clearWards,
    }
}
