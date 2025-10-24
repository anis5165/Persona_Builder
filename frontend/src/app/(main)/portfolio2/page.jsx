'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Portfolio2 = ({ portfolioData: propPortfolioData }) => {
  const [portfolioData, setPortfolioData] = useState(propPortfolioData || null);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    if (!propPortfolioData && typeof window !== 'undefined') {
      const storedData = localStorage.getItem('extractedData');
      if (storedData) {
        setPortfolioData(JSON.parse(storedData));
      }
    }
  }, [propPortfolioData]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-3xl font-semibold text-white">Loading Portfolio...</h1>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white font-sans overflow-x-hidden">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-lg bg-white/10 border border-white/20 rounded-full px-8 py-4 shadow-2xl"
      >
        <div className="flex items-center gap-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {portfolioData.name.split(' ')[0]}
          </motion.div>
          <div className="flex gap-6">
            {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((section) => (
              <motion.a
                key={section}
                href={`#${section.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium transition-all ${
                  activeSection === section.toLowerCase()
                    ? 'text-purple-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {section}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Particles Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1"
          >
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {portfolioData.name.charAt(0)}
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
          >
            {portfolioData.name}
          </motion.h1>

          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl mb-8 text-purple-300 font-light"
          >
            {portfolioData.job_title}
          </motion.h2>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${portfolioData.email}`}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              📧 Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${portfolioData.phone}`}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              📱 Call Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/50 text-4xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div variants={itemVariants} className="relative">
          <h3 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h3>
          <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 leading-relaxed max-w-4xl backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10"
        >
          {portfolioData.summary}
        </motion.p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="py-24 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={itemVariants} className="relative mb-12">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h3>
            <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          </motion.div>
          <motion.div variants={containerVariants} className="flex flex-wrap gap-4">
            {portfolioData.skills?.map((skill, index) => (
              <motion.span
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400 transition-all group cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">{skill}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity"
                  layoutId={`skill-bg-${index}`}
                />
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div variants={itemVariants} className="relative mb-12">
          <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Experience
          </h3>
          <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        </motion.div>
        <div className="space-y-8 relative">
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full"></div>

          {portfolioData.experience?.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="relative pl-12 group"
            >
              <motion.div
                className="absolute left-0 top-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-950"
                whileHover={{ scale: 1.5 }}
              />
              <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all">
                <h4 className="text-2xl font-bold text-white mb-2">{exp.role}</h4>
                <p className="text-purple-300 mb-2">{exp.company} • {exp.duration}</p>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-24 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={itemVariants} className="relative mb-12">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h3>
            <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          </motion.div>
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects?.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl"
                    >
                      🚀
                    </motion.div>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  {project.technologies && (
                    <p className="text-sm text-purple-300 mb-4">
                      <span className="font-semibold">Tech Stack:</span> {project.technologies}
                    </p>
                  )}
                  {project.link && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link}
                      className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                      View Project →
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div variants={itemVariants} className="relative mb-12">
          <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Education
          </h3>
          <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        </motion.div>
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.education?.map((education, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-2xl font-bold text-white">{education.degree}</h4>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl"
                >
                  🎓
                </motion.div>
              </div>
              <p className="text-purple-300 mb-2">{education.institution}</p>
              <p className="text-gray-400 text-sm mb-2">Graduated: {education.end_year}</p>
              {education.location && <p className="text-gray-400 text-sm mb-2">📍 {education.location}</p>}
              {education.percentage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Score: {education.percentage}</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(parseFloat(education.percentage), 100)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${portfolioData.email}`}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all text-lg font-medium"
            >
              📧 {portfolioData.email}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${portfolioData.phone}`}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all text-lg font-medium"
            >
              📱 {portfolioData.phone}
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white/10 py-8 text-center backdrop-blur-sm"
      >
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} {portfolioData.name}. Crafted with 💜
        </p>
      </motion.footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all z-50"
      >
        ↑
      </motion.button>
    </div>
  );
};

export default Portfolio2;