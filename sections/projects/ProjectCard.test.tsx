import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from './ProjectCard';
import { ProjectCategory } from '../../config/types';

const mockProject = {
  id: 'test-p-id',
  title: 'Architecture Spec',
  tagline: 'Precision UI',
  description: 'Full spec description.',
  overview: 'System overview.',
  useCases: ['Node 1'],
  architecture: 'Clean patterns.',
  roleHighlights: ['Lead Dev'],
  category: ProjectCategory.AI,
  thumbnailUrl: 'test.jpg',
  secondaryImageUrl: 'test-bg.jpg',
  tech: ['Vitest', 'React']
};

describe('ProjectCard', () => {
  it('displays core project identity', () => {
    render(
      <ProjectCard 
        project={mockProject} 
        index={0} 
        isActive={false} 
        isInactive={false} 
        onToggle={() => {}} 
        accent="indigo" 
      />
    );
    
    expect(screen.getByText('Architecture Spec')).toBeInTheDocument();
    expect(screen.getByText(ProjectCategory.AI)).toBeInTheDocument();
  });

  it('triggers toggle handler on user interaction', () => {
    const onToggleMock = vi.fn();
    render(
      <ProjectCard 
        project={mockProject} 
        index={0} 
        isActive={false} 
        isInactive={false} 
        onToggle={onToggleMock} 
        accent="indigo" 
      />
    );
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('reflects active accessibility state', () => {
    render(
      <ProjectCard 
        project={mockProject} 
        index={0} 
        isActive={true} 
        isInactive={false} 
        onToggle={() => {}} 
        accent="indigo" 
      />
    );
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies dimmed styling when another project is focused', () => {
    const { container } = render(
      <ProjectCard 
        project={mockProject} 
        index={0} 
        isActive={false} 
        isInactive={true} 
        onToggle={() => {}} 
        accent="indigo" 
      />
    );
    
    // The top-level button element should have opacity-50
    expect(container.firstChild).toHaveClass('opacity-50');
  });
});