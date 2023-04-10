export const searchNote = (array,id) => {  
    return array.findIndex((note) => note.id === id);
}