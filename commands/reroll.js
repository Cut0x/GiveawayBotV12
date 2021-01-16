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
                description: '<:warn:738561291500781611> **Vous devez définir un ID !**'
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
                description: `<:warn:738561291500781611> **Impossible de trouver un giveaway pour \`${args.join(' ')}\`.**`
            }
        });
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send({
            embed: {
                color: 0x1beb09,
                description: `<:valide:724025314857975830> **Giveaway reroll !`
            }
        })
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                message.channel.send({
                embed: {
                    color: 0xeb0606,
                    description: `<:warn:738561291500781611> **Ce giveaway n'est pas finit.**`
                }
            });
        } else {
            console.error(e);
            message.channel.send({
                embed: {
                    color: 0xeb0606,
                    description: `<:warn:738561291500781611> **Une erreur c'est produite.**`
                }
            });
        }
    });

};