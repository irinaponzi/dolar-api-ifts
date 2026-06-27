import "../App.css"
import DolarOficial from "../components/dolarOficial.components"
import DolarBlue from "../components/dolarBlue.components"
import DolarCCL from "../components/dolarCCL.components"
import DolarCripto from "../components/dolarCripto.components"
import Modo from "../components/modo.components"
import Info from "../components/info.components"
import Fecha from "../components/fecha.components"
import Reload from "../components/reload.components"
import Historial from "../components/historial.components"
import DolarBolsa from "../components/dolarBolsa.components"
import DolarMayorista from "../components/dolarMayorista.componets"
import DolarTarjeta from "../components/dolarTarjeta.components"


export default function Home() {


    return (
        <div>
            <div className="header">
                <Fecha />
                <div className="botones">
                    <Reload />
                    <Modo />
                </div>
            </div>
            <div className="contenedor">
                <p className="seccion-titulo">Cotización del día</p>
                <div className="cards-grid">
                    <DolarOficial />
                    <DolarBlue />
                    <DolarBolsa />
                    <DolarMayorista />
                    <DolarCCL />
                    <DolarCripto />
                    <DolarTarjeta />
   
                </div>
            </div>
            <div className="historial-seccion">
                <Historial />
                <Info />
            </div>
        </div>
    )
}