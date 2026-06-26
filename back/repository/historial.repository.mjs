import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient()
const dynamo = DynamoDBDocumentClient.from(client)

const TABLE = process.env.DYNAMODB_TABLE ?? 'dolar-historial'

export const guardarSnapshot = async ({ tipo, fecha, compra, venta }) => {
    await dynamo.send(new PutCommand({
        TableName: TABLE,
        Item: { tipo, fecha, compra, venta }
    }))
}

export const obtenerPorRango = async (tipo, desde, hasta) => {
    const { Items } = await dynamo.send(new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: 'tipo = :tipo AND fecha BETWEEN :desde AND :hasta',
        ExpressionAttributeValues: {
            ':tipo': tipo,
            ':desde': desde,
            ':hasta': hasta
        }
    }))

    return Items ?? []
}
