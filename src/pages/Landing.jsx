import Header from "../components/layout/Header";
import Cover from "../components/sections/Hero";
import Footer from "../components/layout/Footer";

export default function Landing() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen flex flex-col relative">
      <Header />
      <Cover />
      <Footer />
    </div>
  );
}