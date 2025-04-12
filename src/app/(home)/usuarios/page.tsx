import { Metadata } from "next";
import { UserList } from "@/features/users/components/user-list";

export const metadata: Metadata = {
  title: "Gestión de Usuarios | InnerKanban",
  description: "Administra los usuarios de tu sistema con InnerKanban",
  keywords: "usuarios, gestión, administración, innerkanban",
};

export default function UsersPage() {
  return <UserList />;
}
