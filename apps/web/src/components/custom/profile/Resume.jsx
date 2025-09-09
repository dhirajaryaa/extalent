import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FilePlus } from "lucide-react";
import { useState } from "react";

function Resume() {
  const [userResume, setUserResume] = useState(false);
  return (
    <div className="flex items-center gap-2 justify-center flex-col">
      <div className="flex flex-col items-center">
        <FilePlus size={38} />
        <span className="text-sm font-semibold text-foreground/60">
          Upload Resume
        </span>
        <p className="text-xs text-foreground/60">
          Upload your resume to get more visibility from companies.
        </p>
      </div>
      <Button variant={"destructive"} size={'lg'}>
        <Upload size={18} /> Upload
      </Button>
    </div>
  );
}

export default Resume;
