
import { AxiosResponse, AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { GetAllUserLimit, AddUserLimit } from "./types";
import { ErrorItem } from "./types";
import { queryClient } from "src/pages/_app";
import toast from 'react-hot-toast'


export function useGetUserLimit() {
  return useQuery({
    queryKey: ["user_limit"],
    queryFn: function (): Promise<AxiosResponse<GetAllUserLimit[]>> {
      return axiosInstance.get("/admin/compliance/userlimit/");
    },

    //@ts-ignore
    select: (response) => response.data.results,
  });
}

export function useAddUserLimit(cb?: () => void, cb2?: () => void) {
  return useMutation({
        mutationFn: (payload: AddUserLimit) => axiosInstance.post(`/admin/compliance/userlimit/`, payload),
        onSuccess: function () {
          toast.success('User Limit added successfully');
          cb && cb();
          cb2 && cb2();
        },

        // onError: function (error: AxiosError<{ errors: ErrorItem }>) {
        //   const err = error?.response?.data.errors as ErrorItem;
        //   for (const value of err) {
        //     toast.error(value.detail);
        //   }
        // },
        onSettled: function () {
          queryClient.invalidateQueries({ queryKey: ["user_limit"] });
        },
      });
    }

    export function useUpdateUserLimit(userId: any, cb?: () => void) {
      return useMutation({
            mutationFn: (payload: AddUserLimit) => axiosInstance.patch(`/admin/compliance/userlimit/${userId}/`, payload),
            onSuccess: function () {
              toast.success('User limit updated successfully');
              cb && cb();
            },

            // onError: function (error: AxiosError<{ errors: ErrorItem }>) {
            //   const err = error?.response?.data.errors as ErrorItem;
            //   for (const value of err) {
            //     toast.error(value.detail);
            //   }
            // },
            onSettled: function () {
              queryClient.invalidateQueries({ queryKey: ["user_limit"] });
            },
          });
        }

        export function useDeleteUserLimit(userId: string, cb?: () => void) {
          return useMutation({
                mutationFn: () => axiosInstance.delete(`/admin/compliance/userlimit/${userId}/`),
                onSuccess: function () {
                  toast.success('User Limit deleted successfully');
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
                  queryClient.invalidateQueries({ queryKey: ["user_limit"] });
                },
              });
            }
