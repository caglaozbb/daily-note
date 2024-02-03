import { useState } from 'react'
import { useEffect } from 'react'

function NoteForm({ id, children }) {
    const storageKey = `notes-${id}`;

    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem(storageKey);
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
        setData(prevData => ({ ...prevData, [name]: value }));
    };


    return (
        <>
            <div className="page-header">{children}</div>
            <div className='page-content'>
                <textarea
                    placeholder="todo"
                    value={data.todo}
                    onChange={e => handleChange('todo', e.target.value)}
                />
                <textarea
                    placeholder="update"
                    value={data.update}
                    onChange={e => handleChange('update', e.target.value)}
                />
                <textarea
                    placeholder="sync"
                    value={data.sync}
                    onChange={e => handleChange('sync', e.target.value)}
                />
            </div>
        </>
    )

}
export default NoteForm