import type { Metadata } from "next";

import CsAdminLayout from "@/components/layouts/admin/admin-layout";
import { PROJECT_NAME } from "@/root.config";



export const metadata: Metadata = {
  title: `${PROJECT_NAME} Admin Panel`,
  description: "",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <CsAdminLayout>
      {children}
    </CsAdminLayout>
  );
}
