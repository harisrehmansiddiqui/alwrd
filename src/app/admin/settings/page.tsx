import { getIntegrationModules, getSiteSettingsMap } from "@/lib/cms";
import { AdminField, AdminPageHeader } from "@/components/admin/admin-ui";
import { saveSiteSettings, toggleIntegration } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, modules] = await Promise.all([
    getSiteSettingsMap(),
    getIntegrationModules(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Site settings" />

      <form action={saveSiteSettings} className="max-w-2xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="font-display font-semibold text-ink">Contact &amp; social</h2>
        <AdminField label="WhatsApp (digits)" name="whatsapp" defaultValue={settings.whatsapp} />
        <AdminField label="Phone" name="phone" defaultValue={settings.phone} />
        <AdminField label="Email" name="email" defaultValue={settings.email} />
        <AdminField label="Support email" name="supportEmail" defaultValue={settings.supportEmail} />
        <AdminField label="Location" name="location" defaultValue={settings.location} />
        <AdminField label="Instagram URL" name="instagram" defaultValue={settings.instagram} />
        <AdminField label="Facebook URL" name="facebook" defaultValue={settings.facebook} />
        <AdminField label="TikTok URL" name="tiktok" defaultValue={settings.tiktok} />

        <h2 className="pt-4 font-display font-semibold text-ink">Trust section</h2>
        <AdminField label="Trust title" name="trustTitle" defaultValue={settings.trustTitle} />
        <AdminField label="Trust description" name="trustDesc" rows={3} defaultValue={settings.trustDesc} />
        <AdminField label="Certificate label" name="trustCertificate" defaultValue={settings.trustCertificate} />

        <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">
          Save settings
        </button>
      </form>

      <div className="max-w-2xl rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="font-display font-semibold text-ink">Integration modules</h2>
        <p className="mt-1 text-sm text-slate-muted">
          Enable when live APIs are ready. Packages module is always on.
        </p>
        <ul className="mt-4 divide-y divide-black/5">
          {modules.map((mod) => (
            <li key={mod.key} className="flex items-center justify-between py-3">
              <span className="text-sm font-medium capitalize text-ink">{mod.key}</span>
              <form action={toggleIntegration}>
                <input type="hidden" name="key" value={mod.key} />
                <input type="hidden" name="enabled" value={mod.enabled ? "false" : "true"} />
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    mod.enabled
                      ? "bg-brand-pill text-brand-heading"
                      : "bg-black/5 text-slate-muted"
                  }`}
                >
                  {mod.enabled ? "Enabled" : "Disabled"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
