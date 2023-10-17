import Link from "next/link";

const Navbar = ({ pathname }) => {
  const navLink = [
    { name: "home", href: "/" },
    { name: "products", href: "/products" },
    { name: "FAQ", href: "/faq" },
    { name: "about", href: "/about" },
    { name: "contact", href: "/contact" },
  ];

  const activeNavLink = (href, pathname) => {
    return pathname === href ? true : false;
  };

  return (
    <ul className="flex gap-7 capitalize">
      {navLink?.map((item, index) => (
        <li
          key={index}
          className={`${
            activeNavLink(item.href, pathname) ? "font-semibold text-main-100 text-2xl" : " text-2xl"
          }`}
        >
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
