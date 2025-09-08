import { CardStyleProvider, useCardStyle } from './context/userContext.js';

const Card = ({ name, index }) => {
  const {backgroundChanged,namesUnderlined,descriptionSizeIncreased,buttonChanged,
         toggleBackground,toggleNamesUnderline,toggleDescriptionSize,toggleButtonChanged
  } = useCardStyle();

  const handleClick = () => {
    if (index === 0) {
      toggleBackground();
    } else if (index === 1) {
      toggleNamesUnderline();
      
    } else if (index === 2) {
      toggleDescriptionSize();
    } else if (index === 3) {
      toggleButtonChanged();
    }else {
      alert(`Clicked on ${name}'s profile!`);
    }
  };

  const cardStyle = {
    background: backgroundChanged ? 'linear-gradient(135deg, #ff7b7b, #667eea)' : 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    cursor: 'pointer'
  };

  const nameStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: backgroundChanged ? '#fff' : '#2c3e50',
    marginBottom: '15px',
    textDecoration: namesUnderlined ? 'underline' : 'none',

  };

  const deptStyle = {
    fontSize: '1.1rem',
    color: backgroundChanged ? 'rgba(255,255,255,0.8)' : '#7f8c8d',
    marginBottom: '20px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '1px',
   
  };

  const descriptionStyle = {
    fontSize: descriptionSizeIncreased ? '1.2rem' : '1rem',
    color: backgroundChanged ? 'rgba(255,255,255,0.9)' : '#34495e',
    lineHeight: 1.6,
    marginBottom: '25px',
  };

  const buttonStyle = {
    background: buttonChanged ? 'linear-gradient(45deg, #3498db, #2980b9)' : 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
  };

  return (
    <div style={cardStyle}>
      <h2 style={nameStyle}>{name}</h2>
      <p style={deptStyle}>Dept CSE</p>
      <p style={descriptionStyle}>
        Experienced faculty member specializing in computer science education and research. 
        Dedicated to advancing knowledge in the field of computer science and engineering.
      </p>
      <button style={buttonStyle} onClick={handleClick}> Click Me! </button>
    </div>
  );
};

const Home = () => {
  const cardNames = [
    'Deepak',
    'Abilesh', 
    'Ajith',
    'Vijay',
    'Poovarasan',
    'Giriharan',
    'Dinesh',
    'Harish'
  ];

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    padding: '40px 20px'
  };

  const innerContainerStyle = {
    maxWidth: '1300px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '40px'
  };

  return (
    <CardStyleProvider>
      <div style={containerStyle}>
        <div style={innerContainerStyle}>  
          <div style={gridStyle}>
            {cardNames.map((name, index) => (
              <Card key={index} name={name} index={index} />
            ))}
          </div>
        </div>
      </div>
    </CardStyleProvider>
  );
};

export default Home;