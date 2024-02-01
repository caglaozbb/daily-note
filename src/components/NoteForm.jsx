import { useState } from 'react'
import { useEffect } from 'react'

function NoteForm({ id, children }) {
    const storageKey = `notes-${id}`;
    console.log(`Storage key for this form: ${storageKey}`);

    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem(storageKey);
        console.log('Loaded data from localStorage:', savedData);
        return savedData ? JSON.parse(savedData) : { todo: '', update: '', sync: '' };
    });

    useEffect(() => {
        const savedData = localStorage.getItem(storageKey);
        setData(savedData ? JSON.parse(savedData) : { todo: '', update: '', sync: '' });
    }, [id]);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }, [storageKey, data]);

    const handleChange = (name, value) => {
        console.log(`Updating ${name}:`, value);
        setData(prevData => ({ ...prevData, [name]: value }));
    };


    return (
        <div>
            <div className="page-content">{children}</div>
            <textarea id='`${id}-todo'
                placeholder="todo"
                value={data.todo}
                onChange={e => handleChange('todo', e.target.value)}
            />
            <textarea id='`${id}-update'
                placeholder="update"
                value={data.update}
                onChange={e => handleChange('update', e.target.value)}
            />
            <textarea id='`${id}-sync'
                placeholder="sync"
                value={data.sync}
                onChange={e => handleChange('sync', e.target.value)}
            />
        </div>
    )

}
export default NoteForm