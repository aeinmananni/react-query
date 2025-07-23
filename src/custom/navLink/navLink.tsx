import { NavLink as Nav, NavLinkProps } from 'react-router';

type NavProps = {
  children?: React.ReactNode;
} & NavLinkProps;

export default function NavLink({ children, ...props }: NavProps) {
  return (
    <Nav {...props} className={({ isActive }) => (isActive ? 'text-orange-500' : 'text-blue-800')}>
      {children}
    </Nav>
  );
}
