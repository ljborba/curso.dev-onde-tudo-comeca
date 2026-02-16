import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function statusPage() {
  return (
    <>
      <h1>status</h1>
      <UpdatedAt />
      <DataBaseVersion />
      <MaxConnections />
      <ConexoesAbertas />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DataBaseVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let dataBaseVersionText = "Carregando...";

  if (!isLoading && data) {
    dataBaseVersionText =
      data.dependencies?.database?.version || data.database?.version;
  }

  return <div>Versão do Banco de Dados: {dataBaseVersionText}</div>;
}

function MaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let maxConnectionsText = "Carregando...";

  if (!isLoading && data) {
    maxConnectionsText =
      data.dependencies?.database?.max_connections ||
      data.database?.max_connections;
  }

  return <div>Máximas conexões com Banco: {maxConnectionsText}</div>;
}

function ConexoesAbertas() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let conexoesAbertasText = "Carregando...";

  if (!isLoading && data) {
    conexoesAbertasText =
      data.dependencies?.database?.opened_connections ||
      data.database?.opened_connections;
  }

  return <div>Conexões abertas com Banco: {conexoesAbertasText}</div>;
}
