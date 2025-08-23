import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router";
import GetStartedButton from "./GetStartedButton";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Our Services", to: "/our-services" },
  { name: "Our Team", to: "/our-team" },
  { name: "Contact Us", to: "/contact-us" },
];

const linkClasses = "text-lg/6 text-gray-900 hover:font-bold";
const mobileLinkClasses = "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50";

function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-10 shadow">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8 lg:gap-x-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5 flex items-center gap-6">
            <span className="sr-only">RAP</span>
            <img
              alt="RAP Logo"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <span className="text-indigo-800 text-2xl font-extrabold">RAP</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <HiMenu aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Nav */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""}`
              }
            >
              {link.name}
            </NavLink>

          ))}
        </PopoverGroup>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <GetStartedButton />
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">RAP</span>
              <img
                alt="RAP Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </NavLink>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <HiX aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `${mobileLinkClasses} ${isActive ? "bg-gray-100 text-indigo-600" : ""}`
                    }
                  >
                    {link.name}
                  </NavLink>

                ))}
              </div>

              {/* Extra Links */}
              <div className="py-6 space-y-2">
                <NavLink to="/login" className={mobileLinkClasses}>
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={`${mobileLinkClasses} underline`}
                >
                  Signup
                </NavLink>
                <GetStartedButton />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default PublicHeader;
