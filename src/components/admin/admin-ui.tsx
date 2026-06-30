import Link from "next/link";

export function AdminPageHeader({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
      {action && (
        <Link
          href={action.href}
          className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      {children}
    </div>
  );
}

export function AdminField({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  min,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  min?: number;
  rows?: number;
}) {
  const className =
    "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand";

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          min={min}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}

export function AdminCheckbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        className="rounded border-black/20 text-brand focus:ring-brand"
      />
      {label}
    </label>
  );
}

export function AdminSelect({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: [string, string][];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AdminDeleteButton({
  action,
  id,
  label = "Delete",
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
        {label}
      </button>
    </form>
  );
}
