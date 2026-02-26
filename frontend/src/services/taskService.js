import API from "./api";

export const getTasks = async () => {
    const response = await API.get("/tasks");
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await API.post("/tasks", taskData);
    return response.data;
};