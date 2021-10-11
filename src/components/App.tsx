import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {Wrapper} from './styleComponents';
const ROUTING_QUERY = gql`
  {
    nearest(
      lat: 60.1704374
      lon: 24.9406009
      maxDistance: 500
      filterByPlaceTypes: DEPARTURE_ROW
    ) {
      edges {
        node {
          place {
            ... on DepartureRow {
              stop {
                lat
                lon
                name
              }
              stoptimes {
                serviceDay
                scheduledDeparture
                realtimeDeparture
                trip {
                  route {
                    shortName
                    longName
                  }
                }
                headsign
              }
            }
          }
          distance
        }
      }
    }
  }
`;

function App() {
  const { data, loading, error, refetch } = useQuery(ROUTING_QUERY);

  const [routeData, setRouteData] = React.useState();
  useEffect(() => {
    setRouteData(data);
  }, [data, routeData]);
  console.log(routeData);
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <p>`Error! ${error.message}`</p>;
  return (
    <div>
      <Wrapper>
        <h2>Routing from Rautatieasema to Maria 01</h2>
        <button onClick={() => refetch()}>Refresh</button>
      </Wrapper>
    </div>
  );
}

export default App;
