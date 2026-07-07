"use client"

import { useState } from "react"
import { MapPin, Calendar, X } from "lucide-react"

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const projects = [
    {
      id: 1,
      title: "Supply, Delivery & Installation of 3 MVA Sub-Station at Baglung District",
      category: "substations",
      location: "Baglung, Nepal",
      date: "July 2019 - December 2020",
      contractNo: "ARO-2072/073-Bagarkot SS-01",
      amount: "19,470,679",
      status: "ongoing",
      image: "/electrical-substation-construction.jpg",
      description:
        "Complete design, supply, and installation of a 3 MVA electrical substation in Baglung district. The project included civil works, electrical installations, and testing & commissioning.",
      details: [
        "Capacity: 3 MVA",
        "Voltage: 33/11 KV",
        "Location: Baglung District",
        "Client: Nepal Electricity Authority",
        "Contractor: Energetic Nepal Pvt Ltd",
      ],
    },
    {
      id: 2,
      title: "Design, Supply & Construction of 33/11 KV Sub-Station at Chainpur",
      category: "substations",
      location: "Chainpur, Nepal",
      date: "July 2019 - January 2021",
      contractNo: "ARO-2073/074-Chainpur SS-01",
      amount: "21,246,407.76",
      status: "Completed",
      image: "/power-substation-installation.jpg",
      description:
        "Design and construction of a 33/11 KV substation with complete infrastructure development and electrical systems installation.",
      details: [
        "Capacity: 33/11 KV",
        "Location: Chainpur",
        "Duration: 18 months",
        "Client: Nepal Electricity Authority",
        "Status: Successfully Completed",
      ],
    },
    {
      id: 3,
      title: "Augmentation of Distribution Services (West) Mirmi S/S",
      category: "infrastructure",
      location: "Mirmi, Nepal",
      date: "August 2019 - August 2020",
      contractNo: "DCS EED-068/69-02",
      amount: "2,780,747",
      status: "Completed",
      image: "mirme.jpg",
      description: "Augmentation and upgrade of distribution services infrastructure in the western Mirmi area.",
      details: [
        "Type: Distribution Infrastructure",
        "Location: Mirmi (West)",
        "Duration: 12 months",
        "Scope: Service augmentation and upgrade",
        "Status: Completed",
      ],
    },
    {
      id: 4,
      title: "Design, Supply & Construction of 33/11 KV Sub-Station at Sindhupalchok",
      category: "substations",
      location: "Sindhupalchok, Nepal",
      date: "September 2018 - March 2020",
      contractNo: "PRO/2072/073/05",
      amount: "13,488,368.86",
      status: "Completed",
      image: "/substation-construction-site.jpg",
      description:
        "Complete substation project in Sindhupalchok district with all necessary infrastructure and electrical systems.",
      details: [
        "Capacity: 33/11 KV",
        "Location: Sindhupalchok",
        "Duration: 18 months",
        "Client: Nepal Electricity Authority",
        "Status: Successfully Completed",
      ],
    },
    {
      id: 5,
      title: "Supply, Delivery & Installation of Power Transformer at Uddipur",
      category: "infrastructure",
      location: "Uddipur, Nepal",
      date: "October 2019 - March 2021",
      contractNo: "CRED/SS/2073/074-14",
      amount: "11,338,118",
      status: "Completed",
      image: "/power-transformer-installation.jpg",
      description: "Supply and installation of high-capacity power transformer with complete commissioning.",
      details: [
        "Type: Power Transformer Installation",
        "Location: Uddipur",
        "Duration: 17 months",
        "Scope: Supply, delivery, and installation",
        "Status: Completed",
      ],
    },
    {
      id: 6,
      title: "Ramechhap Gariyang Khimti 132 KV Transmission Line Project",
      category: "infrastructure",
      location: "Ramechhap, Nepal",
      date: "September 2021 - March 2022",
      contractNo: "RGK 75/76-02",
      amount: "62,616,560.50",
      status: "Completed",
      image: "/transmission-line-project.jpg",
      description: "High-voltage transmission line project connecting Ramechhap, Gariyang, and Khimti areas.",
      details: [
        "Voltage: 132 KV",
        "Type: Transmission Line",
        "Locations: Ramechhap, Gariyang, Khimti",
        "Duration: 6 months",
        "Status: Successfully Completed",
      ],
    },
  ]

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "substations", label: "Substations" },
    { id: "infrastructure", label: "Infrastructure" },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-red-600/10 via-background to-blue-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Showcase of our completed projects and achievements in construction and infrastructure
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-red-600 to-blue-600 text-white"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-muted rounded-lg overflow-hidden border border-border hover:border-red-600 transition-all hover:shadow-lg group cursor-pointer"
              >
                <div className="relative h-48 bg-gradient-to-br from-red-600/20 to-blue-600/20 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 line-clamp-2">{project.title}</h3>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      <strong>Contract:</strong> {project.contractNo}
                    </p>
                    <p className="text-sm font-semibold text-red-600">Amount: NPR {project.amount}</p>
                    <button className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-blue-600 text-white p-6 flex justify-between items-start">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Project Details</h3>
                <ul className="space-y-2">
                  {selectedProject.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Contract Number</p>
                  <p className="font-semibold">{selectedProject.contractNo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract Amount</p>
                  <p className="font-semibold text-red-600">NPR {selectedProject.amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
