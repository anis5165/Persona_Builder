'use client';
import React, { useEffect, useState } from 'react';

const Portfolio2 = ({ portfolioData: propPortfolioData }) => {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-semibold text-gray-700 animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-neutral-300 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">{portfolioData.name}</h1>
          <div className="space-x-6">
            {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((section) => (
              <a key={section} href={`#${section.toLowerCase()}`} className="text-gray-600 hover:text-blue-500 font-medium">
                {section}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className=" pt-24 pb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold ">{portfolioData.name}</h1>
          <h2 className="text-2xl mt-2">{portfolioData.job_title}</h2>
          <div className="mt-6 flex justify-center gap-4">
            <a href={`mailto:${portfolioData.email}`} className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
              Email Me
            </a>
            <a href={`tel:${portfolioData.phone}`} className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600">
              Call Me
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-semibold ">About Me</h3>
        <p className=" mt-4">{portfolioData.summary}</p>
      </section>

      {/* Skills Section */}
      <section id="skills" className=" py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-3 mt-6">
            {portfolioData.skills?.map((skill, index) => (
              <span key={index} className="border-2 px-4 py-2 rounded-lg shadow">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-semibold">Experience</h3>
        <div className="space-y-6 mt-6">
          {portfolioData.experience?.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-2xl font-semibold text-gray-800">{exp.role}</h4>
              <p className="">{exp.company} | {exp.duration}</p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className=" py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-semibold ">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {portfolioData.projects?.map((project, index) => (
              <div key={index} className="border-2 p-6 rounded-lg shadow">
                <h4 className="text-2xl font-semibold ">{project.title}</h4>
                <p className="mt-2">{project.description}</p>
                {project.technologies ? <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Technologies:</span>{' '}
                  {project.technologies}
                </p> : null}                 {project.link && (
                  <a href={project.link} className="mt-4 inline-block text-blue-500 hover:underline">View Project</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* education */}
      <section id="education" className=" py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-6">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.education &&
              portfolioData.education.map((education, index) => (
                <div
                  key={index}
                  className="border rounded shadow hover:shadow-lg transition p-4"
                >
                  <h4 className="text-2xl font-semibold">
                    {education.degree}
                  </h4>
                  <p className="mt-2 ">{education.institution}</p>
                  <p className="mt-2 ">
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
      <section id="contact" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-semibold">Contact</h3>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <a href={`mailto:${portfolioData.email}`} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">Email Me</a>
          <a href={`tel:${portfolioData.phone}`} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">Call Me</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio2;
