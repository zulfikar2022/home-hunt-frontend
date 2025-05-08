# 🏠 RentEase - Next.js Frontend

RentEase is a platform that connects landlords with tenants. Landlords can list rental properties, and tenants can search, request bookings, and complete payments. The platform also includes an admin panel for user management.

## 🚀 Features

- 🏠 **Landlords** can post rental properties with images and details.
- 🔍 **Tenants** can search for homes by location, price, and bedrooms.
- 📩 **Booking Requests**: Tenants can request to rent a house, and landlords can approve/reject requests.
- 💳 **Payments**: Stripe integration allows tenants to complete payments.
- 👨‍💼 **Admin Panel**: Admins can activate/deactivate user accounts.
- 📄 **About & FAQ Page**: Provides details about the platform.
- 📞 **Contact Page**: Displays contact details for support.

## 🛠️ Tech Stack

- 🖼️ **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- 🧩 **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- 🎨 **Styling**: Tailwind CSS
- 💳 **Payment**: Stripe Integration

## 🏗️ Installation & Setup

> #### How to run the project locally?
>
> You have to nodejs installed in your system to run the project locally.
>
> > - Clone the repository
> > - Create a .env file and provide the values of environment variables available in constants.ts file
> > - Run command `npm install`

## 🤔 Challenges Faced

One of the main challenges I faced while building this project was integrating Stripe as the payment method. Since I had never worked with Stripe before, it was a completely new experience for me. It took a lot of time and effort to understand the documentation and implement the integration. After two days of persistent work, I was finally able to successfully add Stripe to the platform.

## 🔮 Future Plans

I have several plans to enhance this project further:

- **Real-time Chat**: Implement direct messaging between users using technologies like Socket.IO to improve communication and user experience.
- **Enhanced Dashboards**: Update dashboards for all user types with more detailed and interactive statistical and analytical data to provide better insights.

## Live Deployment

You can view the live deployment of the website [https://home-hunt-frontend.vercel.app/](https://home-hunt-frontend.vercel.app/). <br/>
Backend code link: [https://github.com/zulfikar2022/home-hunt-backend](https://github.com/zulfikar2022/home-hunt-backend). <br/>
Backend live link: [https://assignmentsixbackend.vercel.app/](https://assignmentsixbackend.vercel.app/) <br/>

### 1️⃣ Clone the repository:

```sh
git clone https://github.com/zulfikar2022/home-hunt-frontend.git
cd home-hunt-frontend
```
