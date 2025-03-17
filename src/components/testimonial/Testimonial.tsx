import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonial({
  fallback,
  text,
  author,
}: {
  fallback: string;
  text: string;
  author: string;
}) {
  return (
    <Card className="max-w-md mx-auto  p-6 rounded-2xl shadow-lg">
      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="w-16 h-16 my-4">
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <p className="text-lg italic">{text}</p>
        <span className="mt-4 text-sm font-semibold mb-2">- {author}</span>
      </CardContent>
    </Card>
  );
}
