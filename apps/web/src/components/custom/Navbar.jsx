import React from "react";
import { Logo } from ".";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 px-3 bg-background rounded-2xl sticky top-2 z-40">
      <Logo />
      <Button className="rounded-lg">Get Started</Button>
    </nav>
  );
}

export default Navbar;
