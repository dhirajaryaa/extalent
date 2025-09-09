import { UserAvatar } from "@/components/custom";
import { Avatar } from "@/components/ui/avatar";
import uiStore from "@/store/ui.store";
import { useEffect } from "react";

function Profile() {
  const { setActivePage } = uiStore();
  useEffect(() => {
    setActivePage("Profile");
  }, []);
  return <section className="mt-5">
    <div className="flex bg-background rounded-2xl p-4 max-w-4xl mx-auto">
        <h2 className="text-base sm:text-lg font-semibold capitalize py-3">Profile Information</h2>
        <div>
            <UserAvatar className={'size-42 rounded-full border-4 p-1'} imageClassName={'rounded-full'} />
        </div>
    </div>
  </section>;
}

export default Profile;
