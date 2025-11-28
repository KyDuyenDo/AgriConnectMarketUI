"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const BASE_URL = "https://provinces.open-api.vn/api"

export interface Province {
    code: number
    name: string
    codename?: string
    division_type?: string
    phone_code?: string
}

export interface District {
    code: number
    name: string
    codename?: string
    division_type?: string
    province_code?: number
}

export interface Ward {
    code: number
    name: string
    codename?: string
    division_type?: string
    district_code?: number
}

export function useVietnamLocations() {
    const [provinces, setProvinces] = useState<Province[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])

    const [loadingProvinces, setLoadingProvinces] = useState(false)
    const [loadingDistricts, setLoadingDistricts] = useState(false)
    const [loadingWards, setLoadingWards] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const abortControllerRef = useRef({
        provinces: null as AbortController | null,
        districts: null as AbortController | null,
        wards: null as AbortController | null,
    })

    const cacheRef = useRef({
        provinces: null as Province[] | null,
        districtsByProvince: {} as Record<number, District[]>,
        wardsByDistrict: {} as Record<number, Ward[]>,
    })

    useEffect(() => {
        let mounted = true
        fetchProvinces().then(() => {
            if (mounted) {
                // Component still mounted after fetch completes
            }
        })
        return () => {
            mounted = false
            abortControllerRef.current.provinces?.abort()
        }
    }, [])

    const fetchProvinces = useCallback(async () => {
        if (cacheRef.current.provinces) {
            setProvinces(cacheRef.current.provinces)
            return
        }

        abortControllerRef.current.provinces?.abort()
        const abortController = new AbortController()
        abortControllerRef.current.provinces = abortController

        setLoadingProvinces(true)
        setError(null)
        try {
            const res = await fetch(`${BASE_URL}/?depth=1`, { signal: abortController.signal })
            if (!res.ok) throw new Error("Failed to fetch provinces")
            const data = (await res.json()) as Province[]
            // Ensure data is an array
            const safeData = Array.isArray(data) ? data : []
            setProvinces(safeData)
            cacheRef.current.provinces = safeData
        } catch (err: any) {
            if (err.name !== "AbortError") {
                setError(err?.message ?? "Unknown error")
                setProvinces([])
            }
        } finally {
            setLoadingProvinces(false)
        }
    }, [])

    const fetchDistricts = useCallback(async (provinceCode: number) => {
        if (!provinceCode) return
        const cached = cacheRef.current.districtsByProvince[provinceCode]
        if (cached) {
            setDistricts(cached)
            return
        }

        abortControllerRef.current.districts?.abort()
        const abortController = new AbortController()
        abortControllerRef.current.districts = abortController

        setLoadingDistricts(true)
        setError(null)
        try {
            const res = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`, { signal: abortController.signal })
            if (!res.ok) throw new Error("Failed to fetch districts")
            const data = await res.json()
            // API returns province object with .districts
            const districtsList = (Array.isArray(data?.districts) ? data.districts : []) as District[]
            setDistricts(districtsList)
            cacheRef.current.districtsByProvince[provinceCode] = districtsList
        } catch (err: any) {
            if (err.name !== "AbortError") {
                setError(err?.message ?? "Unknown error")
                setDistricts([])
            }
        } finally {
            setLoadingDistricts(false)
        }
    }, [])

    const fetchWards = useCallback(async (districtCode: number) => {
        if (!districtCode) return
        const cached = cacheRef.current.wardsByDistrict[districtCode]
        if (cached) {
            setWards(cached)
            return
        }

        abortControllerRef.current.wards?.abort()
        const abortController = new AbortController()
        abortControllerRef.current.wards = abortController

        setLoadingWards(true)
        setError(null)
        try {
            const res = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`, { signal: abortController.signal })
            if (!res.ok) throw new Error("Failed to fetch wards")
            const data = await res.json()
            // API returns district object with .wards
            const wardsList = (Array.isArray(data?.wards) ? data.wards : []) as Ward[]
            setWards(wardsList)
            cacheRef.current.wardsByDistrict[districtCode] = wardsList
        } catch (err: any) {
            if (err.name !== "AbortError") {
                setError(err?.message ?? "Unknown error")
                setWards([])
            }
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
