import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '5fd97cacff5750ec74e21ccb3a6357';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "978961", // ID do Model de Scraps criado pelo Dato
            ...request.body,
        })

        response.json({
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })

}