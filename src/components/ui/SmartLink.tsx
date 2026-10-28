import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

/** In-page anchors ("#contact") use a plain <a> so smooth scrolling can intercept them; routes use next/link (basePath-aware). */
export function SmartLink({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) {
    return <a href={href} {...props} />;
  }
  return <Link href={href} {...props} />;
}
