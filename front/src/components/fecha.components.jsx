export default function Fecha() {
    const fecha = new Date().toLocaleString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

    return (
        <h1 className="header-fecha">{fecha}</h1>
    )
}