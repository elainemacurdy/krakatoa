/* Single Listing operations */

export const createListingQueryTmpl = `
  mutation createListing($title: String!, $description: String!) {
    createListing(title: $title, description: $description, state: "active", authorId: "cj4hfa3vp3laq0141grgd0gie") {
      id
      author {
        username
      }
      createdAt
      description
      state
      title
    }
  }
`;

export const deleteListingQueryTmpl = `
  mutation deleteListing($id: String!) {
    deleteListing(id: $id) {
      id
      title
    }
  }
`;

export const readListingQueryTmpl = `
  query readListing($skip: Boolean!, $id: ID!) {
    Listing(id: $id) @skip(if: $skip) {
      id
      author {
        id
        username
      }
      createdAt
      description
      state
      title
    }
  }
`;

export const updateListingQueryTmpl = `
  mutation updateListing($id: ID!, $title: String!, $description: String!) {
    updateListing(id: $id, title: $title, description: $description) {
      id
      author {
        username
      }
      createdAt
      description
      state
      title
    }
  }
`;

/* Multiple listings operations */
export const allListingsQueryTmpl = `
  query allListings($first: Int!, $skip: Int!) {
    allListings(orderBy: title_ASC, skip: $skip, first: $first) {
      id
      author {
        id
      }
      createdAt
      description
      title
      updatedAt
    }
  }
`;