import { initBackground } from './modules/background.js';
import { initProjects } from './modules/projects.js';
import { initGallery } from './modules/gallery.js';

window.addEventListener('DOMContentLoaded', async () => {
    initBackground();
    const projects = await initProjects();
    initGallery(projects);
});
