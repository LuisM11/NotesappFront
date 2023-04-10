import { useQuery } from "@tanstack/react-query";
import { getNote, getNotes } from "../api/NotesAPI"


export const useNotesQuery = (isArchived) => {
    
    const notesFetch = useQuery({
        queryKey: ['getNotes', isArchived],
        queryFn: getNotes,
        retry: false,
        
    })
    return notesFetch;

}

export const useNoteQuery = (id,form) => {

    const noteFetch = useQuery({
        queryKey: ['getNote', id],
        queryFn: getNote,
        retry: false,
        enabled: !!id,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            form.setFieldsValue({
                title: data.data.title ,
                content: data.data.content, 
                category:  data.data.categories.map((x)=>{
                    return String(x.id)})                
            })
        }
        
    })
    return noteFetch;
}
