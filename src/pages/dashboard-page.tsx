import H1 from "@/components/ui/h1";
import RootLayout from "@/layouts/root-layout";

const DashboardPage = () => {
  return (
    <RootLayout>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-5">
        <H1>Dashboard</H1>
      </div>
    </RootLayout>
  );
};

export default DashboardPage;
