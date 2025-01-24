import { AxiosResponse } from 'axios'
import { useQuery, useQueryClient, useMutation, InvalidateQueryFilters } from '@tanstack/react-query'
import { axiosInstance } from '..'
import toast from 'react-hot-toast'
import { GetRateNotification } from './types'

export function useGetRateNotifications() {
  return useQuery({
    queryKey: ['rate-ntofications'],
    queryFn: function (): Promise<AxiosResponse<GetRateNotification[]>> {
      return axiosInstance.get('/admin/notifications/rateupdate/list/')
    },
    select: response => response.data.results
  })
}

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: function (): Promise<AxiosResponse<GetRateNotification[]>> {
      return axiosInstance.get('/admin/notifications/announcement/')
    },
    select: response => response.data.results
  })
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (announcement: { subject: string; message: string; type: string }) => {
      try {
        const response = await axiosInstance.post('/admin/notifications/announcement/', announcement)

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function () {
      toast.success('Announcement has been created')

      queryClient.invalidateQueries(['announcements'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (announcement: { id: string; subject: string; message: string; type: string }) => {
      try {
        const response = await axiosInstance.put(`/admin/notifications/announcement/${announcement.id}/`, announcement)

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function () {
      toast.success('Announcement has been updated')

      queryClient.invalidateQueries(['announcements'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/admin/notifications/announcement/${id}/`)

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function () {
      toast.success('Announcement has been deleted')

      queryClient.invalidateQueries(['announcements'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}

export function usePublishAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axiosInstance.post(`/admin/notifications/announcement/${id}/publish/`)

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function () {
      toast.success('Announcement has been published')

      queryClient.invalidateQueries(['announcements'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}

export function useSendSampleAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (announcement: { id: string; email: string }) => {
      try {
        const response = await axiosInstance.post(
          `/admin/notifications/announcement/${announcement.id}/send_sample/`,
          announcement
        )

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function (data) {
      if (data && data.message) {
        // Assuming the success message is provided in the 'successMessage' property
        toast.success(data.message)
      } else {
        toast.success('Sample announcement has been sent')
      }
      queryClient.invalidateQueries(['announcements'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      if (error.response && error.response.data && error.response.data.type === 'validation_error') {
        const validationError = error.response.data.errors[0]
        toast.error(`${validationError.detail} (${validationError.attr})`)
      } else {
        toast.error('An error occurred while sending the sample announcement')
      }
      console.error('Send sample announcement failure', error)
      throw error
    }
  })
}

export function useClearNotifications() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.post('/admin/notifications/rateupdate/clearall/')

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function () {
      toast.success('Rate notifications have been cleared')

      queryClient.invalidateQueries(['rate-notifications'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}

export function useSendRateNotifications() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.post('/admin/notifications/rateupdate/send/')

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: function () {
      toast.success('Rate notification has been sent to all users')

      queryClient.invalidateQueries(['rate-notifications'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Create failure', error)
      throw error
    }
  })
}
