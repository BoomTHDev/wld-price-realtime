import PriceDisplay from "@/components/PriceDisplay"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Worldcoin Price Tracker
          </h1>
          <p className="text-gray-300 text-lg">Real-time WLD price monitoring</p>
        </header>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50">
          <PriceDisplay />
        </div>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>Data updates every minute • Made with ❤️ for WLD community</p>
        </footer>
      </main>
    </div>
  )
}

export default HomePage