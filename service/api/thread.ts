import api from "../instances/axiosInstance";

export const createThread = async (connection_id: string, title: string) => {
  try {
    const { data } = await api.post("/threads", {
      connection_id,
      title,
    });
    return data;
  } catch (error) {
    console.log("Error while creating thread", error);
    return error;
  }
};

export const getThreadsForConnection = async (connection_id: string) => {
  try {
    const { data } = await api.get(`/threads/${connection_id}`);
    return data;
  } catch (error) {
    console.log("error while fetching threads for connection", error);
  }
};

export const getThreadInfo = async (thread_id: string) => {
  try {
    const { data } = await api.get(`/threads/thread/${thread_id}`);
    return data;
  } catch (error) {
    console.log("error while fetching threads for connection", error);
  }
};

export const getThreadMessages = async (thread_id: string) => {
  try {
    const { data } = await api.get(`/connections/thread/${thread_id}`);
    return data;
  } catch (error) {
    console.log("error while fetching thread messages", error);
  }
};
