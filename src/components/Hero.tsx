import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-pearl text-charcoal text-sm font-medium mb-6 animate-on-scroll">
            Discover Innovation
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-on-scroll">
            Create Something
            <span className="block text-accent">Extraordinary</span>
          </h1>
          
          <p className="text-lg md:text-xl text-accent mb-8 animate-on-scroll">
            Experience design perfection through simplicity and innovation.
            Every detail matters in creating memorable experiences.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-on-scroll">
            <button className="button-primary flex items-center gap-2 group">
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 text-charcoal hover:text-accent transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;