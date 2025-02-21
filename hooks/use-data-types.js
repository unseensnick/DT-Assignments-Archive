"use client";

import { useEffect, useState } from "react";

export function useDataTypes() {
    const [logs, setLogs] = useState([]);

    const addLog = (section, content) => {
        setLogs((prev) => [...prev, { section, content }]);
    };

    useEffect(() => {
        // Clear previous logs
        setLogs([]);

        // String data types
        addLog("Strings", [
            { label: "name", value: "Ola" },
            { label: "city", value: "Oslo" },
            { label: "hobby", value: "Fotball" },
        ]);

        // Number data types
        addLog("Numbers", [
            { label: "age", value: 25 },
            { label: "height", value: 180 },
        ]);

        // Objects
        const person1 = {
            name: "John",
            age: 28,
            city: "Oslo",
        };

        const person2 = {
            name: "Kari",
            age: 30,
            city: "Bergen",
        };

        addLog("Objects", [
            { label: "person1", value: person1 },
            { label: "person2", value: person2 },
        ]);

        // Arrays
        const fruits = ["Eple", "Banan", "Appelsin", "Druer"];
        const cars = ["Toyota", "BMW", "Tesla", "Ford"];

        addLog("Arrays", [
            { label: "fruits", value: fruits },
            { label: "cars", value: cars },
        ]);
    }, []);

    return { logs };
}
