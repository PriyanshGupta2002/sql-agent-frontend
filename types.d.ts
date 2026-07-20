interface Connections {
  alias: string;
  connection_string: string;
  database_type: string;
  color: string;
  created_at: string;
  id?: string;
}

interface Thread {
  name: string;
  id: string;
  createdAt: string;
}

interface createConnectionPayload {
  alias: string;
  database_type: string;
  connection_string: string;
  color: string;
}

interface ThreadResponse {
  id: string;
  connection_id: string;
  title: string;
  created_at: string;
}
