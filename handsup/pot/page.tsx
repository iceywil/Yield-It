"use client";

import Navbar from "../components/navbar"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Slider } from "../components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Image from "next/image"

// Custom number formatting function
const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(number);
};

export default function Pot() {
	const [amountStacked, setAmountStacked] = useState<number | null>(null);
	const [customAmount, setCustomAmount] = useState('')
	const [lockDuration, setLockDuration] = useState(0)
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [donationAmount, setDonationAmount] = useState(0)
	const objective = 10000
	const baseYield = 0.097 // 9.7% annual yield

	useEffect(() => {
		if (customAmount !== '') {
			setAmountStacked(parseFloat(customAmount))
			setSelectedAmount(null)
		}
	}, [customAmount])

	const handleAmountClick = (amount: number) => {
		if (selectedAmount === amount) {
			setSelectedAmount(null)
			setAmountStacked(0)
		} else {
			setSelectedAmount(amount as number)
			setAmountStacked(amount as number)
			setCustomAmount('')
		}
	}

	const formatDuration = (days: number) => {
		if (days < 30) return `${days} days`
		if (days < 365) {
			const months = Math.floor(days / 30)
			return `${months} month${months > 1 ? 's' : ''}`
		}
		const years = Math.floor(days / 365)
		const remainingMonths = Math.floor((days % 365) / 30)
		return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`
	}

	const calculateYield = () => {
		const annualYield = baseYield * (lockDuration / 365)
		return (amountStacked ?? 0) * annualYield
	}

	const totalContribution = Number(calculateYield()) + Number(donationAmount)
	const progress = (totalContribution / objective) * 100

	return (
		<div className="min-h-screen bg-[#FCF7E9] flex flex-col">
			<div className="w-full border-b-[2px] border-[#D42A20]">
				<Navbar />
			</div>
			<main className="flex-grow container mx-auto px-4 py-8 md:pt-24 overflow-hidden">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-1/2">
						<div className="relative w-full h-[60vh]">
							<Image
								src="/Harvard.jpeg"
								alt="Harvard"
								layout="fill"
								objectFit="contain"
							/>
						</div>
					</div>
					<div className="lg:w-1/2">
						<Card className="bg-white rounded-lg shadow-md p-6">
							<CardHeader className="p-0 mb-6">
								<CardTitle className="text-3xl font-serif text-center text-gray-900">
									Help me finance my Harvard tuition fees
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="bg-white rounded-lg p-4 shadow-md">
									<h3 className="text-lg font-semibold mb-2 text-gray-800">
										Goal: ${formatNumber(totalContribution)} / ${formatNumber(objective)}
									</h3>
									<p className="text-sm text-gray-600 mb-2">Created by: Me</p>
									<div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
										<motion.div
											className="bg-blue-600 h-2 rounded-full"
											initial={{ width: 0 }}
											animate={{ width: `${progress}%` }}
											transition={{ duration: 0.8, delay: 0.5 }}
										></motion.div>
									</div>
								</div>

								<div className="bg-white rounded-lg p-4 shadow-md">
									<h3 className="text-lg font-semibold mb-2 text-gray-800">Lock Duration: {formatDuration(lockDuration)}</h3>
									<Slider
										min={7}
										max={730}
										step={1}
										value={[lockDuration]}
										onValueChange={(value) => setLockDuration(value[0])}
										className="mb-2"
									/>
								</div>

								<div className="bg-white rounded-lg p-4 shadow-md">
									<h3 className="text-lg font-semibold mb-2 text-gray-800">Select Amount to Lock</h3>
									<div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
										{[5, 10, 20, 30, 50, 100].map((amount) => (
											<Button
												key={amount}
												variant={selectedAmount === amount ? "default" : "outline"}
												onClick={() => handleAmountClick(amount)}
												className={`text-sm ${selectedAmount === amount ? "bg-[#F7D1D1] text-black" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
											>
												${amount}
											</Button>
										))}
									</div>
									<Input
										type="number"
										placeholder="Custom amount"
										value={customAmount}
										onChange={(e) => setCustomAmount(e.target.value)}
										className="w-full text-sm bg-[#D9D9D9] border-none text-center"
										style={{ borderRadius: '20px' }}
									/>
								</div>

								<div className="bg-white rounded-lg p-4 shadow-md">
									<h3 className="text-lg font-semibold mb-2 text-gray-800">Classic Donation</h3>
									<Input
										type="number"
										placeholder="Donation amount"
										value={donationAmount || ''}
										onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
										className="w-full text-sm bg-[#D9D9D9] border-none text-center"
										style={{ borderRadius: '20px' }}
									/>
								</div>

								<Button
									className="w-full bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full"
									onClick={() => {
										// Here you would typically handle the submission
										alert(`Locked: $${formatNumber(amountStacked ?? 0)}, Donated: $${formatNumber(donationAmount ?? 0)}, Total Contribution: $${formatNumber(totalContribution ?? 0)}`)
									}}
								>
									Confirm your contribution
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	)
}