import { Acknowledgement } from "./components/Acknowledgement";
import { Agents } from "./components/Agents";
import { Architecture } from "./components/Architecture";
import { AssistantDemo } from "./components/AssistantDemo";
import { BookingEngine } from "./components/BookingEngine";
import { CoreJobs } from "./components/CoreJobs";
import { EnquiryForm } from "./components/EnquiryForm";
import { Evidence } from "./components/Evidence";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Impact } from "./components/Impact";
import { LanguageHandling } from "./components/LanguageHandling";
import { Problem } from "./components/Problem";
import { Safety } from "./components/Safety";
import { WhatBroke } from "./components/WhatBroke";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-neon focus:px-4 focus:py-2 focus:text-copy"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <CoreJobs />
        <Architecture />
        <AssistantDemo />
        <EnquiryForm />
        <Agents />
        <BookingEngine />
        <LanguageHandling />
        <Evidence />
        <Safety />
        <WhatBroke />
        <Impact />
        <Faq />
        <Acknowledgement />
      </main>
      <Footer />
    </>
  );
}
