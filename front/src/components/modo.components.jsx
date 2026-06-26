import { useEffect, useState } from 'react'
import Luna from '../icons/luna'
import Sol from '../icons/sol'

export default function Modo() {
    const [Modo, setModo] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    })

    useEffect(() => {
        if (Modo) {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [Modo])

    return (
        <button
            onClick={() => setModo(!Modo)}
            className='modo-btn'
        >
            <span className='modo-icon'>
                {Modo ? <Luna size={16} color='currentColor' /> : <Sol size={16} color='currentColor' />}
            </span>
        </button>
    )
}