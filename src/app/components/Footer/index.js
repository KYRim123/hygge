import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import LogoLink from "../LogoLink";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const categories = [
    { name: "on sale", link: "/category" },
    { name: "Featured", link: "/category" },
    { name: "Masks", link: "/category" },
    { name: "Eye Care", link: "/category" },
    { name: "Moisturizers", link: "/category" },
    { name: "Treatments", link: "/category" },
    { name: "Night Care", link: "/category" },
    { name: "Sun Care", link: "/category" },
  ];
  const legal = [
    { name: "Terms of Service", link: "/" },
    { name: "Privacy Policy", link: "/" },
    { name: "Returns Policy", link: "/" },
    { name: "Shipping", link: "/" },
    { name: "Data Protection", link: "/" },
  ];
  const company = [
    { name: "About", link: "/" },
    { name: "Faq", link: "/" },
    { name: "Masks", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Careers", link: "/" },
    { name: "Vision", link: "/" },
    { name: "Culture", link: "/" },
  ];

  return (
    <footer className="flex justify-between">
      <div className="inline-flex gap-10 flex-col">
        <LogoLink />
        <p>© 2023 - All rights reserved</p>
        <div className="inline-flex gap-2">
          <div className="wrapper-icon--1 w-12 h-12">
            <AiOutlineInstagram size={26} />
          </div>
          <div className="wrapper-icon--1 w-12 h-12">
            <FaFacebook size={26} />
          </div>
          <div className="wrapper-icon--1 w-12 h-12">
            <AiOutlineYoutube size={26} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="title-1">Categories</h2>
        {categories.map((item, index) => (
          <Link
            key={index}
            href={item.link}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="title-1">Legal</h2>
        {legal.map((item, index) => (
          <Link
            key={index}
            href={item.link}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="title-1">Company</h2>
        {company.map((item, index) => (
          <Link
            key={index}
            href={item.link}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
