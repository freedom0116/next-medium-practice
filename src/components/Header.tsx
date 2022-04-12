import Link from 'next/link';

const HeaderArea = ({ children }: any) => (
  <header className="flex justify-between p-5">{children}</header>
);

const HeaderLeft = ({ children }: any) => (
  <div className="flex items-center space-x-5">{children}</div>
);

const HeaderRight = ({ children }: any) => (
  <div className="flex items-center space-x-5 text-green-600">{children}</div>
);

const Logo = ({ src }: any) => (
  <img className="w-44 object-contain cursor-pointer" src={src} alt="" />
);

const Nav = ({ children }: any) => (
  <div className="hidden md:inline-flex space-x-5">{children}</div>
);

const NavItemGreen = ({ children }: any) => (
  <div className="text-white bg-green-600 px-4 py-1 rounded-full">
    {children}
  </div>
);

function Header() {
  return (
    <HeaderArea>
      <HeaderLeft>
        <Link href="/" passHref>
          <Logo src="https://deanlife.blog/wp-content/uploads/2021/02/medium-1024x254.png" />
        </Link>

        <Nav>
          <h3>About</h3>
          <h3>Contact</h3>
          <NavItemGreen>Follow</NavItemGreen>
        </Nav>
      </HeaderLeft>

      <HeaderRight>
        <h3>Sign In</h3>
        <h3 className="border px-4 rounded-full border-green-600">
          Get Started
        </h3>
      </HeaderRight>
    </HeaderArea>
  );
}

export default Header;
