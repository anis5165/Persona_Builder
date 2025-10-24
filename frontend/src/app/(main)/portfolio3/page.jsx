'use client';
import React, { useState, useEffect } from 'react';

const DiagonalPortfolio = ({ portfolioData: propPortfolioData }) => {
  const [portfolioData, setPortfolioData] = useState(propPortfolioData || null);
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!propPortfolioData && typeof window !== 'undefined') {
      const storedData = localStorage.getItem('extractedData');
      if (storedData) {
        setPortfolioData(JSON.parse(storedData));
      }
    }
  }, [propPortfolioData]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-2xl text-white">No portfolio data available</div>
          <p className="text-white/60">Please upload a resume to generate your portfolio</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'education', label: 'Education', icon: '🎓' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }} />
      </div>

      {/* Diagonal Split Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-50" 
             style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-900 via-red-900 to-black opacity-50" 
             style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }} />
      </div>

      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              {portfolioData.name}
            </div>
            <div className="flex gap-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  <span className="hidden md:inline">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* About Section */}
          {activeSection === 'about' && (
            <div className="grid md:grid-cols-2 gap-8 items-center min-h-[70vh]">
              <div className="space-y-6">
                <h1 className="text-7xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {portfolioData.name}
                  </span>
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full" />
                <h2 className="text-3xl text-white/80 font-light">{portfolioData.job_title}</h2>
                <p className="text-xl text-white/60 leading-relaxed">{portfolioData.summary}</p>
                <div className="flex gap-4 pt-4">
                  {portfolioData.email && (
                    <a 
                      href={`mailto:${portfolioData.email}`}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-transform"
                    >
                      Get in Touch
                    </a>
                  )}
                  <button 
                    onClick={() => setActiveSection('projects')}
                    className="px-8 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors"
                  >
                    View Work
                  </button>
                </div>
              </div>
              
              <div className="relative h-96 md:h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/10 transform rotate-3 hover:rotate-6 transition-transform duration-500" />
                <div className="absolute inset-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="text-9xl">👨‍💻</div>
                </div>
              </div>
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div className="min-h-[70vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Technical Arsenal
              </h2>
              {portfolioData.skills && portfolioData.skills.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {portfolioData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="group relative"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                      <div className="relative h-32 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:border-white/30">
                        <span className="text-lg font-semibold">{skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/60">No skills data available</div>
              )}
            </div>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <div className="min-h-[70vh]">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Professional Journey
              </h2>
              {portfolioData.experience && portfolioData.experience.length > 0 ? (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {portfolioData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white">{exp.role || exp.position}</h3>
                            <p className="text-lg text-blue-400 mt-1">{exp.company}</p>
                          </div>
                          <span className="px-4 py-2 bg-white/10 rounded-full text-sm">{exp.duration || `${exp.start_date} - ${exp.end_date || 'Present'}`}</span>
                        </div>
                        <p className="text-white/70 leading-relaxed">{exp.description}</p>
                      </div>
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/60">No experience data available</div>
              )}
            </div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <div className="min-h-[70vh]">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Featured Work
              </h2>
              {portfolioData.projects && portfolioData.projects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {portfolioData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="group relative h-80 rounded-3xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-pink-900/50 backdrop-blur-sm" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="relative h-full p-8 flex flex-col justify-end">
                        <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                        <p className="text-white/80 mb-4">{project.description}</p>
                        {project.technologies && (
                          <p className="text-sm text-blue-400 mb-4">{project.technologies}</p>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all"
                          >
                            View Project <span>→</span>
                          </a>
                        )}
                      </div>
                      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/60">No projects data available</div>
              )}
            </div>
          )}

          {/* Education Section */}
          {activeSection === 'education' && (
            <div className="min-h-[70vh] flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Academic Background
              </h2>
              {portfolioData.education && portfolioData.education.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {portfolioData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="relative p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                        🎓
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{edu.degree}</h3>
                      <p className="text-xl text-blue-400 mb-4">{edu.institution}</p>
                      {edu.end_year && (
                        <p className="text-white/70 mb-2">Graduated: {edu.end_year}</p>
                      )}
                      {edu.location && (
                        <p className="text-white/60">📍 {edu.location}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/60">No education data available</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10 backdrop-blur-sm">
        <div className="text-center text-white/60">
          © {new Date().getFullYear()} {portfolioData.name}. Designed with passion.
        </div>
      </footer>
    </div>
  );
};

export default DiagonalPortfolio;