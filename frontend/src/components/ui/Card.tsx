type Props = {
  children:
    React.ReactNode;

  className?:
    string;
};

export default function
Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-4
        shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}