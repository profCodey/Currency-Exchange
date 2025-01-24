
import { AxiosResponse } from "axios";
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { GetAllTenants, StaffRoles, GetAllPurposes } from "./types";
import { GetTenantDetails } from "./types";

import { useRouter } from "next/router";

export function useGetAllTenants() {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: function (): Promise<AxiosResponse<GetAllTenants[]>> {
      return axiosInstance.get("/admin/tenants");
    },
  });
}

export function useGetAllPurposes() {
  return useQuery({
    queryKey: ["purposes"],
    queryFn: function (): Promise<AxiosResponse<GetAllPurposes[]>> {
      return axiosInstance.get("/admin/transactions/purposes/")
    }
  })
}

export function useGetAllRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: function (): Promise<AxiosResponse<StaffRoles[]>> {
      return axiosInstance.get("/admin/staff-roles/")
    }
})
}

export function useGetTenantDetails(tenantId: string) {
  return useQuery({
    queryKey: ['tenant', tenantId], // Using an array as the query key with the tenantId
    queryFn: function (): Promise<AxiosResponse<GetTenantDetails>> {
      return axiosInstance.get(`/admin/tenants/${tenantId}`);
    },
  });
}


export function useCreateNewTenant() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post('/admin/partner/register/', data);
        
        return response.data; // Return the data if successful
      } catch (error) {
        // Handle axios errors consistently here
        if ((error as any).response && (error as any).response.data.type === 'validation_error') {
          // Validation error from the backend
          const validationErrors = (error as any).response.data.errors; // Access the error array
          // Build a user-friendly error message string
          let errorMessage = 'Please fix the following errors:\n';
          for (const err of validationErrors) {
            errorMessage += `${err.detail}\n`;
          }
          throw new Error(errorMessage);
        } else if ((error as any).response) {
          // Server-side error with status code, data
          // Extract a user-friendly error message from the response, avoiding sensitive details
          // ... (similar to previous version)
        } else if ((error as any).request) {
          // Network error during transmission
          throw new Error('Network error while creating tenant');
        } else {
          // Other unexpected error
          throw new Error('An unknown error occurred. Please try again later.');
        }
      }
    },
    onSuccess: (response) => {
      const tenantId = response.id;

      if (tenantId) {
        toast.success('Tenant created successfully!', { duration: 2000 });
        router.push(`/tenants/tenant-details/${tenantId}`);
      } else {
        console.error('Error: Tenant ID is undefined in the response');
        throw new Error('Tenant ID not found in response'); // Consider raising a more meaningful error
      }
    },
    onError: (error) => {
      console.error('Error creating tenant:', error);
      toast.error(error.message || 'Unable to create tenant. Please try again later.');
    },
  });

  return mutation;
}

export function useCreateNewRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axiosInstance.post("/admin/staff-roles/", data);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: function (response) {
      console.log('Create success', response);
      toast.success('Role created successfully')

      queryClient.invalidateQueries(['roles'] as InvalidateQueryFilters);
    },
    onError: function (error) {
      console.error('Create failure', error);
      throw error;
    },
  });
}
export function useCreateNewPurpose() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await axiosInstance.post("/admin/transactions/purposes/", data);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: function (response) {
      console.log('Create success', response);
      toast.success('Purpose created successfully')

      queryClient.invalidateQueries(['purposes'] as InvalidateQueryFilters);
    },
    onError: function (error) {
      console.error('Create failure', error);
      throw error;
    },
  });
}


export function useUpdatePurpose() {
const queryClient= useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      try {
        const response = await axiosInstance.patch(`/admin/transactions/purposes/${id}/`, data);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: function (response) {
      console.log('Update success', response);
      toast.success('Purpose updated successfully')
      queryClient.invalidateQueries(['purposes'] as InvalidateQueryFilters);

    },
    onError: function (error) {
      console.error('Update failure', error);
      throw error;
    },



  });
}
