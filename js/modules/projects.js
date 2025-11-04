export async function initProjects() {
    let projectsData = [];
    try {
        const response = await fetch('js/data/projects.json');
        if (response.ok) {
            projectsData = await response.json();
        }
    } catch (error) {
        console.error('Failed to load project data', error);
    }

    const container = document.getElementById('projects-container');
    if (!container) return projectsData;

    container.innerHTML = projectsData
        .map(project => `<div class="project-card">${project.title}</div>`)
        .join('');

    return projectsData;
}
