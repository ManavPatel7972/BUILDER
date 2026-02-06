import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, AlertCircle } from "lucide-react";

export default function BloodBank() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white">
                <Droplet className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Blood Donation & Resource Coordination
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Connect donors with hospitals, find blood types, register for donation camps, and help save lives in emergencies.
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
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Planned Features
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Donor registry with blood type matching</li>
                    <li>✓ Emergency blood request posting</li>
                    <li>✓ Donation camp scheduler</li>
                    <li>✓ Hospital inventory management</li>
                    <li>✓ SMS/Email notifications for donors</li>
                    <li>✓ Donation history and milestones</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Save lives. Become a regular donor or request blood in emergencies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
