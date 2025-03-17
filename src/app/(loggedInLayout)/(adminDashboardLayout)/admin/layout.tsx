import Navbar from "@/components/navBar/Navbar";
import { adminRoutes } from "@/routes";

export default function LoggedOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar routes={adminRoutes} />
      {children}
    </div>
  );
}
