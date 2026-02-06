import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Emergency() {
  return (
    <Layout>
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-pink-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Women & Child Emergency Safety
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Quick SOS alerts with instant location sharing to emergency contacts and nearby trained volunteers for immediate assistance.
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
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-pink-600" />
                    Planned Features
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ One-tap SOS button for emergencies</li>
                    <li>✓ Automatic location tracking via GPS</li>
                    <li>✓ Instant notifications to emergency contacts</li>
                    <li>✓ Nearby volunteer alerts</li>
                    <li>✓ Emergency contact management</li>
                    <li>✓ Police notification integration</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Safety is our priority. Help us protect vulnerable members of our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
