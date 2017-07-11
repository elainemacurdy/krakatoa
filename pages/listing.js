import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';

import BaseLayout from '../components/BaseLayout';
import ListingForm from '../components/forms/ListingForm';
import { Link as DynamicLink } from '../lib/dynamicRoutes';
import withData from '../lib/withData';
import { createListingQueryTmpl, updateListingQueryTmpl, readListingQueryTmpl } from '../queries/listing';

const createListingQuery = gql(createListingQueryTmpl);
const readListingQuery = gql(readListingQueryTmpl);
const updateListingQuery = gql(updateListingQueryTmpl);

let ListingPage = (props) => {
  const {
    data: { Listing },
    url: { query: { id }}
  } = props;

  /**
   * Simple pass-through event handler. Calls the graphql mutate method, then returns the promise to the child
   * component for further processing.
   * @returns {*}
   */
  const handleCreate = function() {
    const { createListing } = props;
    return createListing.apply(this, arguments);
  };

  const handleUpdate = function() {
    const { updateListing } = props;
    return updateListing.apply(this, arguments);
  };

  return (
    <BaseLayout>
      <DynamicLink route='/listing/cj4sq92osmp8s0194t5cds8xh' prefetch>
        <a>Chair (implicit)</a>
      </DynamicLink>
      &nbsp;|&nbsp;
      <DynamicLink route='/listing/cj4sxh5wzwoqy0175l42ijw0z' prefetch>
        <a>Cat bed (implicit)</a>
      </DynamicLink>
      <ListingForm
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        initialValues={Listing}
        mutationType={(id) ? 'update' : 'create'}
      />
    </BaseLayout>
  );
};

ListingPage.propTypes = {
  createListing: PropTypes.func, // injected by graphql
  data: PropTypes.shape({ // injected by graphql
    Listing: PropTypes.object
  }),
  mutationType: PropTypes.string,
  updateListing: PropTypes.func, // injected by graphql
  url: PropTypes.shape({ // nextjs boilerplate
    query: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

ListingPage = compose(
  // create
  graphql(createListingQuery, {
    name: 'createListingMutation',
    props: ({ createListingMutation }) => ({
      createListing: (title, description, state, authorId) => createListingMutation({
        variables: { title, description, state, authorId }
      })
    })
  }),
  // read
  graphql(readListingQuery, {
    options: ({ url: { query: { id } } }) => ({ variables: { id, skip: !(id) } })
  }),
  // update
  graphql(updateListingQuery, {
    name: 'updateListingMutation',
    props: ({ updateListingMutation }) => ({
      updateListing: (id, title, description) => updateListingMutation({
        variables: { id, title, description }
      })
    })
  })
)(ListingPage);

export default withData(ListingPage);
