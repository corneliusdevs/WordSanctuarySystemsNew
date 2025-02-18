import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <DashboardNavbar />
    {children}</div>;
}
