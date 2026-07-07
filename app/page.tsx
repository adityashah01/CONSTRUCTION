import Link from "next/link"
import { ArrowRight, Zap, Building2, Users, Award } from "lucide-react"
import VisitorCounter from "../components/VisitorCounter";

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-semibold">
              Building Nepal's Future
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Professional{" "}
            <span className="bg-gradient-to-r from-red-600 via-blue-600 to-red-700 bg-clip-text text-transparent">
              Construction
            </span>{" "}
            Solutions
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Energetic Nepal specializes in electrical substations, infrastructure projects, and construction management
            with over 15 years of excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link prefetch={true}
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link prefetch={true}
              href="/projects"
              className="px-8 py-4 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600/10 transition-colors"
            >
              View Projects
            </Link>
</div>
          <div className="flex justify-center mb-8">
  <VisitorCounter />
</div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="p-4 bg-background rounded-lg border border-border hover:border-red-600 transition-colors">
              <div className="text-3xl font-bold text-red-600">180+</div>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border hover:border-blue-600 transition-colors">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <p className="text-sm text-muted-foreground">Years</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border hover:border-amber-600 transition-colors">
              <div className="text-3xl font-bold text-amber-600">500+</div>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border hover:border-green-600 transition-colors">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <p className="text-sm text-muted-foreground">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive construction and infrastructure solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Electrical Substations",
                desc: "Design and construction of power substations",
                color: "text-red-600",
              },
              {
                icon: Building2,
                title: "Infrastructure",
                desc: "Large-scale infrastructure projects",
                color: "text-blue-600",
              },
              {
                icon: Award,
                title: "Project Management",
                desc: "End-to-end project management",
                color: "text-amber-600",
              },
              { icon: Users, title: "Consultation", desc: "Expert consultation and planning", color: "text-green-600" },
            ].map((service, i) => (
              <div
                key={i}
                className="p-6 bg-muted rounded-lg border border-border hover:border-red-600 transition-colors group"
              >
                <service.icon
                  className={`w-12 h-12 ${service.color} mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8 opacity-90">
            Contact us today for a consultation and let's build something amazing together.
          </p>
          <Link prefetch={true}
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  )
}
