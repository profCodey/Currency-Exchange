
import { AxiosResponse, AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { GetAllGlobalLimit, AddGlobalLimit } from "./types";
import { ErrorItem } from "./types";
import { queryClient } from "src/pages/_app";
import toast from 'react-hot-toast'


export function useGetGlobalLimit() {
  return useQuery({
    queryKey: ["global_limit"],
    queryFn: function (): Promise<AxiosResponse<GetAllGlobalLimit[]>> {
      return axiosInstance.get("/admin/compliance/globallimit");
    },

    //@ts-ignore
    select: (response) => response.data.results,
  });
}

export function useAddGlobalLimit(cb?: () => void, cb2?: () => void) {
  return useMutation({
        mutationFn: (payload: AddGlobalLimit) => axiosInstance.post(`/admin/compliance/globallimit/`, payload),
        onSuccess: function () {
          toast.success('Global Limit added successfully');
          cb && cb();
          cb2 && cb2();
        },

        // onError: function (error: AxiosError<{ errors: ErrorItem }>) {

        // },
        onSettled: function () {
          queryClient.invalidateQueries({ queryKey: ["global_limit"] });
        },
      });
    }

    export function useUpdateGlobalLimit(globalId: any, cb?: () => void) {
      return useMutation({
            mutationFn: (payload: AddGlobalLimit) => axiosInstance.patch(`/admin/compliance/globallimit/${globalId}/`, payload),
            onSuccess: function () {
              toast.success('Global limit updated successfully');
              cb && cb();
            },

            // onError: function (error: AxiosError<{ errors: ErrorItem }>) {
            //   console.log('error', error)
            //   const err = error?.response?.data as ErrorItem
            //   for (const value of err) {
            //     if (err) toast.error(value.detail);
            //   }
            // },
            onSettled: function () {
              queryClient.invalidateQueries({ queryKey: ["global_limit"] });
            },
          });
        }

        export function useDeleteGlobalLimit(globalId: string, cb?: () => void) {
          return useMutation({
                mutationFn: () => axiosInstance.delete(`/admin/compliance/globallimit/${globalId}/`),
                onSuccess: function () {
                  toast.success('Global Limit deleted successfully');
                  cb && cb();
                },
                onError: function (error: AxiosError<{ errors: ErrorItem }>) {
                  const err = error?.response?.data.errors as ErrorItem;

                  //@ts-ignore
                  for (const value of err) {
                    toast.error(value.detail);
                  }
                },
                onSettled: function () {
                  queryClient.invalidateQueries({ queryKey: ["global_limit"] });
                },
              });
            }
