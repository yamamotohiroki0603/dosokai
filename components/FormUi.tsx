import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={`inline-flex w-full items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-medium tracking-wide text-cream transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium tracking-wide text-navy"
    >
      {children}
    </label>
  );
}

export function TextInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-navy/15 bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-gold focus:ring-2 focus:ring-gold/30 ${className}`}
      {...props}
    />
  );
}
