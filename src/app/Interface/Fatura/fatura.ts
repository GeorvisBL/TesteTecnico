
import { Contrato } from "../Contrato/contrato";

export interface Fatura {
    id: number,
    idContrato: number,
    contrato: Contrato
    faturaStatus: string,
    dataEmissao: string,
    dataVencimento: string,
    valorCobrado: string
}
