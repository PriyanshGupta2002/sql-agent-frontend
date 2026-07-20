import api from "../instances/axiosInstance";

export const createConnection = async (connection: createConnectionPayload) => {
  try {
    const { data } = await api.post("/connections", connection);
    return data;
  } catch (error) {
    console.log("Error while creating connection", error);
    return error;
  }
};
export const listConnections = async () => {
  try {
    const { data } = await api.get("/connections");
    return data;
  } catch (error) {
    console.log("Error while creating connection", error);
    return error;
  }
};
export const deleteConnection = async (connectionId: string) => {
  try {
    const { data } = await api.delete(`/connections/${connectionId}`);
    return data;
  } catch (error) {
    console.log("Error while creating connection", error);
    return error;
  }
};
