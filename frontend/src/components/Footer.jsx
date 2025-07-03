import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Cod<span className="text-orange-500">efolio</span></h1>
          <p className="text-gray-400 text-sm">
            Track your coding journey across platforms like Codeforces
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/compare" className="hover:text-white">Compare</a></li>
            <li><a href="/insights" className="hover:text-white">Insights</a></li>
            <li><a href="/events" className="hover:text-white">Events</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Connect</h2>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Github size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Codesis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
