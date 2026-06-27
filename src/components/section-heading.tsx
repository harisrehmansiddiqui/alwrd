import Link from "next/link";

export function SectionHeading({
  title,
  subtitle,
  action,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  centered?: boolean;
}) {
  if (centered) {
    return (
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-on-background md:text-[32px] md:leading-10">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-2 max-w-2xl text-base text-on-surface-variant">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h2 className="text-2xl font-semibold text-on-background md:text-[32px] md:leading-10">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-base text-on-surface-variant">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 rounded-lg border border-primary px-6 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-on-primary"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
