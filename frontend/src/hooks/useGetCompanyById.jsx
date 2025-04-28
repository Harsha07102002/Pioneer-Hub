import { setSingleCompany } from '@/components/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = ({ companyId }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (!companyId) return;

        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.error("Error fetching company by ID:", error)
            }
        }

        fetchSingleCompany()
    }, [companyId, dispatch])
}

export default useGetCompanyById
