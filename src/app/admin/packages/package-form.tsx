type Departure = {
  id: string;
  city: string;
  departureDate: Date;
  durationDays: number;
  durationNights: number;
  price: number;
  oldPrice: number | null;
  seats: number;
} | null;

type PackageDefaults = {
  id: string;
  title: string;
  slug: string;
  audience: string;
  tier: string;
  tagline: string;
  description: string | null;
  image: string;
  amenities: string[];
  featured: string | null;
} | null;

export function PackageForm({
  action,
  pkg = null,
  departure = null,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  pkg?: PackageDefaults;
  departure?: Departure;
  submitLabel: string;
}) {
  const dateValue = departure
    ? departure.departureDate.toISOString().slice(0, 10)
    : "";

  return (
    <form action={action} className="space-y-8">
      {pkg && <input type="hidden" name="id" value={pkg.id} />}
      {departure && <input type="hidden" name="departureId" value={departure.id} />}

      <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display font-semibold text-ink">Package details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={pkg?.title} required />
          <Field label="Slug (optional)" name="slug" defaultValue={pkg?.slug} placeholder="auto from title" />
          <Select label="Audience" name="audience" defaultValue={pkg?.audience ?? "group"} options={[["group", "Group"], ["family", "Family"], ["couple", "Couple"]]} />
          <Select label="Tier" name="tier" defaultValue={pkg?.tier ?? "standard"} options={[["economy", "Economy (3-Star)"], ["standard", "Comfort (4-Star)"], ["premium", "Royale (5-Star)"]]} />
          <Select label="Featured section" name="featured" defaultValue={pkg?.featured ?? "none"} options={[["none", "Not featured"], ["group", "Group packages"], ["premium", "Premium packages"]]} />
          <Field label="Image path" name="image" defaultValue={pkg?.image} placeholder="/packages/comfort-1.jpg" />
        </div>
        <div className="mt-4">
          <Field label="Tagline" name="tagline" defaultValue={pkg?.tagline} required />
        </div>
        <div className="mt-4">
          <TextArea label="Description" name="description" defaultValue={pkg?.description ?? ""} />
        </div>
        <div className="mt-4">
          <Field
            label="Amenities (comma separated)"
            name="amenities"
            defaultValue={pkg?.amenities.join(", ")}
            placeholder="All-Inclusive, Ziyarat Included, 4 Star Hotel"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display font-semibold text-ink">Departure & pricing</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Departure city" name="city" defaultValue={departure?.city} required />
          <Field label="Departure date" name="departureDate" type="date" defaultValue={dateValue} required />
          <Field label="Seats" name="seats" type="number" defaultValue={departure ? String(departure.seats) : "30"} />
          <Field label="Duration (days)" name="durationDays" type="number" defaultValue={departure ? String(departure.durationDays) : "15"} required />
          <Field label="Duration (nights)" name="durationNights" type="number" defaultValue={departure ? String(departure.durationNights) : "14"} required />
          <div />
          <Field label="Price (PKR)" name="price" type="number" defaultValue={departure ? String(departure.price) : ""} required />
          <Field label="Old price (optional)" name="oldPrice" type="number" defaultValue={departure?.oldPrice ? String(departure.oldPrice) : ""} />
        </div>
      </section>

      <button
        type="submit"
        className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <textarea
        name={name}
        rows={3}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
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
