import { Resume, UserAvatar } from "@/components/custom";
import { Button } from "@/components/ui/button";
import uiStore from "@/store/ui.store";
import userStore from "@/store/user.store";
import { formatDate } from "date-fns";
import { Mail } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { MapPin } from "lucide-react";
import { Calendar, Verified } from "lucide-react";
import { useEffect } from "react";

function Profile() {
  const { user } = userStore();
  console.log(user);

  const { setActivePage } = uiStore();
  useEffect(() => {
    setActivePage("Profile");
  }, []);
  return (
    <section className="py-5 px-4">
      {/* basic info  */}
      <div className="flex flex-col bg-background rounded-2xl p-4 sm:px-8 sm:py-6 lg:max-w-3xl mx-auto w-full">
        <h2 className="text-base sm:text-lg font-semibold capitalize mb-4">
          Profile Information
        </h2>
        <div className="flex items-center justify-between gap-3 mx-auto flex-col lg:flex-row">
          <UserAvatar
            className={"size-42 rounded-full border-4 p-1"}
            imageClassName={"rounded-full"}
          />
          <div className="flex flex-col gap-2 justify-center max-w-70 ml-0 w-full sm:ml-12">
            <h3 className="text-xl font-semibold flex items-center gap-3 text-primary">
              {user.name}
              <span className="bg-green-600 rounded-full  text-white">
                <Verified size={18} />
              </span>
            </h3>
            <p className="text-xs text-foreground/40">
              Future Full-Stack Dev | 12th @SMD College Patna | HTML, CSS, JS,
              Node.js, React | Let's Connect!
            </p>
            <p className="text-sm text-foreground/60 flex items-center gap-2">
              <MapPin size={18} /> Patna, India
            </p>
            <p className="text-sm text-foreground/60 flex items-center gap-2">
              <Mail size={18} /> {user.email}
            </p>
            <p className="text-sm text-foreground/60 flex items-center gap-2">
              <Calendar size={18} /> Joined{" "}
              {formatDate(user.createdAt, "MMMM, yyyy")}
            </p>
          </div>
        </div>
      </div>

      {/* resume  */}
      <div className="flex flex-col bg-background rounded-2xl px-8 py-6 max-w-3xl mx-auto mt-5">
        <h2 className="text-base sm:text-lg font-semibold capitalize mb-4">
          Resume
        </h2>
        <Resume />
      </div>
      {/* Links  */}
      <div className="flex flex-col bg-background rounded-2xl px-8 py-6 max-w-3xl mx-auto mt-5">
        <h2 className="text-base sm:text-lg font-semibold capitalize mb-4">
          Social Links
        </h2>
        <div className="flex items-center gap-2">
          <Button variant={'outline'}>Github <ExternalLink /></Button>
          <Button variant={'outline'}>Portfolio <ExternalLink /></Button>
          <Button variant={'outline'}>Linkedin <ExternalLink /></Button>
        </div>
      </div>
    
    </section>
  );
}

export default Profile;
