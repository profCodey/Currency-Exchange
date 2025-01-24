
import { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { GetPartnerCategory } from "./types";
import toast from 'react-hot-toast'

export function useGetPartnerCategory() {
  return useQuery({
    queryKey: ["partner-category"],
    queryFn: function (): Promise<AxiosResponse<GetPartnerCategory[]>> {
      return axiosInstance.get("/admin/partner/category/");
    },
    select: (response) => response.data.results,
  });
}

export function useCreatePartnerCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axiosInstance.post("/admin/partner/category/", data);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: function (response) {
      console.log('Create success', response);
      toast.success('Category created successfully')

      queryClient.invalidateQueries(['partner-category'] as InvalidateQueryFilters);
    },
    onError: function (error) {
      console.error('Create failure', error);
      throw error;
    },
  });
}

export function useUpdatePartnerCategory() {
  const queryClient= useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      try {
        const response = await axiosInstance.patch(`/admin/partner/category/${id}/`, data);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: function (response) {
      console.log('Update success', response);
      toast.success('Category updated successfully')
      queryClient.invalidateQueries(['partner-category'] as InvalidateQueryFilters);

    },
    onError: function (error) {
      console.error('Update failure', error);
      throw error;
    },



  });
}

export function useDeletePartnerCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/admin/partner/category/${id}/`)

        return response.data
      } catch (error) {
        throw error
      }
    },

    onSuccess: function (response) {
      console.log('Delete success', response)
      toast.success('Partner category deleted successfully')
      queryClient.invalidateQueries(['partner-category'] as InvalidateQueryFilters)
    },
    onError: function (error) {
      console.error('Delete failure', error)
      throw error
    }
  })
}


