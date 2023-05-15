import React from 'react';

type Props = {
  label: string;
  value: string;
};

const Item = ({ label, value }: Props) => (
  <div className="flex p-3">
    <span className="grow overflow-hidden text-ellipsis">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default Item;
