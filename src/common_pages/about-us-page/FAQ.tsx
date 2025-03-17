import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="px-10">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>How does this platform work?</AccordionTrigger>
          <AccordionContent>
            Our platform connects landlords with tenants looking for rental
            homes. Landlords can list their properties with details and photos,
            while tenants can browse and request to book a house. Once a request
            is approved, the tenant can proceed with payment through Stripe.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Is there a fee for using the platform?
          </AccordionTrigger>
          <AccordionContent>
            Creating an account and browsing listings is free for both landlords
            and tenants. However, a small service fee may apply during the
            payment process to cover transaction costs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            What happens if my booking request is rejected?
          </AccordionTrigger>
          <AccordionContent>
            If a landlord rejects your booking request, you can explore other
            available listings and submit a request for a different property.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
