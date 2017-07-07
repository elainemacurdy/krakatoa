import Link from 'next/link';
import PropTypes from 'prop-types';

function Listings(props) {
  const {
    listings,
    loading
  } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Author</th>
          <th>Created</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {!loading && listings.map((listing, index) =>
          <tr key={listing.id}>
            <td>
              <Link prefetch href='/listing' as={`/listing/${listing.id}`}>
                <a>{listing.title}</a>
              </Link>
            </td>
            <td>{listing.description}</td>
            <td>{listing.author.id}</td>
            <td>{listing.createdAt}</td>
            <td>{listing.updatedAt}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

Listings.PropTypes = {
  listings: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

export default Listings;