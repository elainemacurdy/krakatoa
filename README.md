# Nextjs, Apollo, Redux, ReduxForm Example

## How to use

[Clone the repo](https://github.com/zeit/next.js):

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/master | tar -xz --strip=2 next.js-master/examples/with-apollo-and-redux
cd with-apollo-and-redux
```

Install it and run:

```bash
npm install
npm start
```

## Known issues
- Listing pages 404 when you first hit them, before refreshing.
- Newly created listings don't appear right away on the Listings page; looks like caching.
- When navigating from the `update` version of the Listing page, to the `create` version, the form fields do not clear out.

## To do
- Need to implement paging on listings page
- Implement secondary user lookup on listings page, display username instead of id
- Add eslint
- Figure out CSS
- Add ability to delete a listing
