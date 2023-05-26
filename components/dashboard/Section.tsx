import Item from '@/components/dashboard/Item';

type Props = {
  label: string;
  items: {
    label: string;
    value: number;
    metric?: string;
  }[];
};

const Section = ({ label, items }: Props) => (
  <div className="space-y-3">
    <h2 className="font-semibold">{label}</h2>

    <div className="divide-y divide-background rounded-xl bg-white shadow">
      {items.map(item => (
        <Item key={item.label} {...item} />
      ))}
    </div>
  </div>
);

export default Section;
