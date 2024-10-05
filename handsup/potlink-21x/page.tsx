"use client";

import Navbar from "../components/navbar"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Slider } from "../components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Image from "next/image"

export default function Pot() {
	const [amountStacked, setAmountStacked] = useState(100)
	const [customAmount, setCustomAmount] = useState('')
	const [lockDuration, setLockDuration] = useState(30)
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
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
			setSelectedAmount(amount)
			setAmountStacked(amount)
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
		return amountStacked * annualYield
	}

	const totalContribution = calculateYield() + donationAmount
	const progress = (totalContribution / objective) * 100

	return (
	
		<div className="min-h-screen bg-[#FFFBF5] flex flex-col">
			<Navbar />
			<div className="flex flex-col lg:flex-row flex-grow bg-gradient-to-br from-blue-100 to-green-100">
				<div className="lg:w-1/2 flex flex-col items-center justify-center p-4">

					<div className="relative w-full h-full max-h-[60vh]">
						<Image
							src="/Harvard.jpeg"
							alt="Harvard"
							layout="fill"
							objectFit="contain"
						/>
					</div>
				</div>
				<div className="lg:w-1/2 flex flex-col justify-center p-4">

					<Card className="p-3">
						<CardContent className="space-y-3">
							<Card className="mb-4 w-full">
								<CardHeader className="p-3">
									<CardTitle className="text-xl lg:text-2xl font-bold text-center">
										Help me finance my Harvard tuition fees
									</CardTitle>
								</CardHeader>
							</Card>
							<Card className="mb-3 text-xs">
								<CardHeader className="p-3 pb-1">
									<CardTitle className="text-base">Objective: ${totalContribution.toLocaleString()} / ${objective.toLocaleString()}</CardTitle>
								</CardHeader>
								<CardContent className="p-3">
									<p className="text-xs text-gray-600 mb-2">Created by: Me</p>
									<div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
										<motion.div
											className="bg-blue-600 h-2 rounded-full"
											initial={{ width: 0 }}
											animate={{ width: `${progress}%` }}
											transition={{ duration: 0.8, delay: 0.5 }}
										></motion.div>
									</div>
								</CardContent>
							</Card>
							<Card className="mb-3 text-xs">
								<CardHeader className="p-3 pb-1">
									<CardTitle className="text-base">Lock Duration: {formatDuration(lockDuration)}</CardTitle>
								</CardHeader>
								<CardContent className="p-3">
									<Slider
										min={7}
										max={730}
										step={1}
										value={[lockDuration]}
										onValueChange={(value: number[]) => setLockDuration(value[0])}
										className="mb-2"
									/>
								</CardContent>
							</Card>
							<Card className="mb-3 text-xs">
								<CardHeader className="p-3 pb-1">
									<CardTitle className="text-base">Select Amount to Lock</CardTitle>
								</CardHeader>
								<CardContent className="p-3">
									<div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
										{[5, 10, 20, 30, 50, 100].map((amount) => (
											<Button
												key={amount}
												variant={selectedAmount === amount ? "default" : "outline"}
												onClick={() => handleAmountClick(amount)}
												className={`text-xs ${selectedAmount === amount ? "bg-black text-white" : ""}`}
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
										className="w-full text-xs"
									/>
								</CardContent>
							</Card>
							<Card className="mb-3 text-xs">
								<CardHeader className="p-3 pb-1">
									<CardTitle className="text-base">Additional Donation</CardTitle>
								</CardHeader>
								<CardContent className="p-3">
									<Input
										type="number"
										placeholder="Donation amount"
										value={donationAmount || ''}
										onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
										className="w-full mb-2 text-xs"
									/>
									<p className="text-xs text-gray-600">This amount will be donated in addition to your locked amount.</p>
								</CardContent>
							</Card>
							<Card className="mb-3 text-xs">
								<CardContent className="p-3">
									<p className="mb-1">Amount Locked: ${amountStacked.toLocaleString()}</p>
									<p className="mb-1">Lock Duration: {formatDuration(lockDuration)}</p>
									<p className="mb-1">Yield: {(baseYield * 100).toFixed(1)}%</p>
									<p className="mb-1">Yield Amount: ${calculateYield().toLocaleString()}</p>
									<p className="mb-1">Additional Donation: ${donationAmount.toLocaleString()}</p>
									<p className="font-bold">Total Contribution: ${totalContribution.toLocaleString()}</p>
								</CardContent>
							</Card>
							<Button
								className="w-full text-xs"
								size="sm"
								onClick={() => {
									// Here you would typically handle the submission
									alert(`Locked: $${amountStacked}, Donated: $${donationAmount}, Total Contribution: $${totalContribution.toLocaleString()}`)
								}}
							>
								Confirm your handout
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}