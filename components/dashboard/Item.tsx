type props = {
	label: string;
	value: string;
};

const Item = ({ label, value }: props) => (
	<div className='p-3 flex'>
		<span className='grow'>{label}</span>
		<span className='font-semibold'>{value}</span>
	</div>
);

export default Item;
