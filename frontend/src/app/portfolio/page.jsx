'use client';
import React, { useEffect, useState } from 'react';
const Portfolio = ({ portfolioData: propPortfolioData }) => {
  const [portfolioData, setPortfolioData] = useState(propPortfolioData || null);

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
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-gray-800">
              {portfolioData.name}
            </div>
            <div>
              <a href="#about" className="text-gray-600 hover:text-gray-800 mx-2">
                About
              </a>
              <a href="#skills" className="text-gray-600 hover:text-gray-800 mx-2">
                Skills
              </a>
              <a href="#experience" className="text-gray-600 hover:text-gray-800 mx-2">
                Experience
              </a>
              <a href="#projects" className="text-gray-600 hover:text-gray-800 mx-2">
                Projects
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-800 mx-2">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              {portfolioData.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 mt-2">
              {portfolioData.job_title}
            </h2>
            <div className="mt-6">
              <a
                href={`mailto:${portfolioData.email}`}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mr-4"
              >
                Email Me
              </a>
              <a
                href={`tel:${portfolioData.phone}`}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Call Me
              </a>
            </div>
          </div>
          {portfolioData.image && (
            <div className="md:w-1/2 mt-6 md:mt-0">
              <img
                src={portfolioData.image}
                alt={`${portfolioData.name}'s profile`}
                className="rounded-full w-64 h-64 object-cover mx-auto"
              />
            </div>
          )}
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-semibold mb-6 text-gray-800">About Me</h3>
        <p className="text-gray-700">{portfolioData.summary}</p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioData.skills &&
              portfolioData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded shadow text-center text-gray-700"
                >
                  {skill}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-semibold mb-6 text-gray-800">Experience</h3>
        <div className="space-y-6">
          {portfolioData.experience &&
            portfolioData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-2xl font-semibold text-gray-800">{exp.role}</h4>
                <p className="text-gray-600">
                  {exp.company} | {exp.duration}
                </p>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.projects &&
              portfolioData.projects.map((project, index) => (
                <div
                  key={index}
                  className="border rounded shadow hover:shadow-lg transition p-4"
                >
                  <h4 className="text-2xl font-semibold text-gray-800">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-gray-700">{project.description}</p>
                  {project.technologies ? <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Technologies:</span>{' '}
                    {project.technologies}
                  </p> : null} 
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-blue-500 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* education */}
      <section id="education" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.education &&
              portfolioData.education.map((education, index) => (
                <div
                  key={index}
                  className="border rounded shadow hover:shadow-lg transition p-4"
                >
                  <h4 className="text-2xl font-semibold text-gray-800">
                    {education.degree}
                  </h4>
                  <p className="mt-2 text-gray-700">{education.institution}</p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Passout:</span>{' '}
                    {education.end_year}
                  </p>
                  {education.location ? <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Location:</span>{' '}
                    {education.location}
                  </p> : null}
                  {education.percentage ? <p className="mt-2 text-gray-600">
                    <span className="font-semibold">percentage:</span>{' '}
                    {education.percentage}
                  </p> : null}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-semibold mb-6 text-gray-800">Contact</h3>
        <p className="text-gray-700 mb-4">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>
        <div className="flex flex-col md:flex-row items-center">
          <a
            href={`mailto:${portfolioData.email}`}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mr-4 mb-4 md:mb-0"
          >
            Email Me
          </a>
          <a
            href={`tel:${portfolioData.phone}`}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Call Me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} {portfolioData.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
