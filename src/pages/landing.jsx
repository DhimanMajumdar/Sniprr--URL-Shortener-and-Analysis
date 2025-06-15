import React, { useState } from "react";
import { Input } from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router";
import { Star } from "lucide-react";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Marketing Manager",
      content: "Sniprr cut our campaign links by 70% and boosted CTR by 20%!",
      stars: 5,
    },
    {
      name: "Alex P.",
      role: "Developer",
      content: "The analytics helped us optimize our customer journeys.",
      stars: 4,
    },
    {
      name: "Priya M.",
      role: "E-commerce Owner",
      content:
        "Custom short URLs made our social media links more trustworthy.",
      stars: 5,
    },
  ];

  // Features data
  const features = [
    {
      title: "Lightning Fast",
      description: "Redirects in under 100ms with 99.9% uptime",
      icon: "⚡",
    },
    {
      title: "Detailed Analytics",
      description: "Track clicks, locations, and devices in real-time",
      icon: "📊",
    },
    {
      title: "QR Codes",
      description: "Generate QR codes for offline sharing",
      icon: "🔳",
    },
    {
      title: "API Access",
      description: "Integrate with your apps via REST API",
      icon: "🔌",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 text-center">
          {/* Animated gradient background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 h-[300px] bg-gradient-to-r from-violet-600/30 via-purple-500/20 to-blue-500/30 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
          </div>

          {/* Main headline with gradient text and animation */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-[textShine_3s_ease-in-out_infinite]">
                Shorten. Share. Succeed.
              </span>
            </span>
            <span className="block text-white/90">
              The{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transform -rotate-2 scale-105 opacity-20" />
                <span className="relative">ultimate</span>
              </span>{" "}
              URL solution
            </span>
          </h2>

          {/* Subheading with fade-in animation */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-blue-200/80 animate-[fadeIn_1.5s_ease-in]">
            Transform long links into powerful, trackable short URLs that drive
            engagement
          </p>

          {/* Animated cursor */}
          <div className="mt-12 inline-flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
            </span>
            <span className="text-sm font-medium text-blue-300">
              Try it now
            </span>
          </div>
        </div>
      </div>
      {/* URL Shortener Form */}

      <form
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
        onSubmit={handleShorten}
      >
        <Input
          type="url"
          placeholder="Enter your loooong URL"
          className="h-full flex-1 py-4 px-4 border border-blue-400"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button
          className="h-full cursor-pointer"
          type="submit"
          variant="destructive"
        >
          Shorten!
        </Button>
      </form>
      {/* Features Section */}
      <section className="w-full py-16  mt-2 ">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-lg border border-blue-400/20 hover:border-blue-400 transition-all"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Banner Image */}
      <img src="banner.jpeg" alt="Banner" className="w-full my-11 md:px-11" />
      {/* Testimonials Section */}
      <section className="w-full py-16 ">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            What Our Users Say 💬
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-lg border border-blue-400/20"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.stars
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-blue-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}

      <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
        <span
          className="text-[var(--primary)] animate-[bounce_2s_infinite]"
          style={{ fontSize: "1.2em" }}
        >
          ❔
        </span>
        <span className="text-white">Frequently Asked Questions</span>
        <span
          className="text-[var(--accent)] animate-[bounce_2s_infinite]"
          style={{ fontSize: "1.2em", animationDelay: "0.3s" }}
        >
          🤔
        </span>
      </h3>
      <Accordion type="multiple" collapsible className="w-full md:px-11 mb-16">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Sniprr URL shortener work? 🔗
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version
            that redirects to the original URL when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app? 👤
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage URLs, view analytics,
            and customize short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What analytics are available? 📊</AccordionTrigger>
          <AccordionContent>
            Track clicks, geolocation data, and device types for each shortened
            URL.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
