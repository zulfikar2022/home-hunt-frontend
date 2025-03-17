import { Facebook, InstagramIcon, Linkedin } from "lucide-react";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className=" py-6">
      <Separator />
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 grid-cols-2 sm:mx-auto mt-2 gap-8">
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Customer Support</h5>
          <ul className="text-sm">
            <li>Contact Us</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Company Information</h5>
          <ul className="text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Explore</h5>
          <ul className="text-sm">
            <li>Services</li>
            <li>New Arrivals</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Stay Connected</h5>
          <ul className="text-sm">
            <li>Newsletter signup</li>
            <li>Blog</li>
            <li>Community Event</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 flex flex-col gap-10 my-4 justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} HomeHunt. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/sayed.zulfikarMahmud/"
            className="hover:text-white"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sayed-zulfikarmahmud/"
            className="hover:text-white"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/sayed_zulfikarmahmud/"
            className="hover:text-white"
          >
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
