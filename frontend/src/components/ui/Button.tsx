type Props = {
  children: React.ReactNode;

  onClick?: () => void;

  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-2xl
        px-4
        py-3
        text-sm
        font-medium
        transition-all

        ${
          variant === "primary"
            ? "bg-slate-100 text-slate-900"
            : "bg-slate-800 text-slate-100"
        }
      `}
    >
      {children}
    </button>
  );
}