import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import face from "@/public/happy-face.png";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Journal", href: "/journal" },
  { name: "History", href: "/history" },
];
const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <nav className="border-r border-black/10 w-[15%] h-full">
        <div className="pl-2 pt-2">
          <Image src={face} alt="Mood" height={50} width={50} />
        </div>
        <ul className="mt-2">
          {navLinks.map((link) => (
            <li key={link.name} className="px-4 py-3 font-semibold text-xl">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-full w-[85%]">
        <div className="profile border-b border-black/10 h-[10%] flex justify-end items-center">
          <div className="mr-6">
            <UserButton />
          </div>
        </div>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
