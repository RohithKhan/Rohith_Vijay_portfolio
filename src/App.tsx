import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Seo } from '@/components/Seo';
import { Loader } from '@/components/Loader';
import { CustomCursor } from '@/components/CustomCursor';
import { Background } from '@/components/Background';
import { CyberScrollLine } from '@/components/CyberScrollLine';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { useLenis } from '@/hooks/useLenis';

function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <HelmetProvider>
      <Seo />
      <Loader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <CyberScrollLine />
      <Background />
      <ScrollProgress />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <Navbar />
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Achievements />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </HelmetProvider>
  );
}

export default App;
