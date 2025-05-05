import { useState, useEffect } from "react";
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "SNS", limit: 3600, remaining: 3600, active: false },
    { id: 2, name: "게임", limit: 1800, remaining: 1800, active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.active && task.remaining > 0) {
            return { ...task, remaining: task.remaining - 1 };
          } else if (task.active && task.remaining <= 0) {
            return { ...task, remaining: 0, active: false };
          }
          return task;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, active: !task.active } : task
      )
    );
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return \`\${m}:\${s}\`;
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🕒 하루 시간 제한 타이머</h1>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {tasks.map((task) => (
          <div key={task.id} className="card" style={{ width: 250 }}>
            <h2>{task.name}</h2>
            <p style={{ fontSize: 32 }}>{formatTime(task.remaining)}</p>
            <button
              onClick={() => toggleTask(task.id)}
              disabled={task.remaining === 0}
              className={
                task.remaining === 0
                  ? "disabled"
                  : task.active
                  ? "active"
                  : "inactive"
              }
            >
              {task.remaining === 0
                ? "시간 소진"
                : task.active
                ? "일시 정지"
                : "사용 시작"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}