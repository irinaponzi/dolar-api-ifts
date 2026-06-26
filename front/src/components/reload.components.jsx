import Recargar from "../icons/Recargar"

export default function Reload() {
    const recargar = () => {
        location.reload()
    }

    return (
        <button onClick={recargar} className="modo-btn reload" title="Recargar">
            <span className="modo-icon"><Recargar size={16} color='currentColor' /></span>
        </ button>
    )
}