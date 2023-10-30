"use client";
import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "@/services/InformationService";

const KazakhTourismResultsClient = ({ lng }) => {
  const visitedKazakhstan = useQuery({
    queryKey: ["kazakhTourismAnalytics"],
    queryFn: async () => {
      const { data } = await ServicesService.getKazakhTourismAnalytics(lng);
      return data;
    },
  });

  console.log({ visitedKazakhstan });

  return <div>sw</div>;
};

export default KazakhTourismResultsClient;
