import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

import { Check } from "lucide-react";

function TFAvatar({
  src,
  alt = "User",
  name = "",
  size = "default",     // sm | default | lg
  className = "",
  title = false,

  // Badge
  badge = false,
  badgeIcon = <Check />,

  // Group
  group = false,
  groupCount = 0,
  children,
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatar = (
    <Avatar
      size={size}
      className={className}
      title={title ? name : undefined}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="dark:text-gray-100">
        {initials || "U"}
      </AvatarFallback>

      {badge && (
        <AvatarBadge>
          {badgeIcon}
        </AvatarBadge>
      )}
    </Avatar>
  );

  if (group) {
    return (
      <AvatarGroup>
        {children}
        {groupCount > 0 && (
          <AvatarGroupCount>+{groupCount}</AvatarGroupCount>
        )}
      </AvatarGroup>
    );
  }

  return avatar;
}

export default TFAvatar;