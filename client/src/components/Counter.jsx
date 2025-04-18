import { useEffect, useState } from "react";

export function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Лічильник змінено:", count);
    }, [count]);

    return (
        <div>
            <p>Лічильник: {count}</p>
            <button onClick={() => setCount(count + 1)}>Збільшити</button>
        </div>
    );
}

export function Timer() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTime(t => t + 1), 1000);
        console.log("Таймер запущено");

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <p>Час: {time} сек</p>;
}
