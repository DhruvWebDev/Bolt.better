// components/Navbar.jsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white p-4 flex items-center justify-between">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <a href="/about" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="/projects" className="hover:underline">
            Projects
          </a>
        </li>
      </ul>
      <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
        Contact Us
      </Button>
    </nav>
  );
};

export default Navbar;
