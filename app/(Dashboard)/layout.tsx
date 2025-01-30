import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import face from "@/public/happy-face.png";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import menu from "@/public/hamburger.svg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Journal", href: "/journal" },
  { name: "History", href: "/history" },
];
const DashboardLayout = ({ children }) => {
  return (
    <div className="sm:w-screen h-full flex">
      <nav className="hidden sm:block sm:border-r sm:border-black/10 sm:w-[15%] sm:h-full">
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

      <div className="h-screen w-full sm:w-[85%]">
        <div className="profile border-b border-black/10 h-[10%] flex justify-between sm:justify-end items-center">
          <div className="ml-4 sm:mr-6">
            <UserButton />
          </div>
          <div className="sm:hidden mr-5">
            <Sheet>
              <SheetTrigger>
                <Image
                  src={menu}
                  alt="Navigation Menu"
                  width={20}
                  height={20}
                />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  {navLinks.map((link) => (
                    <SheetTitle key={link.href}>
                      <Link href={link.href}>{link.name}</Link>
                    </SheetTitle>
                  ))}
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
