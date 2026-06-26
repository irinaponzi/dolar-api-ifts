import { useState, useEffect } from 'react'
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

const W = 1000
const H = 160
const PAD = { top: 12, right: 24, bottom: 28, left: 56 }

function Grafico({ datos }) {
    const valores = datos.flatMap(d => [d.compra, d.venta])
    const minVal = Math.min(...valores)
    const maxVal = Math.max(...valores)
    const diff = maxVal - minVal || 1
    const pad = diff * 0.1

    const minY = minVal - pad
    const maxY = maxVal + pad
    const rangoY = maxY - minY

    const innerW = W - PAD.left - PAD.right
    const innerH = H - PAD.top - PAD.bottom

    const x = (i) => PAD.left + (i / (datos.length - 1)) * innerW
    const y = (v) => PAD.top + innerH - ((v - minY) / rangoY) * innerH

    const path = (key) =>
        datos.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(' ')

    const indices = datos.length <= 3
        ? datos.map((_, i) => i)
        : [0, Math.floor(datos.length / 2), datos.length - 1]

    return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {[minVal, maxVal].map((v, i) => (
                <g key={i}>
                    <line
                        x1={PAD.left} y1={y(v)}
                        x2={W - PAD.right} y2={y(v)}
                        stroke="var(--borde)" strokeWidth="0.5" strokeDasharray="3,3"
                    />
                    <text
                        x={PAD.left - 6} y={y(v) + 4}
                        textAnchor="end" fontSize="11" fill="var(--texto-secundario)"
                    >
                        ${Math.round(v)}
                    </text>
                </g>
            ))}

            {indices.map(i => {
                const [, mes, dia] = datos[i].fecha.split('-')
                return (
                    <text
                        key={i}
                        x={x(i)} y={H - 4}
                        textAnchor="middle" fontSize="11" fill="var(--texto-secundario)"
                    >
                        {`${dia}/${mes}`}
                    </text>
                )
            })}

            <path d={path('compra')} fill="none" stroke="var(--verde)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            <path d={path('venta')} fill="none" stroke="var(--rojo)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
    )
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
                    <div className="historial-leyenda">
                        <span className="historial-leyenda-item">
                            <span className="dot dot-verde" />
                            Compra
                        </span>
                        <span className="historial-leyenda-item">
                            <span className="dot dot-rojo" />
                            Venta
                        </span>
                    </div>
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

                <div className="historial-grafico">
                    {cargando ? (
                        <div className="historial-empty">Cargando...</div>
                    ) : datos.length === 0 ? (
                        <div className="historial-empty">Sin datos</div>
                    ) : datos.length === 1 ? (
                        <div className="historial-empty">
                            Sin suficientes datos aún
                        </div>
                    ) : (
                        <Grafico datos={datos} />
                    )}
                </div>
            </div>
        </div>
    )
}
