import React, { useState } from "react";

interface NewCourseFormProps {
    onSubmit: (name: string) => void;
}

const NewCourseForm: React.FC<NewCourseFormProps> = ({ onSubmit }) => {
    const [courseName, setCourseName] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(courseName);
        setCourseName("");
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseName(event.target.value);
    }

    return (
        <div>
            <h2>Add a new course</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Course name:
                    <input type="text" value={courseName} onChange={handleNameChange} />
                </label>
                <button type="submit">Add course</button>
            </form>
        </div>
    );
}

export default NewCourseForm;