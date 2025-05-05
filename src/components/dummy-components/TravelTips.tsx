import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TravelTips() {
  return (
    <section className="my-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Travel Tips & Advice
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pt-3">
            <CardTitle>Plan Smart, Travel Easy</CardTitle>
          </CardHeader>
          <CardContent>
            Booking early, researching local customs, and keeping digital copies
            of your documents can save you from headaches.
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card>
          <CardHeader className="pt-3">
            <CardTitle>Top Safety Tips for Tenants</CardTitle>
          </CardHeader>
          <CardContent>
            Learn how to verify listings, read host reviews, and check
            neighborhoods before booking.
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card>
          <CardHeader className="pt-3">
            <CardTitle>Packing Essentials</CardTitle>
          </CardHeader>
          <CardContent>
            Do not forget power adapters, travel-size toiletries, and emergency
            contacts. Pack like a pro!
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </section>
  );
}
