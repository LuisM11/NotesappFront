import { useMutation } from '@tanstack/react-query';
import { deleteNote, patchNote, postNote, putNote } from '../api/NotesAPI';
import { useQueryClient } from '@tanstack/react-query';
export const useNotesMutation = (type,openNotification) => {
    const queryClient = useQueryClient();
    const mutationsFunctions ={
        post: postNote,
        delete: deleteNote,
        patch: patchNote,
        put: putNote,
        
    }
    const mutation = useMutation({
        mutationFn: mutationsFunctions[type],
        
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['getNotes'] });
            queryClient.invalidateQueries({ queryKey: ['getCategories'] });
            openNotification();
            
        },
        onError: (error) => {
        },
        
        
    });
    return mutation;
}