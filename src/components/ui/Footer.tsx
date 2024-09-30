import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-gray-400 py-2 px-4 flex justify-between items-center text-xs sticky bottom-0">
      {/* Left Side: Navigation Links */}
      <div className="flex space-x-4">
        <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
        <a href="/about" className="hover:text-gray-200 transition-colors">About</a>
      </div>

      {/* Center: Made with Love */}
      <div className="text-center">
        Made with love <span role="img" aria-label="heart">❤️</span>
      </div>

      {/* Right Side: LinkedIn */}
      <div className="flex space-x-4">
        <a href="www.linkedin.com/in/vishaal-ls-439196181" className="hover:text-gray-200 transition-colors">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;