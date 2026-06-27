import Link from "next/link";

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm text-slate-muted">{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 rounded-full border border-brand/30 px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-pill"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
