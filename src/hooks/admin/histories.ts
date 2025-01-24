import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { GetAllHistories } from "./types";

export function useGetAllHistories(appname: string, modelname: string) {
  return useQuery({
    queryKey: ["histories", appname, modelname], // Update queryKey to include appname and modelname
    queryFn: function (): Promise<AxiosResponse<GetAllHistories[]>> {
      return axiosInstance.get(`/admin/histories/${appname}/${modelname}/`);
    },
  });
}
