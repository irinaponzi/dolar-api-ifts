import { guardarSnapshot, obtenerPorRango } from '../repository/historial.repository.mjs'
import dolar from '../types/dolar.types.mjs'

const DOLAR_API = 'https://dolarapi.com/v1/dolares'

const DIAS_POR_RANGO = {
    semana: 7,
    mes: 30,
    trimestre: 90
}

export const guardarHistorial = async () => {
    const fecha = new Date().toISOString().split('T')[0]

    const resultados = await Promise.allSettled(
        dolar.map(async (tipo) => {
            const res = await fetch(`${DOLAR_API}/${tipo}`)
            if (!res.ok) throw new Error(`Error al obtener ${tipo}`)
            const data = await res.json()
            await guardarSnapshot({ tipo, fecha, compra: data.compra, venta: data.venta })
        })
    )

    resultados
        .filter(r => r.status === 'rejected')
        .forEach(r => console.error(r.reason))
}

export const obtenerHistorial = async (tipo, rango) => {
    const dias = DIAS_POR_RANGO[rango] ?? DIAS_POR_RANGO.semana
    const hasta = new Date()
    const desde = new Date()
    desde.setDate(desde.getDate() - dias)

    return obtenerPorRango(
        tipo,
        desde.toISOString().split('T')[0],
        hasta.toISOString().split('T')[0]
    )
}
