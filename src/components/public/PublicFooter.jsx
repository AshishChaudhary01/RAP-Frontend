import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const socialLinks = [
  {
    icon: FaFacebook,
    to: "https://www.facebook.com",
  },
  {
    icon: FaInstagram,
    to: "https://www.instagram.com",
  },
  {
    icon: FaTwitter,
    to: "https://www.x.com",
  },
  {
    icon: FaYoutube,
    to: "https://www.youtube.com",
  },
]

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "Our Team", href: "https://www.google.com" },
      { name: "Services", href: "https://www.example.com" },
      { name: "Pricing", href: "https://www.example.com" },
      { name: "Contact", href: "https://www.example.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "FAQ", href: "https://www.google.com" },
      { name: "Support", href: "https://www.google.com" },
      { name: "Privacy Policy", href: "https://www.google.com" },
      { name: "Terms & Conditions", href: "https://www.google.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Our Team", href: "https://www.google.com" },
      { name: "Services", href: "https://www.google.com" },
      { name: "Pricing", href: "https://www.google.com" },
      { name: "Contact", href: "https://www.google.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "FAQ", href: "https://www.google.com" },
      { name: "Support", href: "https://www.google.com" },
      { name: "Privacy Policy", href: "https://www.google.com" },
      { name: "Terms & Conditions", href: "https://www.google.com" },
    ],
  },
];

function PublicFooter() {
  return (
    <footer className="bg-indigo-800 text-white">
      <div className="mx-auto max-w-7xl items-center p-3 lg:px-8">
        <div className="text-start my-8">
          <span className="sr-only">RAP</span>
          <img
            alt="RAP Logo"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
          />
        </div>
        <div className="social-links flex gap-x-4 my-8">
          {socialLinks.map((link) => {
            return (
              <a href={link.to} rel="noopener noreferrer" target="_blank">
                <link.icon aria-hidden="true" className="size-6 text-white" />
              </a>
            );
          })}
        </div>
        <div className="grid my-8 lg:grid-cols-4 not-lg:grid-cols-2 gap-x-4">
          {footerLinks.map((section, index) => (
            <div key={index} className="grid my-4 grid-cols-1 gap-2">
              <h4 className="text-white font-semibold mb-2">{section.title}</h4>
              {section.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter