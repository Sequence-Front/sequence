import { Project } from '../models/Project';

export class ProjectService {
  private projects: Project[];

  constructor(projectsData: any[]) {
    this.projects = projectsData.map(data => 
      new Project(
        data.id,
        data.title,
        data.author,
        data.date,
        data.tags,
        data.type
      )
    );
  }

  getFilteredProjects(searchTerm: string, selectedTags: string[]): Project[] {
    return this.projects.filter(project => {
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => project.hasTag(tag));
      const matchesSearch = project.matchesSearchTerm(searchTerm);
      return matchesTags && matchesSearch;
    });
  }

  getPaginatedProjects(projects: Project[], page: number, perPage: number): Project[] {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return projects.slice(start, end);
  }

  getTotalPages(filteredProjects: Project[], perPage: number): number {
    return Math.ceil(filteredProjects.length / perPage);
  }
} 