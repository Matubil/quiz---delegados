
const preguntas = [
	{
		pregunta: '¿Cuál es la capital de España?',
		respuesta: 'madrid',
		puntaje: 2
	},
	{
		pregunta: '¿En qué año comenzó la Segunda Guerra Mundial?',
		respuesta: 1939,
		puntaje: 3
	},
	{
		pregunta: '¿Quién escribió el Quijote?',
		respuesta: 'miguel de cervantes',
		puntaje: 4
	},
	{
		pregunta: '¿Cuál es el río más largo del mundo?',
		respuesta: 'nilo',
		puntaje: 5
	},
	{
		pregunta: '¿Quién fue el primer presidente de los Estados Unidos?',
		respuesta: 'george washington',
		puntaje: 1
	}
];

const quizForm = document.getElementById('quiz-form');
const resultados = document.getElementById('resultados');
const ranking = document.getElementById('ranking');

quizForm.addEventListener('submit', function(event) {
	event.preventDefault();
	
    horaActual = new Date();
	const respuestas = [];
	
	for (let i = 0; i < preguntas.length; i++) {
		const respuesta = document.getElementById(`q${i+1}`).value.trim();
		respuestas.push(respuesta.toLowerCase());
	}
	
	const puntajes = [];
	
	for (let i = 0; i < preguntas.length; i++) {
		const respuesta = respuestas[i];
		const puntaje = (respuesta == preguntas[i].respuesta) ? preguntas[i].puntaje : 0;
		puntajes.push(puntaje);
	}
	
	const totalPuntaje = puntajes.reduce((a, b) => a + b, 0);
	
    const participante = {
        puntaje: totalPuntaje,
        respuestas: respuestas,
        hora: new Date().toLocaleString() // incluir la hora actual en el objeto participante
    };    
	
    function vaciarRanking() {
        while (ranking.firstChild) {
            ranking.removeChild(ranking.firstChild);
        }
    }
    
    const resetButton = document.getElementById('reset-ranking');

    resetButton.addEventListener('click', function() {
    localStorage.removeItem('rankingParticipantes');
    vaciarRanking();
    });


	const rankingParticipantes = JSON.parse(localStorage.getItem('rankingParticipantes')) || [];
	rankingParticipantes.push(participante);
	
	rankingParticipantes.sort(function(a, b) {
		return b.puntaje - a.puntaje;
	});
	
	localStorage.setItem('rankingParticipantes', JSON.stringify(rankingParticipantes));
	
    ranking.innerHTML = '';
    
	for (let i = 0; i < rankingParticipantes.length; i++) {
        if (rankingParticipantes[i].puntaje > 0) {
            const tr = document.createElement('tr');
            tr.id = `participante-${i+1}`;
            const tdPuesto = document.createElement('td');
            const tdParticipante = document.createElement('td');
            const tdPuntaje = document.createElement('td');
            const tdHora = document.createElement('td');
    
            tdPuesto.textContent = i + 1;
            tdParticipante.textContent = rankingParticipantes[i].respuestas.join(', ');
            tdPuntaje.textContent = rankingParticipantes[i].puntaje;
    
            const hora = new Date(); // crear una nueva variable hora para cada fila del ranking
            if (i === rankingParticipantes.length - 1) { // si es la fila del participante actual
                tdHora.textContent = hora.toLocaleString(); // agrega la hora actual solo a esta fila
            } else {
                tdHora.textContent = rankingParticipantes[i].hora; // utiliza la hora guardada en el array para el resto de las filas
            }
    
            tr.appendChild(tdPuesto);
            tr.appendChild(tdParticipante);
            tr.appendChild(tdPuntaje);
            tr.appendChild(tdHora);
    
            ranking.appendChild(tr);
    
            if (i < 5) {
                tr.classList.add('red');
            }
        }
    }
    
      
	resultados.style.display = 'block';
	
	window.scrollTo(0,document.body.scrollHeight);

	quizForm.reset();
});

