const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: '<:warn:738561291500781611> **Vous devez avoir la permission `MANAGE_MESSAGES` pour effectuer cette commande.**'
            }
        });
    }

    if(!args[0]){
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: '<:warn:738561291500781611> **Vous devez spécifier un ID de message valide !**'
            }
        });
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: `<:warn:738561291500781611> **Impossible de trouver un __giveaway__ pour \`${args.join(' ')}\`.**`
            }
        });
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send({
            embed: {
                description: `<:warn:738561291500781611> **Ce Giveaway se terminera dans moins de \`${(client.giveawaysManager.options.updateCountdownEvery/1000)}\` secondes.**`
            }
        });
    })
    .catch((e) => {
        if(e.startsWith(`Cadeau avec identifiant de message ${giveaway.messageID} est déjà terminé.`)){
            message.channel.send({
                embed: {
                    color: 0xeb0606,
                    description: '<:warn:738561291500781611> **Ce giveaway est déjà terminé !**'
                }
            });
        } else {
            console.error(e);
            message.channel.send({
                embed: {
                    color: 0xeb0606,
                    description: '<:warn:738561291500781611> **Une erreur s\'est produite !**'
                }
            });
        }
    });

};