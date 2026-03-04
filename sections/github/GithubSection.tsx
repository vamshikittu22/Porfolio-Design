import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import GitHubStats from './components/GitHubStats';
import '../../src/styles/glass-morphism.css';

export const GithubSection: React.FC = () => {
  return (
    <section id="github-section" className="py-12 md:py-16 mb-48 print:hidden">
      <ScrollReveal>
        <GitHubStats />
      </ScrollReveal>
    </section>
  );
};

export default GithubSection;