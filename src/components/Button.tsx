import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-blue-500/20",
  secondary:
    "bg-slate-950 text-white hover:bg-slate-900 shadow-sm",
  outline:
    "border border-slate-300 bg-white text-slate-950 hover:border-slate-400 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

function linkPropsFromButtonProps({
  type: _type,
  disabled: _disabled,
  onCopy,
  onCopyCapture,
  onCut,
  onCutCapture,
  onPaste,
  onPasteCapture,
  ...rest
}: ComponentPropsWithoutRef<"button">): Record<string, unknown> {
  void onCopy; void onCopyCapture; void onCut; void onCutCapture; void onPaste; void onPasteCapture;
  return rest as Record<string, unknown>;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    const isExternalProtocol =
      external ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("http");

    if (isExternalProtocol) {
      return (
        <a
          href={href}
          className={classes}
          {...linkPropsFromButtonProps(props)}
          {...(external || href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkPropsFromButtonProps(props)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
