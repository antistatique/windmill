type Props = {
  label: string;
  value?: string | number;
  metric?: string;
};

const Item = ({ label, value, metric }: Props) => (
  <div className="flex items-center p-3">
    <span className="grow overflow-hidden text-ellipsis">{label}</span>

    {value === undefined ? (
      <span className="skeleton w-16" />
    ) : (
      <span className="font-semibold">
        {value} {metric}
      </span>
    )}
  </div>
);

export default Item;
