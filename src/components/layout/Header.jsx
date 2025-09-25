export default function Header() {
  return (
    <header className="sticky top-4 inset-x-0 z-50 w-full">
      <nav className="relative max-w-4xl w-full flex items-center justify-between py-3 px-4 mx-auto rounded-xl bg-neutral-800/50 backdrop-blur-md shadow-md">
        
        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold text-white hover:text-indigo-400 transition"
        >
          InsiderX
        </a>

        {/* Nav + Button */}
        <div className="flex items-center gap-x-6">
          {/* About link */}
          <a
            href="/about"
            className="text-sm text-white/80 hover:text-white transition"
          >
            About
          </a>

          {/* Demo Button */}
          <a
            href="/demo"
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition text-sm font-medium"
          >
            Try Demo
          </a>
        </div>
      </nav>
    </header>
  );
}