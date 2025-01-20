import { Github } from 'lucide-react';

export default function Footer() {
  const contributors = [
    { name: "SnowyCrest", github: "https://github.com/SnowyCrest", avatar: "https://avatars.githubusercontent.com/u/186194122?v=4" },
    { name: "found-sec", github: "https://github.com/found-sec", avatar: "https://avatars.githubusercontent.com/u/114866470?v=4" },
    { name: "OmarAbdullah1-ux", github: "https://github.com/OmarAbdullah1-ux", avatar: "https://avatars.githubusercontent.com/u/186083600?v=4" },
    { name: "tonkerbell", github: "https://github.com/tonkerbell", avatar: "https://avatars.githubusercontent.com/u/195100560?v=4" },
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-950 to-indigo-950 relative mt-20">
      <div className="absolute inset-0 opacity-10">
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <img 
              src="/Logo_Text.png" 
              alt="Hope Nexus Logo" 
              className="h-36 mb-3" 
            />
            <p className="text-slate-400 max-w-md text-xl font-bold">
              / For the better of everyone.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-600 pt-6">
          <div className="relative flex flex-col md:flex-row items-center gap-4">
            <div className="md:absolute left-0">
              <a
                href="https://github.com/yourusername/Hope-Nexus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center w-full gap-4">
              {contributors.map((contributor, index) => (
                <a
                  key={index}
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{contributor.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
