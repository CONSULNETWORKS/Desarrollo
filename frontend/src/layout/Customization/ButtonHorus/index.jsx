import { useState } from 'react';
import RotatingSVG from './RotatingSVG.jsx'; // Asegúrate de que la ruta esté correcta.

const ButtonHorus = () => {
  // Inicialmente, el botón estará oculto ('none')
  const [buttonDisplay, setButtonDisplay] = useState('none');

  // Función para mostrar el botón
  const showButton = () => {
    setButtonDisplay('block'); // O 'inline-block' o lo que necesites para tu botón
  };

  // Función para ocultar el botón (en caso de que lo quieras volver a ocultar)
  const hideButton = () => {
    setButtonDisplay('none');
  };

  // Puedes añadir un efecto al hacer clic en el botón, por ejemplo, ocultarlo de nuevo.
  const handleButtonClick = () => {
    console.log("Botón Horus activado!");
    // Aquí podrías, por ejemplo, ocultar el botón de nuevo
    // hideButton();
    // O hacer otra cosa, como mostrar un mensaje
  };

  return (
    <div>
      {/* El botón con el estilo display controlado por el estado */}
      <button
        onClick={handleButtonClick}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: buttonDisplay, // Aquí aplicamos el estilo dinámicamente
        }}
      >
        <RotatingSVG />
      </button>

      {/* Un botón de ejemplo para mostrar el botón oculto */}
      <button onClick={showButton} style={{ marginTop: '20px' }}>
        Mostrar Botón Horus
      </button>

      {/* Un botón de ejemplo para ocultar el botón si ya está visible */}
      <button onClick={hideButton} style={{ marginTop: '20px', marginLeft: '10px' }}>
        Ocultar Botón Horus
      </button>

      {/* Aquí podrías tener otros elementos que se muestran o se ocultan */}
      {/* Por ejemplo, un mensaje que aparezca cuando el botón sea visible */}
      {buttonDisplay === 'block' && <div>El botón Horus está visible.</div>}
    </div>
  );
};

export default ButtonHorus;