import Navbar from "@/components/navBar/Navbar";
import { loggedOutOnlyRoutes } from "@/routes";

const LoggedOutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar routes={loggedOutOnlyRoutes} />
      {children}
    </div>
  );
};

export default LoggedOutLayout;
