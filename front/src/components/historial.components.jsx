import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { historialService } from '../services/dolar.services'

const TIPOS = [
    { value: 'blue', label: 'Blue' },
    { value: 'oficial', label: 'Oficial' },
    { value: 'bolsa', label: 'MEP' },
    { value: 'contadoconliqui', label: 'CCL' },
    { value: 'cripto', label: 'Cripto' },
]

const RANGOS = [
    { value: 'semana', label: '7D' },
    { value: 'mes', label: '30D' },
    { value: 'trimestre', label: '90D' },
]

const formatFecha = (fecha) => {
    const [, mes, dia] = fecha.split('-')
    return `${dia}/${mes}`
}

export default function Historial() {
    const [tipo, setTipo] = useState('blue')
    const [rango, setRango] = useState('semana')
    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        const cargar = async () => {
            setCargando(true)
            try {
                const data = await historialService(tipo, rango)
                setDatos(data)
            } catch (e) {
                console.error(e)
            } finally {
                setCargando(false)
            }
        }
        cargar()
    }, [tipo, rango])

    return (
        <div className="card historial-card">
            <div className="card-cont">
                <div className="card-header">
                    <h2>Historial</h2>
                </div>

                <div className="historial-controles">
                    <div className="historial-tabs">
                        {TIPOS.map(t => (
                            <button
                                key={t.value}
                                className={`historial-tab ${tipo === t.value ? 'historial-tab-activo' : ''}`}
                                onClick={() => setTipo(t.value)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <div className="historial-tabs">
                        {RANGOS.map(r => (
                            <button
                                key={r.value}
                                className={`historial-tab ${rango === r.value ? 'historial-tab-activo' : ''}`}
                                onClick={() => setRango(r.value)}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                {cargando ? (
                    <div className="historial-empty">Cargando...</div>
                ) : datos.length === 0 ? (
                    <div className="historial-empty">Sin datos</div>
                ) : (
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={datos} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                            <XAxis
                                dataKey="fecha"
                                tickFormatter={formatFecha}
                                tick={{ fill: 'var(--texto-secundario)', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: 'var(--texto-secundario)', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                width={55}
                                tickFormatter={(v) => `$${v}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--fondo-componente)',
                                    border: '0.5px solid var(--borde)',
                                    borderRadius: '8px',
                                    color: 'var(--texto)',
                                    fontSize: '0.8rem'
                                }}
                                formatter={(value, name) => [`$${value}`, name]}
                                labelFormatter={formatFecha}
                            />
                            <Line
                                type="monotone"
                                dataKey="compra"
                                stroke="var(--verde)"
                                strokeWidth={2}
                                dot={false}
                                name="Compra"
                            />
                            <Line
                                type="monotone"
                                dataKey="venta"
                                stroke="var(--rojo)"
                                strokeWidth={2}
                                dot={false}
                                name="Venta"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}
