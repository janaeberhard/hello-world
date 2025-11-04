export function initBackground() {
    const background = document.getElementById('background');
    if (!background) return;

    background.textContent = 'Background module initialized';
}
