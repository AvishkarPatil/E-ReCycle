import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ShoppingCart, Heart, Trash2, PenTool, BarChart } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-10 lg:py-15 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-4">
              {/*<div className="flex items-center">*/}
              {/*  <Recycle className="h-6 w-6 mr-2 text-green-600" />*/}
              {/*  <h3 className="text-xl font-bold tracking-tight text-green-600">E-RECYCLE</h3>*/}
              {/*</div>*/}
              <div className="relative">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900">
                  Give Your E-Waste a{" "}
                  <span className="relative z-10">
                    Second Life
                    <div className="absolute -z-10 bottom-0 left-0 right-0 h-6 bg-green-400 opacity-50 transform translate-y-2"></div>
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-[600px]">
                Find easy solutions for selling, donating, or disposing of your electronics responsibly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                 <Link to="/upload">
                  <button className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200">
                    Scan & Classify
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://i.ibb.co/whhn7Vyf/x.png"
                width={600}
                height={600}
                alt="E-waste recycling illustration"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <ActionCard
              icon={<ShoppingCart className="h-8 w-8 text-green-500" />}
              title="Sell"
              description="Sell your used electronics for cash"
            />
            <ActionCard
              icon={<Heart className="h-8 w-8 text-purple-500" />}
              title="Donate"
              description="Give to those in need"
            />
            <ActionCard
              icon={<Trash2 className="h-8 w-8 text-blue-500" />}
              title="Dispose"
              description="Recycle responsibly"
            />
            <ActionCard
              icon={<PenTool className="h-8 w-8 text-orange-500" />}
              title="Repair"
              description="Fix instead of replace"
            />
          </div>
        </div>
      </section>

      {/* User Impact Section */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-gray-900">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ImpactCard value="127" label="Tons of e-waste recycled" />
            <ImpactCard value="5,432" label="Devices donated" />
            <ImpactCard value="12,890" label="Active users" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Your Contribution</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart className="h-8 w-8 text-gray-400 mr-2" />
              <span className="text-gray-500">Personalized impact chart</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hashtags Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-gray-900">Join The Conversation</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Hashtag tag="RecycleElectronics" />
            <Hashtag tag="EWasteReduction" />
            <Hashtag tag="CircularEconomy" />
            <Hashtag tag="GreenTech" />
            <Hashtag tag="SustainableTech" />
            <Hashtag tag="ReduceReuseRecycle" />
            <Hashtag tag="TechForGood" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Recycle className="h-6 w-6 mr-2 text-green-400" />
              <h3 className="text-xl font-bold text-green-400">E-RECYCLE</h3>
            </div>
            <p className="text-sm text-gray-400">© 2025 E-Recycle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ActionCard({ icon, title, description }) {
  return (
    <div className="overflow-hidden transition-all hover:shadow-md bg-white rounded-lg border border-gray-200">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-gray-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

function ImpactCard({ value, label }) {
  return (
    <div className="overflow-hidden transition-all hover:shadow-md bg-white rounded-lg border border-gray-200">
      <div className="p-6 flex flex-col items-center text-center">
        <h3 className="text-4xl font-bold text-green-500 mb-2">{value}</h3>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  )
}

function Hashtag({ tag }) {
  return (
    <a
      href={`/hashtag/${tag}`}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors text-gray-700 hover:text-gray-900"
    >
      #{tag}
    </a>
  )
}