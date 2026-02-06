import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Droplets,
  MapPin,
  AlertTriangle,
  Cloud,
  Home,
  Droplet,
  Filter,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const REPORT_TYPES = [
  { value: "waterlogging", label: "Waterlogging / Flooding" },
  { value: "drain-clog", label: "Clogged Drain" },
  { value: "sewage-leak", label: "Sewage Leak" },
  { value: "pipe-burst", label: "Pipe Burst" },
  { value: "drain-overflow", label: "Drain Overflow" },
  { value: "other", label: "Other" },
];

const SEVERITY_LEVELS = [
  { value: "low", label: "Low", color: "bg-blue-100 text-blue-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-red-100 text-red-800" },
];

const MOCK_REPORTS = [
  {
    id: 1,
    type: "Waterlogging / Flooding",
    location: "Shela Area, Ahmedabad",
    severity: "high",
    date: "2024-01-16",
    reports: 12,
    status: "active",
  },
  {
    id: 2,
    type: "Clogged Drain",
    location: "Maninagar, Ahmedabad",
    severity: "medium",
    date: "2024-01-14",
    reports: 5,
    status: "maintenance",
  },
  {
    id: 3,
    type: "Sewage Leak",
    location: "Old City, Surat",
    severity: "high",
    date: "2024-01-13",
    reports: 8,
    status: "active",
  },
  {
    id: 4,
    type: "Pipe Burst",
    location: "Vadodara Road, Ahmedabad",
    severity: "high",
    date: "2024-01-11",
    reports: 3,
    status: "resolved",
  },
  {
    id: 5,
    type: "Waterlogging / Flooding",
    location: "Iscon, Ahmedabad",
    severity: "medium",
    date: "2024-01-09",
    reports: 4,
    status: "maintenance",
  },
];

const ALERTS = [
  {
    id: 1,
    title: "Heavy Rain Expected Tomorrow",
    message: "Residents in Shela area advised to stay alert for potential flooding",
    icon: Cloud,
  },
  {
    id: 2,
    title: "Drainage Maintenance Ongoing",
    message: "Main drain near Maninagar closed for cleaning - water diversion active",
    icon: Home,
  },
  {
    id: 3,
    title: "Relief Shelters Open",
    message: "3 relief shelters available in flood-prone areas: locations listed below",
    icon: Droplet,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Active Issue
        </Badge>
      );
    case "maintenance":
      return <Badge className="bg-blue-100 text-blue-800">Maintenance</Badge>;
    case "resolved":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Resolved
        </Badge>
      );
    default:
      return null;
  }
};

export default function Drainage() {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
    severity: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ type: "", location: "", description: "", severity: "" });
  };

  const filteredReports =
    filterSeverity === "all"
      ? MOCK_REPORTS
      : MOCK_REPORTS.filter((r) => r.severity === filterSeverity);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Droplets className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Drainage & Flood Monitoring
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Report flooding, clogged drains, and sewage issues. Get real-time
              alerts about water-related problems in your area and track
              maintenance progress. Inspired by Ahmedabad's need to address
              severe waterlogging in areas like Shela.
            </p>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Current Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ALERTS.map((alert) => {
              const Icon = alert.icon;
              return (
                <Card key={alert.id} className="border-l-4 border-l-cyan-500">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Icon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="report" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="report">Report Issue</TabsTrigger>
              <TabsTrigger value="view">View Reports</TabsTrigger>
            </TabsList>

            {/* Report Issue Tab */}
            <TabsContent value="report" className="space-y-6">
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Flood or Drainage Issue</CardTitle>
                    <CardDescription>
                      Help authorities prioritize maintenance and respond to
                      emergencies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Issue Type */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Issue Type *
                        </label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData({ ...formData, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            {REPORT_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location *
                          </div>
                        </label>
                        <Input
                          placeholder="Street name, area, landmark"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Or tap to drop a pin on the map
                        </p>
                      </div>

                      {/* Severity */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Severity Level *
                        </label>
                        <Select
                          value={formData.severity}
                          onValueChange={(value) =>
                            setFormData({ ...formData, severity: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            {SEVERITY_LEVELS.map((level) => (
                              <SelectItem
                                key={level.value}
                                value={level.value}
                              >
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Description *
                        </label>
                        <Textarea
                          placeholder="Describe the drainage or flood issue in detail..."
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={
                          !formData.type ||
                          !formData.location ||
                          !formData.severity ||
                          !formData.description
                        }
                      >
                        Submit Report <ArrowRight className="w-4 h-4" />
                      </Button>

                      {submitted && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Report submitted successfully!
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* View Reports Tab */}
            <TabsContent value="view" className="space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    All Reports
                  </h2>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select
                      value={filterSeverity}
                      onValueChange={setFilterSeverity}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severity</SelectItem>
                        {SEVERITY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <Card
                      key={report.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-semibold text-foreground">
                                {report.type}
                              </h3>
                              <Badge
                                className={
                                  SEVERITY_LEVELS.find(
                                    (l) => l.value === report.severity
                                  )?.color || "bg-gray-100"
                                }
                              >
                                {report.severity
                                  .charAt(0)
                                  .toUpperCase() + report.severity.slice(1)}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                {report.location}
                              </p>
                              <p className="text-muted-foreground">
                                {report.reports} residents reported this issue
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Reported: {report.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(report.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Maintenance Queue Section */}
      <section className="py-12 md:py-16 bg-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Drainage Maintenance Queue
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  area: "Shela Main Drain",
                  priority: "High",
                  eta: "1-2 days",
                  crew: "15 workers",
                },
                {
                  area: "Maninagar Stormwater System",
                  priority: "High",
                  eta: "2-3 days",
                  crew: "12 workers",
                },
                {
                  area: "Old City Sewage Line",
                  priority: "High",
                  eta: "3-4 days",
                  crew: "10 workers",
                },
              ].map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {item.area}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.crew} assigned
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <Badge className="bg-red-100 text-red-800 mb-2">
                            {item.priority}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            ETA: {item.eta}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
