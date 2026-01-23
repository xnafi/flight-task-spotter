import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="shadow-md w-full z-30 lg:h-15 md:mb-5 mb-0">
      <div className="container mx-auto h-18 py-0!">
        <div className="flex items-center justify-between pb-4">
          <div className="shrink-0">
            <Link href="/">
              <Image
                src={logo}
                width={200}
                height={100}
                alt="logo"
                className="w-28 md:w-36 lg:w-40 rounded-xl"
              />
            </Link>
          </div>
          <div className="hidden lg:flex space-x-10 px-6">
            <Link
              href=""
              className="text-sm font-extrabold uppercase hover:transition-colors hover:text-indigo-500"
            >
              Login
            </Link>
            <Link
              href=""
              className="text-sm font-extrabold uppercase hover:transition-colors hover:text-indigo-500"
            >
              SignUp
            </Link>
          </div>

          {/* Hamburger menu */}
          <div className="lg:hidden">
            <input
              type="checkbox"
              id="menu-toggle"
              className="hidden peer"
              aria-hidden="true"
            />
            <label
              htmlFor="menu-toggle"
              className="text-sm font-extrabold uppercase hover:transition-all focus:outline-none peer-checked:text-indigo-500"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <div
              className="peer-checked:transform peer-checked:translate-x-0 
                         fixed top-0 left-0 w-64 h-full bg-black shadow-lg
                         transform -translate-x-full transition-transform duration-600 ease-in-out z-30"
            >
              <div className="p-4">
                <div>
                  <label
                    htmlFor="menu-toggle"
                    className="text-sm font-extrabold uppercase hover:transition-all focus:outline-none mb-4 flex justify-end "
                    aria-label="Close Menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </label>
                </div>
                <nav className="space-y-4 flex flex-col mt-8">
                  <Link href="">Login</Link>
                  <Link href="">Sign Up</Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
