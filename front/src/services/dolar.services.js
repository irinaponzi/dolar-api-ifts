const DOLAR_API = 'https://dolarapi.com/v1/dolares'
const HISTORIAL_URL = import.meta.env.VITE_HISTORIAL_URL

export const precioService = async (tipoDolar) => {
    const res = await fetch(`${DOLAR_API}/${tipoDolar}`)
    if (!res.ok) throw new Error('Error al obtener el precio del dólar')
    const data = await res.json()
    return {
        nombre: data.nombre,
        compra: data.compra,
        venta: data.venta,
        fecha: data.fechaActualizacion
    }
}

export const historialService = async (tipoDolar, rango = 'semana') => {
    const res = await fetch(`${HISTORIAL_URL}/historial/${tipoDolar}?rango=${rango}`)
    if (!res.ok) throw new Error('Error al obtener el historial')
    return res.json()
}
