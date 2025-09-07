import React from "react";
import { Logo } from ".";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-2 ">
      <Logo />
      <Button className="bg-primary rounded-xl">Get Started</Button>
    </nav>
  );
}

export default Navbar;
