import React, { useState, useEffect } from "react";
import "../styles/SV5T.css";

const SV5T = () => {
    const [student, setStudent] = useState(null);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        fetch(`/api/students/${index}`)
            .then((res) => res.json())
            .then((data) => setStudent(data));
    }, [index]);

    return (
        <div id="sv5t" className="sv5t">
            {student && (
                <div className="student-info">
                    <img src={student.image} alt={student.name} />
                    <h3>{student.name}</h3>
                    <p>{student.award}</p>
                </div>
            )}
            <button onClick={() => setIndex(index + 1)}>Tiếp</button>
        </div>
    );
};

export default SV5T;