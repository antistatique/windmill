const Dashboard = () => (
  <div className="flex h-64 flex-col items-center justify-center space-y-4 bg-pink text-center">
    <span className="skeleton my-1 !h-10 w-44" />
    <span className="skeleton !h-10 w-60 !rounded-xl !bg-yellow" />

    <div className="flex flex-col items-center space-y-2">
      <span className="skeleton w-56" />
      <span className="skeleton w-72" />
    </div>
  </div>
);

export default Dashboard;
