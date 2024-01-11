import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">(
    "initial"
  );
  const [timer, setTimer] = useState<number>(0);
  const [position, setPosition] = useState<[number, number]>([
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ]);
  const [score, setScore] = useState<number>(0);
  function handleClick() {
    setScore((prevScore) => prevScore + 1);
    setPosition([
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ]);
  }
  useEffect(() => {
    let interval: number;

    if (status === "playing") {
      interval = setInterval(() => setTimer((timer) => timer + 1), 100);
    }

    return () => clearInterval(interval);
  }, [status]);

  return (
    <main>
      <header>
        <h1>{Math.round((timer / 10) * 100) / 100} segundos</h1>
      </header>
      <section style={{ position: "relative", margin: 48, marginBottom: 48 }}>
        <figure
          onClick={handleClick}
          style={{
            position: "absolute",
            top: `${position[0]}%`,
            left: `${position[1]}%`,
          }}
        />
      </section>
      <footer>
        {status === "initial" && (
          <button onClick={() => setStatus("playing")}>Jugar</button>
        )}
        {status === "playing" && (
          <button onClick={() => setStatus("finished")}>Terminar</button>
        )}
        {status === "finished" && (
          <button onClick={() => setStatus("initial")}>Reiniciar</button>
        )}
      </footer>
    </main>
  );
}

export default App;
