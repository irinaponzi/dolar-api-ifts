import { useEffect, useState } from "react";
import "../App.css"
import { precioService } from "../services/dolar.services"
import Loader from "../icons/loader";

export default function DolarCripto() {
    const [dolar, setDolar] = useState(null)

    useEffect(() => {
        const cargarDolar = async () => {
            try {
                const data = await precioService('cripto')
                setDolar(data)
            } catch (e) {
                console.error(e)
            }
        }
        cargarDolar()
    }, [])

    return (
        <div className="card">
            <div className="card-cont">
                <div className="card-header">
                    <h2>Dólar Cripto</h2>
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