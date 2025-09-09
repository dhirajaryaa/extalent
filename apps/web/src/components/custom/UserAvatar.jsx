import userStore from '@/store/user.store';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

function UserAvatar({className,imageClassName}) {
  const {user} = userStore();
  return (
          <Avatar className={`rounded-lg border border-primary p-[1px] ${className}`}>
        <AvatarImage
          src={user?.avatar}
          alt={user?.name}
          className={`object-cover rounded-lg ${imageClassName}`}
        />
        <AvatarFallback>{user?.name.split(" ").map((word) => word[0])}</AvatarFallback>
      </Avatar>
  )
}

export default UserAvatar