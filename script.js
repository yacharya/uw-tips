const set_of_words = [
                ["Competitive", "Joyful", "Harmonious", "Considerate"],
                ["Powerful", "Good mixer", "Easy on others", "Organized"],
                ["Adventurous", "Creative", "Empathetic", "Determined"],
                ["Optimistic", "Practical", "Flexible", "Reliable"],
                ["Bold", "Charming", "Loyal", "Easily Led"],
                ["Stubborn", "Attractive", "Sweet", "Avoids"],
                ["Argumentative", "Light-hearted", "Nonchalant", "Adaptable"],
                ["Forceful", "Admirable", "Kind", "Non-resisting"],
                ["Tries new ideas", "Optimistic", "Wants to please", "Respectful"],
                ["Restless", "Popular", "Neighbourly", "Abides by rules"],
                ["Outspoken", "Companionable", "Restrained", "Accurate"],
                ["Decisive", "Talkative", "Controlled", "Conventional"],
                ["Original", "Persuasive", "Gentle", "Humble"],
                ["Assertive", "Confident", "Sympathetic", "Tolerant"],
                ["Will-power", "Open-minded", "Cheerful", "Obliging"],
                ["Unconquerable", "Playful", "Obedient", "Fussy"],
                ["Brave", "Inspiring", "Submissive", "Timid"],
                ["Positive", "Trusting", "Contented", "Peaceful"],
                ["Determined", "Convincing", "Good-natured", "Cautious"],
                ["Aggressive", "Life-of-the-party", "Easily-fooled", "Uncertain"],
                ["Daring", "Expressive", "Satisfied", "Diplomatic"],
                ["Self-reliant", "Fun-loving", "Patient", "Soft-spoken"],
                ["Nervy", "Jovial", "Even-tempered", "Precise"],
                ["Takes risks", "Warm", "Willing to help", "Not extreme"],
                ["Persistent", "Lively", "Generous", "Well-disciplined"],
                ["Eager", "High-spirited", "Willing", "Agreeable"]
];

let counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0;

const quizContainer = document.getElementById('quiz');
const quizOuterContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');
const titleContainer = document.getElementById('title-container');
const resultsContainer = document.getElementById('results-container');
const resultChart = document.getElementById('result-chart').getContext('2d');
const restartButton = document.getElementById('restart-btn');

function createQuiz() {

    set_of_words.forEach((set, index) => {
        const div = document.createElement('div');
        div.classList.add('question-set');
        const elem = document.createElement('hr')
        elem.setAttribute("width", "500px")

        set.forEach((word, i) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`;
            radio.value = i + 1;
            const label = document.createElement('label');
            label.textContent = word;
            label.prepend(radio);

            div.appendChild(label);
        });

        quizContainer.appendChild(div);
        quizContainer.appendChild(elem);
    });
}

function calculateResults() {
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');

    selectedOptions.forEach(option => {
        switch (option.value) {
            case '1':
                counter1++;
                break;
            case '2':
                counter2++;
                break;
            case '3':
                counter3++;
                break;
            case '4':
                counter4++;
                break;
        }
    });

    showResults();
}

function showResults() {
    quizOuterContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    titleContainer.style.display = 'block';
    resultsContainer.style.display = 'block';

    const data = {
        labels: ['Driver', 'Expressive', 'Amiable', 'Analytic'],
        datasets: [{
            //label: 'Scores',
            data: [counter1, counter2, counter3, counter4],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
        }]
    };

    new Chart(resultChart, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        display: true
                    }
                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        display: true
                    },
                    title: {
                        display: false
                    }
                }
            }
        }
    });
}

/*
function resetQuiz(){
    counter1 = 0;
    counter2 = 0;
    counter3 = 0;
    counter4 = 0;

    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }

    quizContainer.innerHTML = '';
    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';
}

function restartQuiz() {
    resetQuiz();
    createQuiz();
}
*/

submitButton.addEventListener('click', calculateResults);
restartButton.addEventListener('click', function() {
    location.reload();
});

createQuiz();
