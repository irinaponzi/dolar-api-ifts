import { guardarHistorial, obtenerHistorial } from './service/historial.service.mjs'
import dolar from './types/dolar.types.mjs'

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export const guardarHandler = async () => {
    try {
        await guardarHistorial()
        return { statusCode: 200 }
    } catch (e) {
        console.error('Error guardando historial:', e)
        return { statusCode: 500 }
    }
}

export const obtenerHandler = async (event) => {
    try {
        const tipo = event.pathParameters?.tipo
        const rango = event.queryStringParameters?.rango ?? 'semana'

        if (!dolar.includes(tipo)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Tipo de dólar inválido' })
            }
        }

        const data = await obtenerHistorial(tipo, rango)

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        }
    } catch (e) {
        console.error('Error obteniendo historial:', e)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: e.message })
        }
    }
}
