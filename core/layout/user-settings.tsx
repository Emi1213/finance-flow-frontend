import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";

import { UseAccountStore } from "@/features/auth/context/useUserStore";

export const UserSettings = () => {
  const { logout } = UseAccountStore();
  const router = useRouter();

  const handleProfile = () => {
    router.push("/dashboard/profile");
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>
          <Avatar
            showFallback
            size="sm"
            src="https://images.unsplash.com/broken"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" onClick={handleProfile}>
          Perfil
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={async () => {
            await logout();
            router.push("/login");
          }}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
