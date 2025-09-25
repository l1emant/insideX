export default function Hero() {
  return (
    <main
      id="content"
      className="relative flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 bg-neutral-900 flex-grow py-16"
    >
      {/* Background element */}
      <div 
        className="absolute top-0 start-1/2 bg-no-repeat bg-top size-full -z-10 transform -translate-x-1/2 opacity-15"
        style={{ 
          backgroundImage: "url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')",
          backgroundSize: "cover"
        }}
      ></div>
      
      <div className="container mx-auto max-w-4xl">
        {/* Text Container */}
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 tracking-tight leading-tight mb-6">
            Real-Time Insider Trading & Rumor Detector
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            InsiderX helps you track unusual market activity in real time —
            powered by AI that explains trends with live news and social chatter.
          </p>
        </div>

        {/* Demo Button */}
        <div className="mt-10">
          <a
            href="/demo"
            className="py-3 px-8 inline-flex justify-center items-center gap-x-2 text-base font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 duration-300"
          >
            Try Live Demo
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}