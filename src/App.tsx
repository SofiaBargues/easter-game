// import { useEffect, useState } from "react";

// function App() {
//   const [status, setStatus] = useState<"initial" | "playing" | "finished">(
//     "initial"
//   );
//   const [timer, setTimer] = useState<number>(0);
//   const [position, setPosition] = useState<[number, number]>([
//     Math.floor(Math.random() * 100),
//     Math.floor(Math.random() * 100),
//   ]);
//   const [score, setScore] = useState<number>(0);
//   function handleClick() {
//     setScore((prevScore) => prevScore + 1);
//     if (score === 9) {
//       setStatus("finished");
//     }
//     setPosition([
//       Math.floor(Math.random() * 100),
//       Math.floor(Math.random() * 100),
//     ]);
//   }
//   useEffect(() => {
//     let interval: number;

//     if (status === "playing") {
//       interval = setInterval(() => setTimer((timer) => timer + 1), 100);
//     }

//     return () => clearInterval(interval);
//   }, [status]);

//   return (
//     <main>
//       <header>
//         <h1>{Math.round((timer / 10) * 100) / 100} segundos</h1>
//       </header>
//       <section style={{ position: "relative", margin: 48, marginBottom: 48 }}>
//         {status === "playing" && (
//           <figure
//             onClick={handleClick}
//             style={{
//               position: "absolute",
//               top: `${position[0]}%`,
//               left: `${position[1]}%`,
//             }}
//           />
//         )}
//       </section>
//       <footer>
//         {status === "initial" && (
//           <button onClick={() => setStatus("playing")}>Jugar</button>
//         )}
//         {status === "playing" && (
//           <button onClick={() => setStatus("finished")}>Terminar</button>
//         )}
//         {status === "finished" && (
//           <button onClick={() => setStatus("initial")}>Reiniciar</button>
//         )}
//       </footer>
//     </main>
//   );
// }

// export default App;

import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">(
    "initial"
  );
  const [timer, setTimer] = useState<number>(0);
  const [balls, setBalls] = useState<Array<[number, number]>>([]);
  const setScore = useState<number>(0);
  const [showRedCircle, setShowRedCircle] = useState<boolean>(false);
  const [redCirclePosition, setRedCirclePosition] = useState<[number, number]>([
    0, 0,
  ]);
  function handleStart() {
    setBalls(generateInitialPositions());
    setRedCirclePosition([
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ]);
    setTimer(0);
    setStatus("playing");
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
        <h1> Your time is {Math.round((timer / 10) * 100) / 100} seconds! </h1>
      </header>

      {status === "playing" && (
        <section style={{ position: "relative", margin: 48, marginBottom: 48 }}>
          {status === "playing" &&
            balls.map((position, index) => (
              <figure
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  position: "absolute",
                  top: `${position[0]}%`,
                  left: `${position[1]}%`,
                }}
              />
            ))}

          {showRedCircle && (
            <figure
              onClick={handleRedCircleClick}
              style={{
                position: "absolute",
                top: `${redCirclePosition[0]}%`,
                left: `${redCirclePosition[1]}%`,
                background: "red",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            />
          )}
        </section>
      )}

      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2em",
          }}
        >
          Jacks Game
        </h1>
        {status === "initial" && <button onClick={handleStart}>Play</button>}
      </footer>
    </main>
  );
}

export default App;
