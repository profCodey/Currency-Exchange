import { AxiosResponse, AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { GetAllCurrencies, GetCurrencyDetails } from "./types";
import { ErrorItem } from "./types";
import { queryClient } from "src/pages/_app";
import toast from 'react-hot-toast'

export function useGetCurrencies() {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: function (): Promise<AxiosResponse<GetAllCurrencies[]>> {
      return axiosInstance.get("/admin/currency/");
    },

    //@ts-ignore
    select: (response) => response.data.results,
  });
}

export function useGetCurrencyDetails(currencyId: string) {
  return useQuery({
    queryKey: ['currencies', currencyId],
    queryFn: function (): Promise<AxiosResponse<GetCurrencyDetails>> {
      return axiosInstance.get(`/admin/currency/${currencyId}`);
    },
    select: (response) => response.data,
  });
}

export function useUpdateCurrency(currencyId: string, cb?: () => void) {
const res = useMutation({
    mutationFn: (payload: GetCurrencyDetails) => axiosInstance.patch(`/admin/currency/${currencyId}/`, payload),
    onSuccess: function () {
      toast.success('Currency updated successfully');
      cb && cb();
    },

    onSettled: function () {
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
  });

  return res
}

export function useCreateCurrency(cb?: () => void, cb2?: () => void) {
return useMutation({
      mutationFn: (payload: GetCurrencyDetails) => axiosInstance.post(`/admin/currency/`, payload),
      onSuccess: function () {
        toast.success('Currency added successfully');
        cb && cb();
        cb2 && cb2();
      },

      onSettled: function () {
        queryClient.invalidateQueries({ queryKey: ["currencies"] });
      },
    });
  }
