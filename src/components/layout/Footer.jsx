export default function Footer() {
  return (
    <footer className="text-center py-4 bg-transparent mt-auto">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} InsideX ·{" "}
          <a
            href="https://github.com/l1emant/insideX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-indigo-400 transition"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}