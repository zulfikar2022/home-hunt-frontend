import Navbar from "@/components/navBar/Navbar";
import { landlordRoutes } from "@/routes";

export default function LoggedOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar routes={landlordRoutes} />
      {children}
    </div>
  );
}
