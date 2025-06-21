
import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";

export default function Home() {
  return (
    <div className="px-3 py-3 min-h-svh-">

      <DashboardCards />

      <DashboardChart />
    </div>
  );
}
