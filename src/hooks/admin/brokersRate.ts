
import { AxiosResponse, AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { GetAllBrokersRate, AddBrokersRate } from "./types";
import { ErrorItem } from "./types";
import { queryClient } from "src/pages/_app";
import toast from 'react-hot-toast'


export function useGetBrokersRate() {
  return useQuery({
    queryKey: ["rates"],
    queryFn: function (): Promise<AxiosResponse<GetAllBrokersRate[]>> {
      return axiosInstance.get("/admin/transactions/broker-rate/");
    },
    select: (response) => response.data,
  });
}

export function useAddBrokersRate(cb?: () => void) {
  return useMutation({
        mutationFn: (payload: AddBrokersRate) => axiosInstance.post(`/admin/transactions/broker-rate/`, payload),
        onSuccess: function () {
          toast.success('Rate added successfully');
          cb && cb();
        },
        onError: function (error: AxiosError<{ errors: ErrorItem }>) {
          const err = error?.response?.data.errors as ErrorItem;
          for (const value of err) {
            toast.error(value.detail);
          }
        },
        onSettled: function () {
          queryClient.invalidateQueries({ queryKey: ["rates"] });
        },
      });
    }

    export function useUpdateBrokersRate(brokersId: any, cb?: () => void) {
      return useMutation({
            mutationFn: (payload: AddBrokersRate) => axiosInstance.put(`/admin/transactions/broker-rate/${brokersId}/`, payload),
            onSuccess: function () {
              toast.success('Rate updated successfully');
              cb && cb();
            },
            onError: function (error: AxiosError<{ errors: ErrorItem }>) {
              const err = error?.response?.data.errors as ErrorItem;
              for (const value of err) {
                toast.error(value.detail);
              }
            },
            onSettled: function () {
              queryClient.invalidateQueries({ queryKey: ["rates"] });
            },
          });
        }

        export function useDeleteBrokersRate(brokersId: string, cb?: () => void) {
          return useMutation({
                mutationFn: () => axiosInstance.delete(`/admin/transactions/broker-rate/${brokersId}/`),
                onSuccess: function () {
                  toast.success('Rate deleted successfully');
                  cb && cb();
                },
                onError: function (error: AxiosError<{ errors: ErrorItem }>) {
                  const err = error?.response?.data.errors as ErrorItem;
                  for (const value of err) {
                    toast.error(value.detail);
                  }
                },
                onSettled: function () {
                  queryClient.invalidateQueries({ queryKey: ["rates"] });
                },
              });
            }
