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
- Newly created listings don't appear right away on the Listings page; looks like caching.

## To do
- Need to implement paging on listings page
- Implement secondary user lookup on listings page, display username instead of id
- Add eslint
- Figure out CSS
- Add ability to delete a listing
- Add env config
