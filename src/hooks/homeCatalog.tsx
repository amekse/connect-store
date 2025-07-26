import { useQuery } from "@tanstack/react-query";
import type { ApparelCatalog } from "../types";

function useFetchHomeCatalog() {
    const { data: apparelCatalog, isPending, error } = useQuery({
        queryKey: ['home','catalog'],
        queryFn: async():Promise<ApparelCatalog> => fetch("https://closet-recruiting-api.azurewebsites.net/api/data").then(res => res.json()),
        staleTime: 1000 * 60 * 60 * 24,
    })

    return {
        apparelCatalog,
        isPending,
        error
    }
}

export default useFetchHomeCatalog;