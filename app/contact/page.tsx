"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { sendContactEmail } from "@/app/actions/send-email"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "construction",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "construction",
          message: "",
        })

        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Failed to send message. Please try again or contact us directly.")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of these channels. We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+977 1-538577"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +977 1-538577
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@energeticnepal.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@energeticnepal.com
                    </a>
                  </div>
                  
                </div>

                
              </div>

              {/* Partnership Section */}
              <div className="flex gap-4">
  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
    <MapPin className="w-6 h-6 text-primary" />
  </div>

  <div className="w-full">
    <h3 className="font-semibold mb-1">Address</h3>

    <p className="text-primary mb-3">
      Energetic Nepal Pvt. Ltd.
      <br />
      Chauni, Kathmandu
      <br />
      Nepal
    </p>

    {/* Google Map */}
    <div className="w-full h-48 overflow-hidden rounded-lg border border-border shadow-sm">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2715161288156!2d85.28882809999999!3d27.70890189999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb191b8d35d3dd%3A0x9b633c3c4b18b19a!2sEnergetic%20Nepal%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1782231862683!5m2!1sen!2snp"
        width="100%"
        height="100%"
        style={{ border: 50 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Energetic Nepal Location"
      />
    </div>
  </div>
</div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-muted p-8 rounded-lg border border-border">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-secondary/10 border border-secondary rounded-lg flex gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-secondary">Message sent successfully!</p>
                      <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+977 1-XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="construction">Construction</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="substation">Substation</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Collaboration for Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Joint Ventures",
                desc: "Partner with us on large-scale projects through joint venture arrangements.",
              },
              {
                title: "Sub-contracting",
                desc: "We work as reliable sub-contractors for major construction firms.",
              },
              {
                title: "Consultation",
                desc: "Leverage our expertise for project planning and technical consultation.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>

              
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
