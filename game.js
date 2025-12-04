const draggables = document.querySelectorAll('.draggable');
const characters = document.querySelectorAll('.character');
const feedback = document.getElementById('feedback');
const instruction = document.getElementById('instruction');

let tasks = [
    { character: 'sara', clothing: 'yellow-shirt', text: 'Put a yellow shirt on Sara.' },
    { character: 'ali', clothing: 'black-hat', text: 'Give Ali a black hat.' },
    { character: 'sara', clothing: 'red-jacket', text: 'Put on a red jacket on Sara.' }
];

let currentTaskIndex = 0;

function loadTask() {
    const task = tasks[currentTaskIndex];
    instruction.textContent = task.text;
    feedback.textContent = '';
}

draggables.forEach(item => {
    item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text', e.target.dataset.name);
    });
});

characters.forEach(char => {
    char.addEventListener('dragover', e => {
        e.preventDefault();
    });

    char.addEventListener('drop', e => {
        e.preventDefault();
        const clothing = e.dataTransfer.getData('text');
        const task = tasks[currentTaskIndex];

       if (char.id === task.character && clothing === task.clothing) {
    feedback.textContent = "Great! Good job!";

    const img = document.createElement('img');
    img.src = `../assets/clothes/${clothing}.png`;
    img.classList.add('clothing');

    // اضافه کردن کلاس مخصوص لباس
    if (clothing.includes('shirt')) img.classList.add('shirt');
    if (clothing.includes('hat')) img.classList.add('hat');
    if (clothing.includes('jacket')) img.classList.add('jacket');

    char.appendChild(img);

    currentTaskIndex++;
    if (currentTaskIndex < tasks.length) {
        setTimeout(loadTask, 1000);
    } else {
        instruction.textContent = "🎉 All tasks completed!";
    }
}

