export type TRoute = {
  href: string;
  value: string;
};

export const generalRoutes: TRoute[] = [
  {
    href: "/",
    value: "Home",
  },
  {
    href: "/about",
    value: "About Us",
  },
  {
    href: "/contact",
    value: "Contact",
  },
];

export const loggedOutOnlyRoutes: TRoute[] = [
  ...generalRoutes,
  {
    href: "/rentals",
    value: "Rentals",
  },
  {
    href: "/login",
    value: "Login",
  },
  {
    href: "/signup",
    value: "Sign Up",
  },
];

export const adminRoutes: TRoute[] = [
  ...generalRoutes.map((route) => {
    if (route.href === "/") {
      return {
        href: "/admin",
        value: "Home",
      };
    }
    return {
      href: `/admin${route.href}`,
      value: route.value,
    };
  }),
  {
    href: "/admin/rentals",
    value: "Rentals",
  },
  {
    href: "/admin/dashboard?value=all-users",
    value: "dashboard",
  },
];

export const tenantRoutes: TRoute[] = [
  ...generalRoutes.map((route) => {
    if (route.href === "/") {
      return {
        href: "/tenant",
        value: "Home",
      };
    }
    return {
      href: `/tenant${route.href}`,
      value: route.value,
    };
  }),
  {
    href: "/tenant/rentals",
    value: "Rentals",
  },
  {
    href: "/tenant/dashboard?value=rental-requests",
    value: "Dashboard",
  },
];

export const landlordRoutes: TRoute[] = [
  ...generalRoutes.map((route) => {
    if (route.href === "/") {
      return {
        href: "/landlord",
        value: "Home",
      };
    }
    return {
      href: `/landlord${route.href}`,
      value: route.value,
    };
  }),
  {
    href: "/landlord/rentals",
    value: "Rentals",
  },
  {
    href: "/landlord/dashboard?value=my-rentals",
    value: "Dashboard",
  },
];
