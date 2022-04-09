import Link from 'next/link';

function Header() {
  return (
    <header className="flex justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/" passHref>
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://deanlife.blog/wp-content/uploads/2021/02/medium-1024x254.png"
            alt=""
          />
        </Link>

        <div className="hidden md:inline-flex space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="border px-4 rounded-full border-green-600">
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header;
