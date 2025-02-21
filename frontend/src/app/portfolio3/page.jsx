'use client';
import React, { useEffect, useState } from 'react';

const TemplateThree = ({ portfolioData: propPortfolioData }) => {
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
    <div className="p-10 min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold">{portfolioData.name}</h1>
        <h2 className="text-3xl font-semibold mt-2">{portfolioData.job_title}</h2>
        <p className="mt-4 text-lg italic">{portfolioData.summary}</p>
      </div>

      {/* Skills Section */}
      <div className="mt-10">
        <h3 className="text-3xl font-bold text-center">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
          {portfolioData.skills && portfolioData.skills.length > 0 ? (
            portfolioData.skills.map((skill, index) => (
              <span key={index} className="bg-white text-purple-700 py-2 px-4 rounded shadow-md">
                {skill}
              </span>
            ))
          ) : (
            <p>No skills available</p>
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-10">
        <h3 className="text-3xl font-bold text-center">Experience</h3>
        <div className="mt-4 space-y-6">
          {portfolioData.experience && portfolioData.experience.length > 0 ? (
            portfolioData.experience.map((exp, index) => (
              <div key={index} className=" text-purple-700 p-4 rounded shadow-md">
                <h4 className="text-2xl font-semibold">{exp.role}</h4>
                <p className="text-gray-700">{exp.company} | {exp.duration}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-12">
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
                  <p className="mt-2 text-gray-600">
                    {project.technologies ? <p className="mt-2 text-gray-600">
                      <span className="font-semibold">Technologies:</span>{' '}
                      {project.technologies}
                    </p> : null}
                  </p>
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
      <section id="education" className="py-12">
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

      {/* Footer */}
      <footer className="mt-16 text-center text-white">
        <p className="text-lg">&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TemplateThree;
