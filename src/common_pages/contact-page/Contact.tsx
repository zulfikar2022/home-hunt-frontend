import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  LinkedinIcon,
} from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-lg mx-auto p-6  shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      <p className="text-gray-600 text-center mb-6">
        Feel free to reach out to us through any of the following platforms.
      </p>

      <div className="space-y-4">
        <ContactItem
          icon={<Mail className="text-blue-500" />}
          label="Email"
          value="sayedzulfikar2019@gmail.com"
          link="mailto:sayedzulfikar2019@gmail.com"
        />
        <ContactItem
          icon={<Phone className="text-green-500" />}
          label="Phone"
          value="+8801309417042"
          link="tel:+8801309417042"
        />
        <ContactItem
          icon={<MessageCircle className="text-green-600" />}
          label="WhatsApp"
          value="Chat with us"
          link="https://wa.me/01309417042"
        />
        <ContactItem
          icon={<Send className="text-blue-400" />}
          label="Telegram"
          value="Chat with us"
          link="https://t.me/@zulfikar_mahmud"
        />
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <SocialLink
          icon={<Facebook className="text-blue-600" />}
          link="https://www.facebook.com/sayed.zulfikarMahmud/"
        />
        <SocialLink
          icon={<LinkedinIcon className="text-blue-400" />}
          link="https://www.linkedin.com/in/sayed-zulfikarmahmud/"
        />
        <SocialLink
          icon={<Instagram className="text-pink-500" />}
          link="https://www.instagram.com/sayed_zulfikarmahmud/"
        />
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-400 transition"
    >
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-gray-600 text-sm">{value}</p>
      </div>
    </a>
  );
}

function SocialLink({ icon, link }: { icon: React.ReactNode; link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full hover:bg-gray-100 transition"
    >
      {icon}
    </a>
  );
}
