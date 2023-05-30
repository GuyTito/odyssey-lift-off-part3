import { useParams } from "react-router-dom";
import { Layout, ModuleDetail, QueryResult } from "../components";
import { gql, useQuery } from "@apollo/client";

export const GET_MODULE = gql`
  query GetModule($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      videoUrl
      title
      content
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

export default function Module() {
  const { trackId, moduleId } = useParams();
  const { loading, error, data } = useQuery(GET_MODULE, {
    variables: { trackId, moduleId },
  });

  return (
    <>
      <Layout fullWidth>
        <QueryResult error={error} loading={loading} data={data}>
          <ModuleDetail track={data?.track} module={data?.module} />
        </QueryResult>
      </Layout>
    </>
  );
}
