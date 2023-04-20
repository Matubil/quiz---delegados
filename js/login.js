const iniciarSesionBtn = document.getElementById('iniciar-sesion-btn');
const loginSection = document.getElementById('login-section');
const quizSection = document.getElementById('quiz-section');
const rankingSection = document.getElementById('ranking-section');

    rankingSection.style.display = 'none';

iniciarSesionBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const nombreUsuario = document.getElementById('nombre-usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  if (nombreUsuario === 'secretaria' && contrasena === '123') {
    loginSection.style.display = 'none';
    quizSection.style.display = 'block';
  
    // Mostrar ranking
    rankingSection.style.display = 'block';

  }else if(nombreUsuario === 'humano' && contrasena === '123'){
   loginSection.style.display = 'none';
    quizSection.style.display = 'block';
  
    // Mostrar ranking
    rankingSection.style.display = 'none';
  }  else if (nombreUsuario === '1' && contrasena === '1') {
    loginSection.style.display = 'none';
    quizSection.style.display = 'block';
  
    // Mostrar ranking
    rankingSection.style.display = 'block';

  } else if(nombreUsuario === '2' && contrasena === '2'){
    loginSection.style.display = 'none';
     quizSection.style.display = 'block';
   
     // Mostrar ranking
     rankingSection.style.display = 'none';
   } 
  else {
    alert('Usuario o contraseña incorrectos');
  }
});
