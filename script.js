
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

const tally_weights = {
    1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18],
    2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16],
    3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16],
    4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14]
};

let counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0;

const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const resultChart = document.getElementById('result-chart').getContext('2d');
const beginButton = document.getElementById('begin-btn');
const restartButton = document.getElementById('restart-btn');

function createQuiz() {
    const quizDiv = document.getElementById('quiz');

    set_of_words.forEach((set, index) => {
        const div = document.createElement('div');
        div.classList.add('question-set');

        const elem = document.createElement('hr');
        elem.setAttribute("width", "100%");

        const questionHeader = document.createElement('span');
        questionHeader.textContent = `${index + 1}:`;
        questionHeader.classList.add('set-number');
        div.appendChild(questionHeader);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        set.forEach((word, i) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`;
            radio.value = i + 1; // For weighted calculation
            radio.id = `question${index}option${i}`;

            const label = document.createElement('label');
            label.textContent = word;
            label.setAttribute('for', radio.id);
            label.prepend(radio);

            optionsDiv.appendChild(label);
        });

        div.appendChild(optionsDiv);
        quizDiv.appendChild(div);
        quizDiv.appendChild(elem);
    });

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-btn';
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', function () {
        if (document.querySelectorAll('input[type="radio"]:checked').length === set_of_words.length) {
            calculateResults();
        } else {
            alert("Please answer all the questions before submitting.");
        }
    });
    quizContainer.appendChild(submitButton);
}

function startQuiz() {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    createQuiz();
}

function calculateResults() {
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');

    selectedOptions.forEach((option, index) => {
        const selectedValue = parseInt(option.value); // The selected radio button value
        const tallyIndex = index + 1; // This corresponds to the tally weight row (1, 2, 3, or 4)

        switch (tallyIndex) {
            case 1: // Driver
                counter1 += tally_weights[1][selectedValue];
                break;
            case 2: // Expressive
                counter2 += tally_weights[2][selectedValue];
                break;
            case 3: // Amiable
                counter3 += tally_weights[3][selectedValue];
                break;
            case 4: // Analytic
                counter4 += tally_weights[4][selectedValue];
                break;
        }
    });

    showResults();
}

function showResults() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
  
    const personalityStyles = ['Driver', 'Expressive', 'Amiable', 'Analytic'];
    const scores = [counter1, counter2, counter3, counter4];
  
    // Bar Chart Configuration (Modified from Radar Chart)
    const barChartConfig = {
      type: 'bar',  // Change type to 'bar' for bar chart
      data: {
        labels: personalityStyles,
        datasets: [{
          label: 'Personality Profile',
          data: scores,
          backgroundColor: [
            'rgba(52, 152, 219, 0.5)',
            'rgba(46, 204, 113, 0.5)',
            'rgba(231, 76, 60, 0.5)',
            'rgba(155, 89, 182, 0.5)'
          ],  // Different colors for each bar
          borderColor: [
            '#3498db',
            '#2ecc71',
            '#e74c3c',
            '#9b59b6'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,  // Ensure y-axis starts at zero
            title: {
              display: true,
              text: 'Score',
              font: {
                size: 18
              }
            },
            ticks: {
              font: {
                size: 14
              },
              stepSize: 1,  // Set step size for better granularity
              precision: 0  // Ensure whole number values
            }
          },
          x: {
            title: {
              display: true,
              text: 'Personal Style',
              font: {
                size: 18
              }
            },
            ticks: {
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false  // Hide the legend for clarity
          },
          title: {
            display: true,
            text: '',
            font: {
              size: 18
            }
          }
        }
      }
    };
  
    // Create the bar chart
    const barCtx = document.getElementById('result-chart').getContext('2d');
    new Chart(barCtx, barChartConfig);
}

beginButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', function () {
    window.location.reload();
});