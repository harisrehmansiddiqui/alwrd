import Link from "next/link";
import { PackageForm } from "../package-form";
import { createPackage } from "../actions";

export default function NewPackagePage() {
  return (
    <div className="max-w-4xl">
      <Link href="/admin/packages" className="text-sm text-brand hover:underline">
        ← Back to packages
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">New package</h1>
      <div className="mt-6">
        <PackageForm action={createPackage} submitLabel="Create package" />
      </div>
    </div>
  );
}
