type Props = {
  label: string;

  active?: boolean;

  onClick?: () => void;
};

export default function ChipButton({
  label,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-full
        px-4
        py-2
        text-sm
        transition-all

        ${
          active
            ? "bg-slate-100 text-slate-900"
            : "bg-slate-800 text-slate-300"
        }
      `}
    >
      {label}
    </button>
  );
}