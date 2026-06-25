type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-4">
  <h2 className="text-xl font-bold tracking-tight">
    {title}
  </h2>

  {subtitle && (
    <p className="mt-1 text-sm text-slate-400">
      {subtitle}
    </p>
  )}
</div>
  );
}