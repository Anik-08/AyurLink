"use client"

import type React from "react"
import { useMemo, useState } from "react"

// Dummy remedies data
const REMEDIES: Record<string, string[]> = {
  headache: [
    "Apply a paste of sandalwood powder to the forehead.",
    "Sip ginger tea (fresh ginger slices boiled in water) to reduce tension.",
    "Massage temples with a few drops of peppermint oil diluted in coconut oil.",
  ],
  fever: [
    "Tulsi (holy basil) tea 2–3 times a day for immune support.",
    "Coriander seed water to promote sweating and temperature regulation.",
    "Light khichdi and warm fluids; avoid heavy, oily foods.",
  ],
  cough: [
    "Licorice (yashtimadhu) tea to soothe the throat.",
    "Honey + ginger juice + pinch of black pepper twice daily.",
    "Steam inhalation with ajwain (carom) seeds.",
  ],
  indigestion: [
    "Chew a small piece of fresh ginger with rock salt before meals.",
    "Warm cumin-coriander-fennel tea after meals.",
    "Buttermilk with roasted cumin powder and a pinch of rock salt.",
  ],
  stress: [
    "Ashwagandha tea or capsules (as advised) to support resilience.",
    "Abhyanga (warm oil self-massage) before shower.",
    "Nadi shodhana (alternate nostril breathing) 5–10 minutes daily.",
  ],
}

// Simple matcher that prioritizes exact match, then includes, then fuzzy
function findRemedies(query: string): { symptom: string; remedies: string[] }[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const entries = Object.entries(REMEDIES)

  // Exact match
  const exact = entries.filter(([k]) => k === q)
  if (exact.length) {
    return exact.map(([k, v]) => ({ symptom: k, remedies: v }))
  }

  // Includes match
  const partial = entries.filter(([k]) => k.includes(q))
  if (partial.length) {
    return partial.map(([k, v]) => ({ symptom: k, remedies: v }))
  }

  // Fuzzy: token overlap
  const tokens = q.split(/\s+/).filter(Boolean)
  const fuzzy = entries
    .map(([k, v]) => {
      const overlap = tokens.filter((t) => k.includes(t)).length
      return { symptom: k, remedies: v, score: overlap }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ symptom, remedies }) => ({ symptom, remedies }))

  return fuzzy
}

export default function AyurLinkSearch() {
  const [query, setQuery] = useState("")
  const [submitted, setSubmitted] = useState("")

  const results = useMemo(() => findRemedies(submitted), [submitted])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSubmitted(query)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-900/20 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large atmospheric spheres */}
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-green-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-48 -left-48 w-80 h-80 bg-gradient-to-tr from-green-500/15 to-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/8 to-green-500/8 rounded-full blur-2xl"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-16 w-2 h-2 bg-emerald-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-green-400/30 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-emerald-300/50 rounded-full animate-bounce" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Glowing Health Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-pulse">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">
              AyurLink
            </h1>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-100 mb-4 sm:mb-6 leading-tight px-4">
            Discover Your Natural Remedies
          </h2>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4">
            Welcome to AyurLink, where ancient wisdom meets modern wellness. Explore our curated collection of 
            natural remedies, each offering a unique pathway to healing and a chance to redefine your health journey.
          </p>
        </div>

        {/* Search Section */}
        <section aria-labelledby="ayurlink-search" className="w-full max-w-6xl mx-auto mb-8 sm:mb-12">
          <div className="backdrop-blur-md bg-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl mx-4">
            <div className="w-full">
              <label htmlFor="symptom" className="sr-only">
                Search symptoms
              </label>
              <div className="relative">
                <span
                  className="absolute left-3 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 text-emerald-300 select-none flex items-center gap-2 sm:gap-3 font-medium text-xs sm:text-sm lg:text-base"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                  <span className="hidden sm:inline">AyurLink</span>
                </span>
                <input
                  id="symptom"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search symptoms..."
                  className="w-full rounded-xl sm:rounded-2xl border-2 border-emerald-500/20 bg-white/10 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 py-3 sm:py-4 lg:py-6 pl-16 sm:pl-28 lg:pl-36 pr-16 sm:pr-28 lg:pr-36 text-sm sm:text-base lg:text-lg shadow-xl"
                  aria-describedby="search-help"
                  autoComplete="off"
                />
                <span
                  className="pointer-events-none absolute right-3 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-emerald-300 bg-emerald-500/20 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full border border-emerald-500/30 backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <span className="hidden sm:inline">Press </span>Enter
                </span>
              </div>
              <p id="search-help" className="mt-3 sm:mt-4 text-gray-300 text-center text-sm sm:text-base lg:text-lg px-4">
                Discover natural healing remedies from the wisdom of Ayurveda
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <div className="w-full max-w-7xl mx-auto px-4">
          {submitted && results.length === 0 && (
            <div role="status" className="backdrop-blur-md bg-red-500/10 rounded-xl sm:rounded-2xl border border-red-400/20 p-4 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-red-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-base sm:text-lg">No remedies found for &quot;{submitted}&quot;</span>
              </div>
              <p className="mt-2 text-gray-300 text-sm sm:text-base">Try searching for: headache, cough, fever, indigestion, or stress.</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid gap-4 sm:gap-6 lg:gap-8">
              {results.map(({ symptom, remedies }) => (
                <article
                  key={symptom}
                  className="backdrop-blur-md bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-emerald-500/10"
                  aria-labelledby={`remedy-${symptom}`}
                >
                  <header className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/25 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 id={`remedy-${symptom}`} className="text-xl sm:text-2xl font-semibold text-white capitalize">
                      Natural Remedies for {symptom}
                    </h2>
                  </header>
                  
                  <div className="backdrop-blur-sm bg-emerald-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-400/20">
                    <ul className="space-y-3 sm:space-y-4">
                      {remedies.map((remedy, i) => (
                        <li key={i} className="flex items-start gap-3 sm:gap-4 text-gray-200 leading-relaxed text-sm sm:text-base lg:text-lg">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full mt-2 sm:mt-3 flex-shrink-0 shadow-lg shadow-emerald-400/50"></div>
                          <span>{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-500/10 border border-amber-400/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <p className="text-amber-200 flex items-start gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span><strong>Important:</strong> These traditional remedies are for informational purposes. Please consult with a qualified healthcare practitioner for persistent or serious symptoms.</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}