import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/"><h1>The Dojo Blog</h1></Link>
      <div className="links">
        {/* <a href="/">Home</a>
        <a href="/create">New Blog</a> */}
        <Link to="/">Home</Link>
        <Link to="/create">New Blog</Link>
      </div>
    </nav>
  );
}

export default Navbar;