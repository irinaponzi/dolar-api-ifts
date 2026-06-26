import { useEffect, useState } from "react";
import { precioService } from "../services/dolar.services";

export default function Info() {
    const [dolar, setDolar] = useState(null)

    useEffect(() => {
        const cargarDolar = async () => {
            try {
                const data = await precioService('contadoconliqui')
                setDolar(data)
            } catch (e) {
                console.error(e)
            }
        }
        cargarDolar()
    }, [])

    return (
        <div>
            {dolar && (
                <>
                    <div className="fecha">
                        Última actualización {
                            new Date(dolar.fecha).toLocaleString('es-AR',
                                {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                }
                            )
                        }

                    </div>
                </>
            )}
            {!dolar && (
                <>
                    <div className="fecha">
                        Última actualización sin fecha 

                    </div>
                </>
            )}
        </div>
    )
}


