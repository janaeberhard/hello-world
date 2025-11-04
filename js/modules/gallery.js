export function initGallery(projects = []) {
    const galleryView = document.getElementById('galleryView');
    if (!galleryView) return;

    console.log('Gallery initialized with', projects.length, 'projects');
}
