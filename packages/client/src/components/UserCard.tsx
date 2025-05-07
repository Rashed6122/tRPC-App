import { useNavigate } from "@tanstack/react-router";
import { RiLogoutBoxRLine } from "react-icons/ri";

type UserCardProps = {
  name: string | null | undefined;
};

export const UserCard = ({ name }: UserCardProps) => {
  const navigate = useNavigate();
  const initials = (name || "Ahmed Rashed")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-between p-2 rounded-2xl bg-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-800">
          {name ?? "Ahmed Rashed"}
        </span>
      </div>

      <RiLogoutBoxRLine
        size={24}
        color="#3b82f6"
        onClick={() => {
          navigate({ to: "/login" });
        }}
      />
    </div>
  );
};
