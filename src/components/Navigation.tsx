"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mainMenuItems = [
  { label: "HOME", href: "/" },
  { label: "WORKS WITH COLOUR", href: "/works-colour" },
  { label: "WORKS IN BLACK AND WHITE", href: "/works-bw" },
  { label: "ON STAGE", href: "/on-stage" },
  { label: "PENCERELER", href: "/pencereler" },
  { label: "KURAK", href: "/kurak" },
];

const secondaryMenuItems = [{ label: "CONTACT", href: "/contact" }];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full">
      {/* Main menu */}
      <ul className="flex flex-col gap-1">
        {mainMenuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Secondary menu */}
      <ul className="flex flex-col gap-1 mt-10">
        {secondaryMenuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-link-secondary ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social icons */}
      <div className="flex gap-4 mt-6">
        <a
          href="https://instagram.com/egecam.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-muted transition-colors"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
        <a
          href="mailto:hey@egecam.dev"
          className="text-foreground hover:text-muted transition-colors"
          aria-label="Email"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>

      {/* Spacer to push photo meta to bottom */}
      <div className="flex-grow" />
    </nav>
  );
}
