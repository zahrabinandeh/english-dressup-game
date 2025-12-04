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
            img.style.position = "absolute";
            img.style.top = "0";
            img.style.left = "0";
            img.style.width = "100%";
            char.appendChild(img);

            currentTaskIndex++;
            if (currentTaskIndex < tasks.length) {
                setTimeout(loadTask, 1000);
            } else {
                instruction.textContent = "🎉 All tasks completed!";
            }

        } else {
            feedback.textContent = "Try again!";
        }
    });
});

loadTask();

