"use client"

import { useState } from "react"
import {
  Menu,
  X,
  Upload,
  Sparkles,
  Zap,
  Layout,
  Globe,
  Smartphone,
  Globe2,
  BarChart3,
  Star,
  ChevronDown,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function Home() {
  const [hoveredTemplateIndex, setHoveredTemplateIndex] = useState(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const howItWorksSteps = [
    {
      number: "01",
      title: "Upload Your Resume",
      description:
        "Support for PDF, DOCX, and text formats. Our AI instantly analyzes your experience.",
      icon: Upload
    },
    {
      number: "02",
      title: "AI Analyzes & Suggests",
      description:
        "Our AI engine extracts key information and suggests compelling content enhancements.",
      icon: Sparkles
    },
    {
      number: "03",
      title: "Customize & Publish",
      description:
        "Fine-tune your portfolio with our intuitive editor and publish instantly to the web.",
      icon: Zap
    }
  ]

  const features = [
    {
      title: "AI-Powered Content Enhancement",
      description:
        "Intelligent algorithms enhance your resume content with compelling descriptions.",
      icon: Zap
    },
    {
      title: "Multiple Portfolio Templates",
      description:
        "Choose from professionally designed templates tailored to your industry.",
      icon: Layout
    },
    {
      title: "One-Click Deployment",
      description:
        "Deploy your portfolio instantly with a single click. No server setup needed.",
      icon: Globe
    },
    {
      title: "Mobile-Responsive Designs",
      description:
        "Your portfolio looks stunning on all devices, from mobile to desktop.",
      icon: Smartphone
    },
    {
      title: "Custom Domain Support",
      description:
        "Connect your own domain or use our free subdomain for your portfolio.",
      icon: Globe2
    },
    {
      title: "Analytics Integration",
      description:
        "Track visitor engagement and understand who's viewing your portfolio.",
      icon: BarChart3
    }
  ]

  const templates = [
    {
      name: "Modern",
      description: "Clean and contemporary design with bold typography",
      color: "from-blue-500 to-cyan-500",
      preview: "🎨"
    },
    {
      name: "Creative",
      description: "Artistic layout perfect for designers and creatives",
      color: "from-purple-500 to-pink-500",
      preview: "✨"
    },
    {
      name: "Professional",
      description: "Corporate-ready design for business professionals",
      color: "from-slate-600 to-slate-800",
      preview: "💼"
    },
    {
      name: "Minimal",
      description: "Minimalist approach focusing on content clarity",
      color: "from-gray-400 to-gray-600",
      preview: "📄"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content:
        "PersonaForge transformed my resume into a stunning portfolio in minutes. I got 3 job offers within a week!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Marcus Johnson",
      role: "Full Stack Developer",
      content:
        "The AI suggestions were incredibly helpful. My portfolio now showcases my work exactly how I wanted it.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content:
        "Best investment for my career. The templates are professional and the customization options are endless.",
      rating: 5,
      avatar: "👩‍🔬"
    }
  ]

  const faqs = [
    {
      question: "Is my data private and secure?",
      answer:
        "Yes, we take privacy seriously. All your data is encrypted and stored securely. We never share your information with third parties. You have full control over what's visible on your portfolio."
    },
    {
      question: "Can I customize my portfolio after creation?",
      answer:
        "You can customize every aspect of your portfolio including colors, fonts, layout, and content. Our intuitive editor makes it easy to make changes anytime."
    },
    {
      question: "What file formats do you support?",
      answer:
        "We support PDF, DOCX, DOC, and plain text files. Simply upload your resume and our AI will extract and analyze the content."
    },
    {
      question: "Can I use my own domain?",
      answer:
        "Yes! You can connect your own custom domain or use our free subdomain. We provide easy setup instructions for both options."
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started."
    },
    {
      question: "How long does it take to create a portfolio?",
      answer:
        "Most portfolios are created in 2-5 minutes. Upload your resume, review the AI suggestions, and publish. It's that simple!"
    }
  ]

  const router = useRouter();

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden py-8 md:py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-sm font-semibold text-primary">
                    ✨ AI-Powered Portfolio Builder
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                  Transform Your Resume Into a Stunning Portfolio in Minutes
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed text-balance">
                  AI-powered persona builder that turns your CV into a
                  professional portfolio website. No coding required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push('/build-portfolio')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Build Your Portfolio
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  See Examples
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-foreground/60">
                    Portfolios Created
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.9★</p>
                  <p className="text-sm text-foreground/60">User Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2 min</p>
                  <p className="text-sm text-foreground/60">Setup Time</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🎨</span>
                  </div>
                  <p className="text-foreground/60">Portfolio Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              How It Works
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              Three simple steps to transform your resume into a professional
              portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden md:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}

                  <div className="relative z-10 bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-3xl font-bold text-primary/30">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Powerful Features
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              Everything you need to create a professional portfolio that stands
              out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group bg-card rounded-xl p-8 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEMPLATE SHOWCASE */}
      <section id="templates" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Portfolio Templates
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              Choose from our collection of professionally designed templates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredTemplateIndex(index)}
                onMouseLeave={() => setHoveredTemplateIndex(null)}
              >
                <Card className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 h-full">
                  <div
                    className={`bg-gradient-to-br ${template.color} h-48 flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                      {template.preview}
                    </div>
                    {hoveredTemplateIndex === index && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <button className="px-6 py-2 bg-white text-foreground font-semibold rounded-lg hover:bg-white/90 transition-colors">
                          Preview
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {template.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Loved by Professionals
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              See what our users have to say about PersonaForge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-foreground/60 text-balance">
              Everything you need to know about PersonaForge
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 bg-muted/30 border-t border-border">
                    <p className="text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Ready to Build Your Professional Persona?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
              Join thousands of professionals who have transformed their careers
              with PersonaForge. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-card border-border"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                Get Early Access
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-foreground/60">
              No credit card required. 14-day free trial included.
            </p>
          </div>
        </div>
      </section>

      
    </main>
  )
}
