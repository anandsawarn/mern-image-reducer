import { useRef, useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../Context/AuthContext";
import ImageReduce from "../Components/ImageReduce";
import MergePDF from "../components/MergePDF";
import SplitPDF from "../components/SplitPDF";
import CompressPDF from "../components/CompressPDF";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-900 text-white px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Smart & Secure <span className="text-yellow-300">PDF Tools</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6 leading-relaxed"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Effortlessly manage your PDFs with our powerful tools. Merge, split, and compress your documents while ensuring security and speed. Designed for professionals, students, and businesses alike.
        </motion.p>

        <motion.p
          className="text-lg text-gray-300 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Say goodbye to complicated software. Our intuitive platform lets you process PDFs instantly—without losing quality.
        </motion.p>

        {/* Floating Decorative Elements */}
        <div className="absolute top-12 left-12 w-14 h-14 bg-indigo-500 rounded-full filter blur-xl opacity-60 animate-bounce"></div>
        <div className="absolute bottom-16 right-16 w-20 h-20 bg-yellow-400 rounded-full filter blur-xl opacity-60 animate-bounce"></div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mb-12">
            A seamless and secure experience for handling all your PDF needs.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast & Secure</h3>
              <p className="text-gray-600">Process your PDFs in seconds with top-notch encryption.</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly</h3>
              <p className="text-gray-600">An intuitive design that makes handling PDFs easier than ever.</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cloud Integration</h3>
              <p className="text-gray-600">Access and manage your files anywhere with seamless cloud support.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Compress PDFs Efficiently</h2>
          <ImageReduce />
        </div>
      </section>

      {/* Merge PDF Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Merge PDFs Effortlessly</h2>
          <p className="text-gray-600 text-center mb-8">Combine multiple PDFs into one document with ease.</p>
          <MergePDF />
        </div>
      </section>

      {/* Split PDF Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Split PDFs with Precision</h2>
          <p className="text-gray-600 text-center mb-8">Extract pages or divide documents efficiently.</p>
          <SplitPDF />
        </div>
      </section>

      {/* Compress PDF Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Compress PDFs Efficiently</h2>
          <p className="text-gray-600 text-center mb-8">Reduce file size while maintaining high quality.</p>
          <CompressPDF />
        </div>
      </section>
     
    </div>
  );
};

export default Home;
