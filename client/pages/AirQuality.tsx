import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, AlertCircle } from "lucide-react";

export default function AirQuality() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                <Wind className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Air Quality & Public Health Dashboard
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Monitor live AQI levels, pollution trends, and get personalized health recommendations based on air quality conditions.
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-green-600" />
                    Planned Features
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Live AQI map with real-time sensors</li>
                    <li>✓ 7-day air quality forecast</li>
                    <li>✓ Personalized health recommendations</li>
                    <li>✓ Traffic correlation with pollution levels</li>
                    <li>✓ Vulnerable group alerts</li>
                    <li>✓ Air quality trends and history</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Want to help develop this feature? Reach out to our team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
