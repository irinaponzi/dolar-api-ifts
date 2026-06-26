import { useEffect, useState } from "react"
import { precioService } from "../services/dolar.services"
import Loader from "../icons/loader"

export default function DolarOficial() {
    const [dolar, setDolar] = useState(null)

    useEffect(() => {
        const cargarDolar = async () => {
            try {
                const data = await precioService('oficial')
                setDolar(data)
            } catch (e) {
                console.error(e)
            }
        }
        cargarDolar()
    }, [])


    const fecha = dolar?.fecha
        ? new Date(dolar.fecha).toLocaleString("es-AR", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        : "";



    return (
        <div className="card">
            <div className="card-cont">
                <div className="card-header">
                    <h2>Dólar Oficial</h2>
                </div>

                {dolar && (
                    <div className="precios">
                        <div className="precio-item">
                            <div className="precio-label">
                                <span title="Compra" className="dot dot-verde" />
                                Compra
                            </div>
                            <div className="precio-valor">
                                <span className="precio-signo">$</span>
                                {dolar.compra}
                            </div>
                        </div>
                        <div className="precio-item">
                            <div title="Venta" className="precio-label">
                                <span className="dot dot-rojo" />
                                Venta
                            </div>
                            <div className="precio-valor">
                                <span >$</span>
                                {dolar.venta}
                            </div>
                        </div>
                    </div>
                )}
                {!dolar && (
                    <div className="precios">
                        <div className="precio-item">
                            <div className="precio-label">
                                <span title="Compra" className="dot dot-verde" />
                                Compra
                            </div>
                            <div className="precio-valor">
                                <Loader size={14} className="loader" />
                            </div>
                        </div>
                        <div className="precio-item">
                            <div title="Venta" className="precio-label">
                                <span className="dot dot-rojo" />
                                Venta
                            </div>
                            <div className="precio-valor">
                                <Loader size={14} className="loader" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}