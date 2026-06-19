export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">
            Sonic Signatures
          </h1>
        </div>

        <div className="flex gap-8 text-sm text-zinc-400">
          {/* <button>Dashboard</button>
          <button>Analysis</button>
          <button>Database</button>
          <button>About</button> */}
        </div>
      </div>
    </nav>
  );
}