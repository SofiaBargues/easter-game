import { MouseEventHandler, useEffect, useState } from "react";

function Egg({
  position,
  onClick,
}: {
  position: number[];
  onClick: MouseEventHandler;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${position[0]}%`,
        left: `${position[1]}%`,
      }}
      onClick={onClick}
    >
      <img
        src="https://www.svgrepo.com/show/264570/easter-egg-easter.svg"
        alt="Egg"
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

function Rabbit({
  position,
  onClick,
}: {
  position: number[];
  onClick: MouseEventHandler;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${position[0]}%`,
        left: `${position[1]}%`,
      }}
      onClick={onClick}
    >
      <img
        src="https://www.svgrepo.com/show/264578/easter-bunny-rabbit.svg"
        alt="Egg"
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">(
    "initial"
  );
  const [timer, setTimer] = useState<number>(0);
  const [balls, setBalls] = useState<Array<[number, number]>>([]);
  const [score, setScore] = useState<number>(0);
  const [showRedCircle, setShowRedCircle] = useState<boolean>(false);
  const [redCirclePosition, setRedCirclePosition] = useState<[number, number]>([
    0, 0,
  ]);

  const [showTime, setShowTime] = useState<boolean>(false); // Nuevo estado para controlar si se muestra el tiempo

  function handleStart() {
    setBalls(generateInitialPositions());
    setRedCirclePosition([
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ]);
    setTimer(0);
    setStatus("playing");
    setShowTime(false); // Ocultar el mensaje de inicio al comenzar el juego
  }

  function generateInitialPositions() {
    const initialPositions: Array<[number, number]> = [];

    for (let i = 0; i < 5; i++) {
      initialPositions.push([
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
      ]);
    }
    return initialPositions;
  }

  function handleClick(ballIndex: number) {
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      if (newScore === 5) {
        setShowRedCircle(true);
      }
      return newScore;
    });
    if (ballIndex !== 5) {
      const newBalls = balls.filter((_, index) => index !== ballIndex);
      setBalls(newBalls);
    }
  }
  function handleRedCircleClick() {
    setShowRedCircle(false);
    setStatus("initial");
    setScore(0);
    setShowTime(true); // Mostrar el tiempo cuando se termina el juego por primera vez
  }

  useEffect(() => {}, [status]);

  useEffect(() => {
    let interval: number;
    if (status === "playing") {
      interval = setInterval(() => setTimer((timer) => timer + 1), 100);
    }

    return () => clearInterval(interval);
  }, [status]);

  return (
    <main>
      <header style={{ textAlign: "center" }}>
        {showTime ? ( // Mostrar el tiempo si showTime es verdadero
          <h1>
            {" "}
            Your time is {Math.round((timer / 10) * 100) / 100} seconds!{" "}
          </h1>
        ) : (
          <p>Find the Easter bunny by collecting eggs as fast as you can!</p> // Mostrar el mensaje inicial si showTime es falso
        )}
      </header>

      {status === "playing" && (
        <section style={{ position: "relative", margin: 48, marginBottom: 48 }}>
          {status === "playing" &&
            balls.map((position, index) => (
              <Egg
                key={index}
                onClick={() => handleClick(index)}
                position={position}
              />
            ))}

          {showRedCircle && (
            <Rabbit
              onClick={handleRedCircleClick}
              position={redCirclePosition}
            />
          )}
        </section>
      )}
      <footer
        className="m-10 rounded-3xl"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <h1 className="font-extrabold text-5xl text-amber-300 ">Easter Game</h1>
        {status === "initial" && (
          <button className="font-extrabold" onClick={handleStart}>
            Play
          </button>
        )}
      </footer>
    </main>
  );
}

export default App;
