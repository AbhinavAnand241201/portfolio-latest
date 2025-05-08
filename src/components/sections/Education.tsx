import React from 'react';

const education = [
  {
    degree: 'B.Tech in Computer Science',
    school: 'National Institute of Technology, Durgapur',
    year: '2021 - 2025',
    description: 'Focusing on Data Structures, Algorithms, and Software Development.'
  },
  {
    degree: 'Higher Secondary Education',
    school: 'Delhi Public School, Bokaro',
    year: '2019 - 2021',
    description: 'Completed with distinction in Computer Science.'
  }
];

const Education: React.FC = () => {
  return (
    <section id="education" className="section relative bg-black text-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Education</h2>
          <p className="text-white max-w-2xl mx-auto">
            My academic journey and qualifications.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-black border border-white rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-2 text-white">{edu.degree}</h3>
              <p className="text-white mb-2">{edu.school}</p>
              <p className="text-white/80 mb-3">{edu.year}</p>
              <p className="text-white/80">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 