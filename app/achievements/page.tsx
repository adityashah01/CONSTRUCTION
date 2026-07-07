"use client"

import { useState } from "react"
import { Award, Trophy, Zap, Building2, Users, CheckCircle, Star, Medal, X } from "lucide-react"

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null)

  const certifications = [
    {
      id: 1,
      title: "ISO 9001:2015",
      category: "quality",
      description: "Quality Management System",
      issuer: "International Organization for Standardization",
      year: 2020,
      icon: Trophy,
      color: "from-blue-500 to-blue-600",
      details: "Certification Number: ISO-9001-2020-EN",
      fullDescription:
        "Certified Quality Management System ensuring consistent delivery of high-quality construction and infrastructure projects.",
      certificateImage: "/Iso.png",
    },
   {
      id: 2,
      title: "ISO 45001:2018",
      category: "safety",
      description: "Occupational Health and Safety Management System",
      issuer: "Americo Quality Standards Registech Pvt. Ltd.",
      year: 2022,
      icon: Trophy,
      color: "from-red-500 to-red-600",
      details: "Certification Number: AMER16911",
      fullDescription:
        "Certified Occupational Health and Safety Management System covering Construction Management, Infrastructure Development, and Design & Engineering Works, including Electrical Sub-Station, Transmission Line, Road, Building, Bridge, Water Supply & Sanitation, Hydropower, and Irrigation.",
      certificateImage: "/iso45001.png",
    },
   
    {
      id: 3,
      title: "ISO 14001:2015",
      category: "quality",
      description: "Environmental Management System",
      issuer: "International Organization for Standardization",
      year: 2021,
      icon: Zap,
      color: "from-green-500 to-green-600",
      details: "Certification Number: ISO-14001-2021-EN",
      fullDescription:
        "Environmental Management System certification demonstrating commitment to sustainable and eco-friendly construction practices.",
      certificateImage: "/iso14001.png",
    },
    
     {
      id: 4,
      title: "Government Registration",
      category: "registration",
      description: "Registered with Government of Nepal",
      issuer: "Government of Nepal",
      year: 2015,
      icon: Award,
      color: "from-red-500 to-red-600",
      details: "Registration Number: 1380708971/072",
      fullDescription:
        "Official registration with the Government of Nepal, ensuring compliance with all national regulations and standards.",
      certificateImage: "/gov.png",
    },
    
  ]

  const achievements = [
    {
      icon: Building2,
      title: "180+ Projects",
      description: "Successfully completed projects across Nepal",
      stat: "180+",
    },
    {
      icon: Users,
      title: "500+ Team Members",
      description: "Skilled and dedicated workforce",
      stat: "500+",
    },
    {
      icon: Award,
      title: "15+ Years",
      description: "Industry experience and expertise",
      stat: "15+",
    },
    {
      icon: Star,
      title: "100% Satisfaction",
      description: "Client satisfaction rate",
      stat: "100%",
    },
  ]

  const categories = [
    { id: "all", label: "All Certifications" },
    { id: "quality", label: "Quality Management" },
    { id: "registration", label: "Registration" },
    { id: "safety", label: "Safety" },
    { id: "awards", label: "Awards" },
  ]

  const filteredCertifications =
    selectedCategory === "all" ? certifications : certifications.filter((c) => c.category === selectedCategory)

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-600/10 via-background to-blue-600/10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-semibold">
                Our Achievements
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance">
              Certifications &{" "}
              <span className="bg-gradient-to-r from-red-600 via-blue-600 to-red-700 bg-clip-text text-transparent">
                Recognition
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Recognized for excellence, quality, and commitment to delivering outstanding construction solutions in
              Nepal
            </p>
          </div>
        </div>
      </section>

      {/* Key Achievements Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className="relative p-8 bg-gradient-to-br from-muted to-background rounded-xl border border-border hover:border-red-600 transition-all hover:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <achievement.icon className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-red-600 mb-2">{achievement.stat}</div>
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Filter */}
      <section className="py-12 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg"
                    : "bg-background text-foreground border border-border hover:border-red-600 hover:bg-background/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertifications.map((cert) => {
              const IconComponent = cert.icon
              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="group relative bg-gradient-to-br from-muted to-background rounded-xl border border-border overflow-hidden hover:border-red-600 transition-all hover:shadow-xl cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative p-8">
                    {/* Icon with gradient background */}
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-2 text-red-600">{cert.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground mb-4">{cert.description}</p>

                    {/* Details */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Medal className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-foreground">{cert.issuer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold bg-red-600/10 text-red-600 px-3 py-1 rounded-full">
                          {cert.year}
                        </span>
                      </div>
                      {cert.details && <div className="text-xs text-muted-foreground italic">{cert.details}</div>}
                    </div>

                    {/* View More Button */}
                    <button className="w-full py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      View More
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-blue-600 text-white p-6 flex justify-between items-start">
              <h2 className="text-2xl font-bold">{selectedCert.title}</h2>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Certificate Image */}
              <div className="flex justify-center">
                <img
                  src={selectedCert.certificateImage || "/Iso.png "}
                  alt={selectedCert.title}
                  className="w-full max-w-md rounded-lg border-2 border-red-600/30 shadow-lg"
                />
              </div>

              <div className="flex justify-center">
                <div
                  className={`w-24 h-24 rounded-lg bg-gradient-to-br ${selectedCert.color} flex items-center justify-center`}
                >
                  {(() => {
                    const IconComponent = selectedCert.icon
                    return <IconComponent className="w-12 h-12 text-white" />
                  })()}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedCert.fullDescription}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Issuer</p>
                  <p className="font-semibold">{selectedCert.issuer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold text-red-600">{selectedCert.year}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Details</p>
                <p className="font-semibold text-foreground">{selectedCert.details}</p>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-semibold pt-4 border-t border-border">
                <CheckCircle className="w-5 h-5" />
                Verified & Active
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Milestones Timeline */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Key milestones in our growth and success</p>
          </div>

          <div className="space-y-8">
            {[
              {
                year: "2008",
                title: "Company Founded",
                desc: "Energetic Nepal established with vision to transform Nepal's infrastructure",
              },
              {
                year: "2015",
                title: "Government Registration",
                desc: "Officially registered with Government of Nepal",
              },
              {
                year: "2018",
                title: "ISO Certification",
                desc: "Achieved ISO 9001:2015 Quality Management System certification",
              },
              {
                year: "2020",
                title: "100+ Projects",
                desc: "Milestone of completing 100 successful projects across Nepal",
              },
              {
                year: "2023",
                title: "Industry Recognition",
                desc: "Received multiple awards for excellence and innovation",
              },
            ].map((milestone, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  {i < 4 && <div className="w-1 h-16 bg-gradient-to-b from-red-600 to-blue-600 mt-2"></div>}
                </div>
                <div className="flex-1 pt-2">
                  <div className="text-sm font-semibold text-red-600 mb-1">{milestone.year}</div>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-blue-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Partner With Excellence</h2>
          <p className="text-lg mb-8 opacity-90">
            Join us in building Nepal's future with certified, professional construction solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="/projects"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
