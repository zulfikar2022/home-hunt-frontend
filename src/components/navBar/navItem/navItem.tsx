import Link from "next/link";

export function NavItem({
  href,
  children,
  onClick,
  customClassNames,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  customClassNames?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`transition ${customClassNames}`}
    >
      {children}
    </Link>
  );
}
