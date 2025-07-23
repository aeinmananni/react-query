import { NavLink } from '../../custom';

export default function Navbar() {
  return (
    <header className="p-3">
      <nav className="flex items-center gap-3">
        <NavLink to={'/'}>AllUsers</NavLink>
        <NavLink to={'/user'}>user</NavLink>
      </nav>
    </header>
  );
}
