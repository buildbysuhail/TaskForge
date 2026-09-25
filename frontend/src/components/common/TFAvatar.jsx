import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

function TFAvatar({
  src,
  alt = "User",
  name = "",
  size = "md",
  className = "",
  title = false
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
    xl: "h-20 w-20",
  };

  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar className={`${sizes[size]} ${className}`}
        title={title && `${name}`}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className={"dark:text-gray-100"}>{initials || "U"}</AvatarFallback>
    </Avatar>
  );
}

export default TFAvatar;