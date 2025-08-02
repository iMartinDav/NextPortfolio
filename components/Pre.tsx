// components/Pre.tsx

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const PreLoader = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [progress, setProgress] = useState(0);
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		// Start with 30% progress instantly for perceived speed
		setProgress(30);

		// Faster progress animation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressInterval);
					return 100;
				}
				// Accelerated progress
				const remaining = 100 - prev;
				return prev + remaining * 0.2; // Increased speed
			});
		}, 30); // Reduced interval

		// Shorter loading time (800ms instead of 2000ms)
		const timer = setTimeout(() => {
			setProgress(100);
			setIsExiting(true);
			setTimeout(() => {
				setIsLoading(false);
			}, 300); // Faster exit animation
		}, 800);

		return () => {
			clearTimeout(timer);
			clearInterval(progressInterval);
		};
	}, []);

	if (!isLoading) return null;

	const text = "iMartinDav";

	return (
		<div
			className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300 ${
				isExiting ? "scale-98 opacity-0" : "scale-100 opacity-100"
			}`}
			style={{
				isolation: "isolate",
			}}
		>
			<div className="absolute inset-0 bg-black/80" />
			<div className="relative z-10 flex flex-col items-center gap-6">
				<div className="relative">
					<div className="flex space-x-1">
						{text.split("").map((char, index) => (
							<div
								key={`char-${char === " " ? "space" : char}-position-${index}`}
								className="animate-float"
								style={{
									animationDelay: `${index * 0.05}s`, // Faster letter animations
									animationDuration: "2s", // Shorter animation duration
								}}
							>
								<span
									className="relative text-6xl font-light tracking-wider text-transparent md:text-8xl"
									style={{
										WebkitTextStroke: "1px rgb(79, 209, 197)",
										filter: "drop-shadow(0 0 12px rgba(79, 209, 197, 0.7))",
									}}
								>
									{char}
								</span>
							</div>
						))}
					</div>
					<div className="absolute inset-0 -z-10">
						<div
							className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-teal-500/30 to-transparent blur-2xl"
							style={{ animationDuration: "2s" }}
						/>
					</div>
				</div>

				<div className="flex w-full flex-col items-center gap-3">
					<Loader2 className="h-5 w-5 animate-spin text-teal-400" />
					<div className="h-1 w-48 overflow-hidden rounded-full bg-gray-800/50 backdrop-blur-xs">
						<div
							className="animate-gradient-move h-full rounded-full bg-linear-to-r from-teal-400 via-cyan-500 to-teal-400 transition-all duration-150 ease-out"
							style={{
								width: `${progress}%`,
								transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
							}}
						/>
					</div>
					<span className="text-sm font-medium text-teal-400">
						{Math.round(progress)}%
					</span>
				</div>
			</div>

			<style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
            filter: brightness(1);
          }
          50% {
            transform: translateY(-8px); // Reduced movement
            filter: brightness(1.2);
          }
        }
        .animate-float {
          animation: float 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-move {
          background-size: 200% 100%;
          animation: gradient-move 2s linear infinite;
        }
      `}</style>
		</div>
	);
};

export default PreLoader;
