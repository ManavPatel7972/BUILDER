import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, AlertCircle } from "lucide-react";

export default function SchoolTransport() {
  return (
    <Layout>
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                <Bus className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                School Transport & Attendance
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Real-time GPS bus tracking, geofenced alerts for parents, and digital attendance for student safety and accountability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Feature Coming Soon</CardTitle>
                <CardDescription>
                  This page is currently under development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    Planned Features
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Live bus location tracking with GPS</li>
                    <li>✓ Real-time ETA updates</li>
                    <li>✓ Geofenced arrival/departure alerts</li>
                    <li>✓ QR code check-in system</li>
                    <li>✓ Digital attendance logging</li>
                    <li>✓ Parent notification system</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Ensure student safety with real-time tracking and accountability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
