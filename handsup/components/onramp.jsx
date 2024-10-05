import { MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { useEffect, useState } from 'react';

const Onramp = () => {
	if (typeof window === 'undefined') {
		return null; // or a loading placeholder
	}

	const [visible, setVisible] = useState(false);
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	if (!isBrowser) {
		return null; // or a loading placeholder
	}

	return (
		<div>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						display: visible ? 'block' : 'none',
					}}
				>
					<MoonPayBuyWidget
						variant="embedded"
						baseCurrencyCode="usd"
						baseCurrencyAmount="100"
						defaultCurrencyCode="usdc"
						visible={visible}
					/>

			</div>
			<button className="text-gray-600 hover:text-gray-900" onClick={() => setVisible(!visible)}>
				Deposit
			</button>
		</div >
	);
};

export default Onramp;
