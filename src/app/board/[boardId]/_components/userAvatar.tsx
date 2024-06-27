import { Hint } from "@/app/(dashboard)/_components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export function UserAvatar({
  borderColor,
  fallback,
  src,
  name,
}: UserAvatarProps) {
  return (
    <Hint label={name || "Anônimo"} side="bottom" sideOffSet={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor: borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}
