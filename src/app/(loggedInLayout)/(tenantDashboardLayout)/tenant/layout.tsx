import Navbar from "@/components/navBar/Navbar";
import { tenantRoutes } from "@/routes";

export default function LoggedOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar routes={tenantRoutes} />
      {children}
    </div>
  );
}
