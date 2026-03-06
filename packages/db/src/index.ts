export type DatabaseAdapter = {
  name: string;
  connectionStringEnv: string;
};

export const defaultDatabaseAdapter: DatabaseAdapter = {
  name: "postgres",
  connectionStringEnv: "DATABASE_URL"
};
