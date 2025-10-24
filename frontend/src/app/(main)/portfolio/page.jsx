'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Portfolio = ({ portfolioData: propPortfolioData }) => {
  const [portfolioData, setPortfolioData] = useState(propPortfolioData || null);

  useEffect(() => {
    if (!propPortfolioData && typeof window !== 'undefined') {
      const storedData = localStorage.getItem('extractedData');
      if (storedData) setPortfolioData(JSON.parse(storedData));
    }
  }, [propPortfolioData]);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Portfolio...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 tracking-tight">
            {portfolioData.name}
          </div>
          <div className="space-x-4 text-gray-600">
            {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 transition-colors font-medium"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="md:w-1/2"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-3">
            {portfolioData.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
            {portfolioData.job_title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {portfolioData.summary || "Passionate developer crafting digital experiences."}
          </p>
          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`mailto:${portfolioData.email}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
            >
              Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`tel:${portfolioData.phone}`}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600"
            >
              Call Me
            </motion.a>
          </div>
        </motion.div>

        {portfolioData.image && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={portfolioData.image}
              alt={`${portfolioData.name}'s profile`}
              className="rounded-full w-72 h-72 object-cover shadow-lg border-4 border-blue-200"
            />
          </motion.div>
        )}
      </header>

      {/* About */}
      <motion.section
        id="about"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <h3 className="text-3xl font-semibold mb-6 text-gray-900">About Me</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          {portfolioData.summary}
        </p>
      </motion.section>

      {/* Skills */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-gradient-to-r from-blue-50 to-white py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-8 text-gray-900">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {portfolioData.skills?.map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow p-4 text-center font-medium text-gray-700 border hover:shadow-md transition"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section
        id="experience"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <h3 className="text-3xl font-semibold mb-8 text-gray-900">Experience</h3>
        <div className="space-y-8">
          {portfolioData.experience?.map((exp, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="border-l-4 border-blue-500 pl-6 bg-white rounded-lg shadow-sm py-4"
            >
              <h4 className="text-2xl font-semibold">{exp.role}</h4>
              <p className="text-gray-600">{exp.company} • {exp.duration}</p>
              <p className="mt-3 text-gray-700 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section
        id="projects"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-white to-blue-50 py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-8 text-gray-900">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects?.map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <h4 className="text-2xl font-semibold text-gray-900">{project.title}</h4>
                <p className="mt-3 text-gray-700">{project.description}</p>
                {project.technologies && (
                  <p className="mt-2 text-gray-600">
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    View Project →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        id="education"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <h3 className="text-3xl font-semibold mb-8 text-gray-900">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.education?.map((edu, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <h4 className="text-2xl font-semibold">{edu.degree}</h4>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-600 mt-2">
                <strong>Passout:</strong> {edu.end_year}
              </p>
              {edu.location && (
                <p className="text-gray-600"><strong>Location:</strong> {edu.location}</p>
              )}
              {edu.percentage && (
                <p className="text-gray-600"><strong>Percentage:</strong> {edu.percentage}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-b from-blue-50 to-white py-16"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold mb-4 text-gray-900">Contact</h3>
          <p className="text-gray-700 mb-8 text-lg">
            Let’s connect! I’m always open to new opportunities and collaborations.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`mailto:${portfolioData.email}`}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700"
            >
              Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`tel:${portfolioData.phone}`}
              className="bg-green-500 text-white px-8 py-3 rounded-lg shadow hover:bg-green-600"
            >
              Call Me
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
