export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100dvh] min-w-0 overflow-x-hidden bg-white">
      {children}
    </main>
  );
}
