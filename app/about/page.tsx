import { CheckCircle, Target, Eye, Heart } from "lucide-react"

export default function About() {
  return (
    <div className="w-full">
      <section className="py-20 bg-gradient-to-br from-red-600/10 via-background to-blue-600/10 relative overflow-hidden">
        <div
  className="absolute inset-0 opacity-10 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cg stroke=%22%23dc2626%22 stroke-width=%221%22 opacity=%220.5%22%3E%3Cline x1=%220%22 y1=%2239%22 x2=%2239%22 y2=%220%22/%3E%3C/g%3E%3C/svg%3E')",
  }}
></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            About Energetic Nepal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A rapidly growing engineering firm established in 2015, specializing in construction and installation of
            electrical substations.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-4 text-justify" >
                Energetic Nepal Pvt Ltd is a rapidly growing engineering firm established in 2015 with its primary focus
                towards construction and installation of electrical sub-stations. During its short history, the firm has
                been providing employment to estimated 180 individuals and more than 15 electrical sub-station has been
                constructed as a sub-contractor.
              </p>
              <p className="text-lg text-muted-foreground mb-4 text-justify">
                Due to highly capable, proactive management and hardworking motivated staff, the company is seen as one
                of the most prominent organizations in the field of electrical power transmission and distribution in
                the country within next 10 years.
              </p>
              <div className="space-y-3">
                {["ISO 9001:2015 Certified", "Registered with Government", "Experienced Team", "Quality Focused"].map(
                  (item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-600/20 via-blue-600/20 to-amber-600/20 rounded-lg p-8 border-2 border-red-600/30">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">180+</div>
                  <p className="text-muted-foreground">Employees</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                  <p className="text-muted-foreground">Years of Experience</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-600 mb-2">100+</div>
                  <p className="text-muted-foreground">Completed Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-br from-red-600/5 to-blue-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Our Foundation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg border-2 border-red-600/30 hover:border-red-600 transition-colors">
              <Target className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-justify">
                To execute strategic infrastructure development projects in order to contribute to the upliftments and
                developments of the communities we serve.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg border-2 border-blue-600/30 hover:border-blue-600 transition-colors">
              <Eye className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-justify">
                To expand our services for long-lasting desired change resulting from an organization's efforts to
                broaden clients most preferred choice by attaining excellence in quality and timely completed value
                added projects.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg border-2 border-amber-600/30 hover:border-amber-600 transition-colors">
              <Heart className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-muted-foreground text-justify">
                Service oriented approach, integrity in all aspects of operations, transparency and accountability,
                demonstrating honesty and commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Design, Erection, Testing and Commissioning",
              "Surveying and Land Development",
              "Construction Project Management",
              "Construction of Sub-Stations",
              "Construction of Buildings and Bridges",
              "Research and Cost Estimation",
              "Renovations and Remodelings",
              "Supervision and Project Managements",
              "Water Supply and Sanitations",
              "Hydropower and Irrigations",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-red-600/10 hover:to-blue-600/10 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
