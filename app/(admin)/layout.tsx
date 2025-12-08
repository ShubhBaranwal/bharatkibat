import AdminSidebar from "@/app/components/adminComponents/AdminSidebar"
import "../globals.css";
// import AdminHeader from "../components/AdminHeader";
// import AdminFooter from "../components/AdminFooter";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <AdminHeader /> */}
          <AdminSidebar />
        <main className=" relative">
          {children}
          
          </main>
        {/* <AdminFooter /> */}
      </body>
    </html>
  );
}
