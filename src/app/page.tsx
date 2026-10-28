import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { About } from "@/components/sections/About";
import { Assortiment } from "@/components/sections/Assortiment";
import { Contact } from "@/components/sections/Contact";
import { Diensten } from "@/components/sections/Diensten";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Merken } from "@/components/sections/Merken";
import { Ticker } from "@/components/sections/Ticker";
import { Waarom } from "@/components/sections/Waarom";

export default function Home() {
  return (
    <>
      <Header overlay />
      <main id="main">
        <Hero />
        <Ticker />
        <About />
        <Assortiment />
        <Diensten />
        <Merken />
        <Waarom />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
