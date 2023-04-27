import axios from "axios";

export const defaultApi = axios.create({
  baseURL: "https://notesapp-backend.herokuapp.com/api/v1/notes",
});

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms*1000));

export const getNotes = async ({ queryKey }) => {
    await sleep(1);
    return defaultApi.get(`/notes?archived=${queryKey[1]}`);
  };
export const getNote = async ({ queryKey }) => {
    await sleep(1); 
    return defaultApi.get(`/notes/${queryKey[1]}`);
  };

export const getCategories = async ({ queryKey }) => {
    await sleep(1);
    return defaultApi.get("/categories");
  };

export const postNote = async (note) => {
    return defaultApi.post("/notes", note);
  }

export const deleteNote = async (id) => {
    return defaultApi.delete(`/notes/${id}`);
  }
export const patchNote = async (id) => {
    return defaultApi.patch(`/notes/${id}/archived`);
  }

export const putNote = async ({id, note}) => {
  console.log( note);
    return defaultApi.put(`/notes/${id}`, note);
  }