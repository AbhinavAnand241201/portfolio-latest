import React from 'react';
import { Mail, Linkedin, Github, MapPin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section relative bg-black text-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Connect With Me</h2>
          <p className="text-white max-w-2xl mx-auto">
            Let's connect and discuss opportunities!
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 md:p-10 bg-black text-white border border-white">
            <div className="flex flex-col items-center gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-black border border-white">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Email</p>
                    <a 
                      href="mailto:iabhinavanandworks@gmail.com" 
                      className="font-medium text-white"
                    >
                      iabhinavanandworks@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-black border border-white">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Location</p>
                    <p className="font-medium text-white">NIT Durgapur, West Bengal, India</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-6">
                <a 
                  href="https://www.linkedin.com/in/abhinav-anand-858a3a250/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="p-3 rounded-full bg-black border border-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} className="text-white" />
                </a>
                
                <a 
                  href="https://github.com/AbhinavAnand241201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black border border-white"
                  aria-label="GitHub"
                >
                  <Github size={24} className="text-white" />
                </a>

                <a 
                  href="https://x.com/AbhinavAnand773"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black border border-white"
                  aria-label="Twitter"
                >
                  <Twitter size={24} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;