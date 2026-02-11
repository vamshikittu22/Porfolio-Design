import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import GitHubStats from './components/GitHubStats';

export const GithubSection: React.FC = () => {
  return (
    <section id="github-section" className="mb-[40rem] print:hidden">
      <ScrollReveal>
        <GitHubStats />
      </ScrollReveal>
    </section>
  );
};

export default GithubSection;