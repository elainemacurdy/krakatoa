import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <h1>Marketplace of the Fuuuuutuuuuure</h1>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/listing">
      <a style={linkStyle}>Create Listing</a>
    </Link>
    <br/><br/>
  </div>
);

export default Header;