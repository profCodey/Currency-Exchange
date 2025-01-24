import { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query'
import { axiosInstance } from '..'
import { GetAllBanks, GetAllOfflineAccounts } from './types'

export function useGetAllBanks() {
  return useQuery({
    queryKey: ['banks'],
    queryFn: function (): Promise<AxiosResponse<GetAllBanks[]>> {
      return axiosInstance.get('/admin/bank/?currency_id=&name=')
    }
  })
}

export function useGetAllOfflineAccounts() {
  return useQuery({
    queryKey: ['offlineAccounts'],
    queryFn: function (): Promise<AxiosResponse<GetAllOfflineAccounts[]>> {
      return axiosInstance.get('/admin/transactions/offline-accountdetail/')
    }
  })
}

export function useDeleteOfflineAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/admin/transactions/offline-accountdetail/${id}/`)

        return response.data
      } catch (error) {
        throw error
      }
    },

    onSuccess: function (response) {
      console.log('Delete success', response)
      toast.success('Offline account deleted successfully')
      queryClient.invalidateQueries(['offlineAccounts'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Delete failure', error)
      throw error
    }
  })
}

export function useCreateNewOfflineAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axiosInstance.post('/admin/transactions/offline-accountdetail/', data)

        return response.data
      } catch (error) {
        throw error
      }
    },

    onSuccess: function (response) {
      console.log('Create success', response)
      toast.success('Offline account created successfully')
      queryClient.invalidateQueries(['offlineAccounts'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}

export function useUpdateOfflineAccountDetails() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      try {
        const response = await axiosInstance.patch(`/admin/transactions/offline-accountdetail/${id}/`, data)

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function (response) {
      console.log('Update success', response)
      toast.success('Account details updated successfully')
      queryClient.invalidateQueries(['offlineAccounts'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Update failure', error)
      throw error
    }
  })
}

export function useCreateNewBank() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axiosInstance.post('/admin/bank/', data)

        return response.data
      } catch (error) {
        throw error
      }
    },

    onSuccess: function (response) {
      console.log('Create success', response)
      toast.success('Bank created successfully')
      queryClient.invalidateQueries(['banks'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}

export function useGetBankDetails(bankId: string) {
  return useQuery({
    queryKey: ['bank', bankId],
    queryFn: function (): Promise<AxiosResponse<GetAllBanks>> {
      return axiosInstance.get(`/admin/bank/${bankId}/`)
    }
  })
}

export function useUpdateBank() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      try {
        const response = await axiosInstance.patch(`/admin/bank/${id}/`, data)

        return response.data
      } catch (error) {
        throw error
      }
    },

    onSuccess: function (response) {
      console.log('Update success', response)
      toast.success('Bank details updated successfully')
      queryClient.invalidateQueries(['bank'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Update failure', error)
      throw error
    }
  })
}
