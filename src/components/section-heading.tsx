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
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <h2 className="text-2xl font-heavy text-on-background md:text-[32px] md:leading-10">
            {title}
          </h2>
          {action && (
            <Link
              href={action.href}
              className="shrink-0 rounded-lg border border-primary px-5 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-on-primary"
            >
              {action.label}
            </Link>
          )}
        </div>
        {subtitle && (
          <p className="mx-auto mt-2 max-w-2xl text-base font-light text-on-surface-variant">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h2 className="text-2xl font-heavy text-on-background md:text-[32px] md:leading-10">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-base font-light text-on-surface-variant">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 rounded-lg border border-primary px-6 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-on-primary"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
