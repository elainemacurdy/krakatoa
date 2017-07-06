import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';

import BaseLayout from '../components/BaseLayout';
import Listings from '../components/Listings';
import withData from '../lib/withData';
import { allListingsQueryTmpl } from '../queries/listing';

const allListingsQuery = gql(allListingsQueryTmpl);

let Index = (props) => {
  const { data: { allListings, loading } } = props;
  return (
    <BaseLayout>
      <Listings
        listings={allListings}
        loading={loading}
      />
    </BaseLayout>
  );
};

Index.propTypes = {
  data: PropTypes.shape({ // injected by graphql
    allListings: PropTypes.array,
    loading: PropTypes.bool.isRequired
  })
};

Index = compose(
  graphql(allListingsQuery, {
    options: {
      variables: {
        skip: 0,
        first: 100
      }
    }
  })
)(Index);

export default withData(Index);
