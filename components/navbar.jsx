"use client";
import Link from "next/link";
import Image from "next/image";
import { Input } from "./ui/input";


export default function Navbar() {
 

  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex-1 basis-1/3 flex justify-start">
        <Input
          className="max-w-xs bg-[#D9D9D9] border-none text-center"
          placeholder="Search projects, creators, categories"
          style={{ borderRadius: "20px" }}
        />
      </div>
      <Link href="/" className="flex-1 basis-1/3 flex justify-center">
        <Image
          src="/handsup.png"
          alt="handsUp Logo"
          width={80}
          height={20}
          className="header-logo"
        />
      </Link>
    </header>
  );
}
