import Image from "next/image";
import Link from "next/link"
import { Button } from "../components/ui/button"

export default function Home() {
	return (
		<div className="min-h-screen bg-[#FCF7E9] flex flex-col relative">
		  <div className="w-full border-b-[2px] border-[#D42A20]">
		  </div>
		  
		  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 ">
			<span className="text-5xl font-serif text-[#D42A20]">secure</span>
		  </div>
	
		  <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 ">
			<span className="text-5xl font-serif text-[#D42A20]">low-fees</span>
		  </div>
	
		  <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 ">
			<span className="text-5xl font-serif text-[#D42A20]">censorless</span>
		  </div>
	
		  <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 ">
			<span className="text-5xl font-serif text-[#D42A20]">free</span>
		  </div>
	
		  <main className="flex-grow flex flex-col items-center justify-center px-4 mt-[50px]">
			<div className="text-center mb-20">
			  <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-4">
				Help, without any
				<br />
				limits
				<Image
				  src="/doodle1.png"
				  alt="Decorative line"
				  width={192}
				  height={8}
				  className="mx-auto mt-2"
				/>
			  </h1>
			  <p className="text-2xl md:text-3xl mb-6 text-gray-900">
				The Donation, rethought.
				<br />
				Where everybody wins.
			  </p>
			</div>
			<Link href="/campaign">
			  <Button className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full">
				Start a pot
			  </Button>
			</Link>
		  </main>
		</div>
	  )
}
