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
    rounded-3xl
    border
    border-slate-800/60
    bg-slate-900/80
    backdrop-blur-sm
    p-5
    shadow-xl
    transition-all
    duration-200
    hover:-translate-y-1
    ${className}
  `}
    >
      {children}
    </div>
  );
}