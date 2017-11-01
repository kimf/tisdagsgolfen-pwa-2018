import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import mainQuery from '../queries/mainQuery';

const createSeasonMutation = gql`
  mutation createSeason($name: String!) {
    season: createSeason(name: $name) {
      id
      name
      closed
      photo
    }
  }
`;

const withCreateSeasonMutation = graphql(createSeasonMutation, {
  props: ({ mutate }) => ({
    createSeason: name =>
      mutate({
        variables: { name },
        update: (store, { data: { season } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: mainQuery });
          // Add our comment from the mutation to the end.
          data.seasons.push(season);
          // Write our data back to the cache.
          store.writeQuery({ query: mainQuery, data });
        },
      }),
  }),
});

export default withCreateSeasonMutation;
