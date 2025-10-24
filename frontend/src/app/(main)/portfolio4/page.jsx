'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Unique animation variants
const floatingOrb = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const spiralReveal = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -180 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.8,
      type: "spring",
      stiffness: 100
    }
  }
};

const holographicCard = {
  hidden: { 
    opacity: 0,
    y: 50,
    backgroundPosition: "0% 0%"
  },
  visible: { 
    opacity: 1,
    y: 0,
    backgroundPosition: "100% 100%",
    transition: { 
      duration: 0.6,
      backgroundPosition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }
};

const TemplateThree = ({ portfolioData: propPortfolioData }) => {
  const [portfolioData, setPortfolioData] = useState(propPortfolioData || null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!propPortfolioData && typeof window !== 'undefined') {
      const storedData = localStorage.getItem('extractedData');
      if (storedData) {
        setPortfolioData(JSON.parse(storedData));
      }
    }
  }, [propPortfolioData]);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
        <motion.div
          className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // Helper function to get technologies as array
  const getTechnologies = (project) => {
    if (!project.technologies) return [];
    if (Array.isArray(project.technologies)) return project.technologies;
    if (typeof project.technologies === 'string') return project.technologies.split(',').map(t => t.trim());
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          variants={floatingOrb}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          variants={floatingOrb}
          animate="animate"
          style={{ y: [0, 30, 0] }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {['hero', 'skills', 'experience', 'projects', 'education'].map((section) => (
          <motion.button
            key={section}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSection === section ? 'bg-cyan-400 scale-125' : 'bg-white/30'
            }`}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(section);
            }}
          />
        ))}
      </div>

      {/* Hero Section with Geometric Pattern */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>
        
        <div className="text-center relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            className="inline-block mb-8"
            variants={spiralReveal}
            initial="hidden"
            animate="visible"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-2xl font-bold">
                {portfolioData.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {portfolioData.name}
          </motion.h1>

          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xl font-semibold">
              {portfolioData.job_title}
            </span>
          </motion.div>

          <motion.p
            className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {portfolioData.summary}
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Skills Section with Hexagonal Grid */}
      <section id="skills" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Arsenal
          </motion.h2>

          {portfolioData.skills && portfolioData.skills.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {portfolioData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-square bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center p-4 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-all duration-300">
                    <span className="text-lg font-medium text-center">{skill}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60">No skills data available</div>
          )}
        </div>
      </section>

      {/* Experience Section with Timeline */}
      <section id="experience" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional Journey
          </motion.h2>

          {portfolioData.experience && portfolioData.experience.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-400 transform -translate-x-1/2" />
              
              {portfolioData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 z-10" />
                  
                  <div className="ml-16 md:ml-0 md:w-1/2">
                    <motion.div
                      variants={holographicCard}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
                    >
                      <h3 className="text-2xl font-bold text-cyan-400">{exp.role || exp.position}</h3>
                      <p className="text-white/80 text-lg mt-2">{exp.company}</p>
                      <p className="text-cyan-300/80 text-sm mt-1">{exp.duration || `${exp.start_date} - ${exp.end_date || 'Present'}`}</p>
                      <p className="mt-4 text-white/70 leading-relaxed">{exp.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60">No experience data available</div>
          )}
        </div>
      </section>

      {/* Projects Section with Interactive Cards */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Creative Projects
          </motion.h2>

          {portfolioData.projects && portfolioData.projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project, index) => {
                const technologies = getTechnologies(project);
                
                return (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 h-full group-hover:border-cyan-400/30 transition-all duration-300">
                      <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-white/70 leading-relaxed mb-4">{project.description}</p>
                      
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm border border-cyan-400/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                          whileHover={{ x: 5 }}
                        >
                          Explore Project
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-white/60">No projects data available</div>
          )}
        </div>
      </section>

      {/* Education Section with Modern Cards */}
      <section id="education" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Academic Background
          </motion.h2>

          {portfolioData.education && portfolioData.education.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl transform group-hover:scale-105 transition-all duration-300" />
                  <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 h-full">
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-cyan-300 text-lg mb-4">{edu.institution}</p>
                    
                    <div className="space-y-2">
                      {edu.end_year && (
                        <div className="flex items-center gap-3 text-white/70">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                          <span>Graduated: {edu.end_year}</span>
                        </div>
                      )}
                      {edu.location && (
                        <div className="flex items-center gap-3 text-white/70">
                          <span className="w-2 h-2 bg-purple-400 rounded-full" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60">No education data available</div>
          )}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-12 text-center relative border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            className="text-xl text-white/60 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Let's create something amazing together
          </motion.p>
          <motion.p
            className="text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            © {new Date().getFullYear()} {portfolioData.name}. Crafted with innovation and passion.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default TemplateThree;