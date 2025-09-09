import { UserAvatar } from "@/components/custom";
import uiStore from "@/store/ui.store";
import userStore from "@/store/user.store";
import { formatDate } from "date-fns";
import { Calendar,Verified } from "lucide-react";
import { useEffect } from "react";

function Profile() {
  const { user } = userStore();
  console.log(user);

  const { setActivePage } = uiStore();
  useEffect(() => {
    setActivePage("Profile");
  }, []);
  return (
    <section className="mt-5">
      <div className="flex flex-col bg-background rounded-2xl px-8 py-6 max-w-3xl mx-auto">
        <h2 className="text-base sm:text-lg font-semibold capitalize mb-4">
          Profile Information
        </h2>
        <div className="flex items-center justify-between gap-3 w-fit mx-auto relative">
          <UserAvatar
            className={"size-32 rounded-full border-4 p-1 relative"}
            imageClassName={"rounded-full"}
          />
          <div className="flex flex-col gap-4 justify-center w-70 ml-12">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              {user.name}{" "}
              <span className="bg-green-600 rounded-full  text-white">
                <Verified size={18} />
              </span>
            </h3>
            <p className="text-sm text-foreground/60">{user.email}</p>
            <p className="text-sm text-foreground/60 flex items-center gap-2">
              <Calendar size={18} /> Joined{" "}
              {formatDate(user.createdAt, "MMMM, yyyy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
