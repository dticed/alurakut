import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '5fd97cacff5750ec74e21ccb3a6357';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "967712", // ID do Model de comunidades criado pelo Dato
            ...request.body,
            // title: 'Comunidade de teste',
            // imageUrl: "https://github.com/dticed.png",
            // creatorSlug: 'dticed'
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })

}