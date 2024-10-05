import { MoonPaySellWidget } from '@moonpay/moonpay-react';
import { useState } from 'react';

export default function Offramp() {
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					display: visible ? 'block' : 'none',
				}}>

			<MoonPaySellWidget
				variant="embedded"
				baseCurrencyCode="usdc"
				baseCurrencyAmount="100"
				quoteCurrencyCode="usd"
				visible/>
			</div>
			<button className="text-gray-600 hover:text-gray-900" onClick={() => setVisible(!visible)}>
				Withdraw
			</button>
		</div >

	);
}
