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
  Building2,
  MapPin,
  Upload,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ISSUE_TYPES = [
  { value: "pothole", label: "Pothole / Road Damage" },
  { value: "bridge", label: "Damaged Bridge" },
  { value: "building", label: "Unsafe Building" },
  { value: "wall", label: "Collapsed Wall" },
  { value: "street-light", label: "Broken Street Light" },
  { value: "drainage", label: "Drainage Issue" },
  { value: "other", label: "Other Infrastructure" },
];

const SEVERITY_LEVELS = [
  { value: "low", label: "Low - Minor issue", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium - Moderate risk", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High - Severe/Dangerous", color: "bg-red-100 text-red-800" },
];

const MOCK_COMPLAINTS = [
  {
    id: 1,
    type: "Pothole / Road Damage",
    location: "Satellite Road, Ahmedabad",
    severity: "high",
    date: "2024-01-15",
    status: "resolved",
    description: "Large pothole causing traffic congestion",
  },
  {
    id: 2,
    type: "Broken Street Light",
    location: "Thaltej, Ahmedabad",
    severity: "medium",
    date: "2024-01-12",
    status: "in-progress",
    description: "Street light on Main Road not functioning",
  },
  {
    id: 3,
    type: "Damaged Bridge",
    location: "Sukhsagar Bridge, Surat",
    severity: "high",
    date: "2024-01-10",
    status: "in-progress",
    description: "Cracks visible on bridge structure",
  },
  {
    id: 4,
    type: "Unsafe Building",
    location: "Old City, Ahmedabad",
    severity: "high",
    date: "2024-01-08",
    status: "pending",
    description: "Building showing signs of structural damage",
  },
  {
    id: 5,
    type: "Pothole / Road Damage",
    location: "Navrangpura, Ahmedabad",
    severity: "medium",
    date: "2024-01-05",
    status: "resolved",
    description: "Multiple potholes on residential street",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "resolved":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "in-progress":
      return <Clock className="w-5 h-5 text-blue-600" />;
    case "pending":
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "resolved":
      return "Resolved";
    case "in-progress":
      return "In Progress";
    case "pending":
      return "Pending";
    default:
      return status;
  }
};

export default function Infrastructure() {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
    severity: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ type: "", location: "", description: "", severity: "" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Infrastructure Grievance Portal
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Report road damage, structural issues, and infrastructure problems.
              Your reports help officials prioritize repairs and ensure citizen
              safety. Inspired by Gujarat's Guj-MARG system with a 99.7%
              resolution rate.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Report an Issue</CardTitle>
                  <CardDescription>
                    Help us fix your city's infrastructure
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
                          {ISSUE_TYPES.map((type) => (
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
                          setFormData({ ...formData, location: e.target.value })
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
                            <SelectItem key={level.value} value={level.value}>
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
                        placeholder="Describe the issue in detail..."
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

                    {/* Photo Upload */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Upload Photos
                        </div>
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                      </div>
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
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Report submitted successfully!
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Complaints List */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Recent Complaints
                </h2>
                <p className="text-muted-foreground">
                  View status of reported infrastructure issues
                </p>
              </div>

              <div className="space-y-4">
                {MOCK_COMPLAINTS.map((complaint) => (
                  <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-semibold text-foreground">
                              {complaint.type}
                            </h3>
                            <Badge
                              className={`${
                                SEVERITY_LEVELS.find(
                                  (l) => l.value === complaint.severity
                                )?.color || "bg-gray-100"
                              }`}
                            >
                              {complaint.severity.charAt(0).toUpperCase() +
                                complaint.severity.slice(1)}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {complaint.location}
                            </p>
                            <p className="text-muted-foreground">
                              {complaint.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Reported: {complaint.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 whitespace-nowrap">
                          {getStatusIcon(complaint.status)}
                          <span className="font-medium text-sm">
                            {getStatusText(complaint.status)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                View All Complaints
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Impact of Your Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: "3,600+",
                text: "Road complaints lodged via Guj-MARG",
              },
              {
                number: "99.7%",
                text: "Resolution rate achieved",
              },
              {
                number: "24/7",
                text: "Real-time tracking available",
              },
            ].map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground">{stat.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
