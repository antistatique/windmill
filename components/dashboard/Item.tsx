type Props = {
  label: string;
  value: number | undefined;
  metric?: string;
};

const Item = ({ label, value, metric }: Props) => (
  <div className="flex items-center p-3">
    <span className="grow overflow-hidden text-ellipsis">{label}</span>

    {value ? (
      <span className="font-semibold">
        {value} {metric}
      </span>
    ) : (
      <span className="skeleton w-16" />
    )}
  </div>
);

export default Item;
