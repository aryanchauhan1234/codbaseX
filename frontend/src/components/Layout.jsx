// src/components/Layout.jsx
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black  dark:text-white transition-colors duration-300">
      {children}
    </div>
  );
};

export default Layout;
