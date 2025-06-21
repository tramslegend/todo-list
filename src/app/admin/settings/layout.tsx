import AdminSettingsLayout from "@/components/layouts/admin/admin-settings-layout";



export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <AdminSettingsLayout>
      {children}
    </AdminSettingsLayout>
  );
}
