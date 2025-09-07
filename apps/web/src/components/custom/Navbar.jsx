import React from "react";
import { Logo } from ".";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 px-3 bg-background rounded-2xl sticky top-2 z-40 shadow-sm">
      <Logo />
      <div className="flex gap-3">

        <Button className="rounded-lg" asChild><Link to={"/login"}>Get Started</Link></Button>
        <Button variant="outline" size="icon" className={"rounded-full"}>
          <Github />
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
