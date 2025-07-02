import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GroupShowcase from "@/components/GroupShowcase";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <GroupShowcase />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
