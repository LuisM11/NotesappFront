import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/NotesAPI"


export const useCategoriesFetch = () => {
    
    const notesFetch = useQuery({
        queryKey: ['getCategories'],
        queryFn: getCategories,
        retry: false,
        
    })
    return notesFetch;

}