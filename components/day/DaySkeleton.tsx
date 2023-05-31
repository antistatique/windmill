const DaySkeleton = () => {
  const days = Array.from({ length: 5 });

  return (
    <div className="flex items-center justify-between space-x-2 overflow-x-auto px-4 py-2 2xsm:py-1">
      {days?.map((_, index) => (
        <span
          key={index}
          className="skeleton !h-[112px] grow rounded-xl shadow sm:!h-[116px]"
        />
      ))}
    </div>
  );
};

export default DaySkeleton;
