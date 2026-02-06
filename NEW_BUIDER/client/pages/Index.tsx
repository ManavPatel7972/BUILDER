import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Building2,
  Droplets,
  Wind,
  Droplet,
  Bus,
  AlertCircle,
  ArrowRight,
  MapPin,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    id: "infrastructure",
    title: "Infrastructure Grievance Portal",
    description:
      "Report potholes, damaged bridges, unsafe buildings and track repairs in real-time",
    icon: Building2,
    href: "/infrastructure",
    color: "from-blue-500 to-blue-600",
    stats: "3,600+ complaints resolved",
  },
  {
    id: "drainage",
    title: "Drainage & Flood Monitoring",
    description:
      "Report flooding, clogged drains and monitor water-related issues with real-time alerts",
    icon: Droplets,
    href: "/drainage",
    color: "from-cyan-500 to-blue-600",
    stats: "99.7% resolution rate",
  },
  {
    id: "air-quality",
    title: "Air Quality & Health Dashboard",
    description:
      "Monitor live AQI levels, pollution trends and get health recommendations",
    icon: Wind,
    href: "/air-quality",
    color: "from-green-500 to-emerald-600",
    stats: "Real-time monitoring",
  },
  {
    id: "blood-bank",
    title: "Blood Donation & Resources",
    description:
      "Connect donors with hospitals, request blood types and find donation camps",
    icon: Droplet,
    href: "/blood-bank",
    color: "from-red-500 to-red-600",
    stats: "Save lives together",
  },
  {
    id: "school-transport",
    title: "School Transport & Attendance",
    description:
      "Real-time bus tracking, geofenced alerts and digital attendance for student safety",
    icon: Bus,
    href: "/school-transport",
    color: "from-amber-500 to-orange-600",
    stats: "GPS-enabled tracking",
  },
  {
    id: "emergency",
    title: "Women & Child Emergency Safety",
    description:
      "Quick SOS alerts with location sharing to emergency contacts and nearby volunteers",
    icon: AlertCircle,
    href: "/emergency",
    color: "from-pink-500 to-red-600",
    stats: "Instant help access",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-sm font-semibold text-primary">
                Empowering Citizens, Solving Local Problems
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Civic Issues,{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Instant Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A comprehensive platform for citizens of Ahmedabad & Surat to
              report infrastructure problems, monitor environmental issues, and
              access critical resources – inspired by Gujarat's Guj-MARG success
              with 99.7% resolution rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/infrastructure">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Report an Issue <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">99.7%</div>
              <p className="text-sm opacity-90">Resolution Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">3,600+</div>
              <p className="text-sm opacity-90">Issues Resolved</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">2M+</div>
              <p className="text-sm opacity-90">Citizens Served</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <p className="text-sm opacity-90">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Solutions for Local Challenges
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each feature is designed to address specific problems faced by
              residents of Ahmedabad and Surat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.id}
                  to={feature.href}
                  className="group relative overflow-hidden rounded-xl border border-border bg-white hover:shadow-lg transition-all duration-300"
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />

                  <div className="relative p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-primary">
                        {feature.stats}
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Report",
                description: "Citizens report issues with photos and location",
                icon: MapPin,
              },
              {
                step: 2,
                title: "Track",
                description: "Monitor issue status in real-time dashboard",
                icon: TrendingUp,
              },
              {
                step: 3,
                title: "Coordinate",
                description: "Government officials update and manage issues",
                icon: Users,
              },
              {
                step: 4,
                title: "Resolve",
                description: "Issues get fixed with full accountability",
                icon: Shield,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make Your City Better Today
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Your voice matters. Report issues, help others, and be part of the
            solution for a better Ahmedabad and Surat.
          </p>
          <Link to="/infrastructure">
            <Button
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-gray-100"
            >
              Start Reporting <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
