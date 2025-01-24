
import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { SingleTransactions } from "src/pages/transactions/transaction-list/types";

export function useGetAllTransaction(serviceType: (string | number)[] | null = null) {

  // const statusParams = serviceType && serviceType[0] ? `status=${serviceType[0]}&` : '';
  // const transactionTypeParams = serviceType && serviceType[1] ? `transaction_type=${serviceType[1]}&` : '';
  // const sourceCurrencyParams = serviceType && serviceType[2] ? `source_currency=${serviceType[2]}&` : '';
  // const destinationCurrencyParams = serviceType && serviceType[3] ? `destination_currency=${serviceType[3]}&` : '';
  // const paymentMethodParams = serviceType && serviceType[4] ? `payment_method=${serviceType[4]}&` : '';
  // const dateRangeParams = serviceType && serviceType[5] ? `date_range=${serviceType[5]}&` : '';
  // const paginationParams = serviceType && serviceType[6] ? `page_size=${serviceType[6]}&` : '';
  // const tenantNameParams = serviceType && serviceType[7] ? `tenant=${serviceType[7]}` : '';

  // return useQuery({
  //   queryKey: ["allTransaction", ...(serviceType ? [serviceType[0], serviceType[1], serviceType[2], serviceType[3], serviceType[4], serviceType[5], serviceType[6], serviceType[7]] : [])],

  //   queryFn: function (){
  //     const result = axiosInstance.get(`/admin/transactions/?${statusParams}${transactionTypeParams}${sourceCurrencyParams}${destinationCurrencyParams}${paymentMethodParams}${dateRangeParams}${paginationParams}${tenantNameParams}`);

  //     return result.then(response => response.data);
  //   },
  // });

  return useQuery({
    queryKey: ["allTransaction", ...(serviceType ? serviceType : [])],

    queryFn: function () {
      console.log('serviceType', serviceType)

      const params = ['status', 'transaction_type', 'source_currency', 'destination_currency', 'payment_method', 'date_range', 'page_size', 'tenant']

      // Construct the URL parameters
      const urlParams = serviceType?.map((value, index) => `${params[index]}=${value}`).join('&');

      // Make the request
      const result = axiosInstance.get(`/admin/transactions/?${urlParams}`);

      return result.then(response => response.data);
    },
  });
}


export function useGetSingleTransaction(transactionId: string) {
  return useQuery({
    queryKey: ['transaction', transactionId], // Using an array as the query key with the tenantId
    queryFn: function (): Promise<AxiosResponse<SingleTransactions>> {
      return axiosInstance.get(`/admin/transactions/detail/${transactionId}`);
    },
  });
}
