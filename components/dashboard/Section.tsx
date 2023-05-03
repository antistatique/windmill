import Item from '@/components/dashboard/Item'

type props = {
	label: string;
	items: {
        label: string;
        value: string;
    }[];
};

const Section = ({ label, items }: props) => (
	<div className='space-y-3'>
		<h2 className='font-semibold'>{label}</h2>

		<div className='bg-white rounded-xl divide-y divide-background shadow'>
			{items.map((item) => (
				<Item key={item.label} {...item} />
			))}
		</div>
	</div>
);

export default Section;
