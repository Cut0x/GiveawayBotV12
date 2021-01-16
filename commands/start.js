const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: '<:warn:738561291500781611> **Vous devez avoir la permission `MANAGE_MESSAGES` pour effectuer cette commande.**'
            }
        });
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel) {
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: '<:warn:738561291500781611> **Veuillez préciser un salon.**'
            }
        });
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))) {
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: '<:warn:738561291500781611> **Veuillez préciser un temps avec `d/h/m/s`.**'
            }
        });
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: '<:warn:738561291500781611> **Veuillez préciser le nombre de vainqueur.**'
            }
        });
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize) {
        return message.channel.send({
            embed: {
                color: 0xeb0606,
                description: '<:warn:738561291500781611> **Veuillez préciser un cadeau.**'
            }
        });
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: client.config.hostedBy ? message.author : null,
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n" : "")+"🎉🎉 **GIVEAWAY FINIT** 🎉🎉",
            timeRemaining: "Temps restant : **{duration}** !",
            inviteToParticipate: "Réagissez avec 🎉 pour participer !",
            winMessage: "Toutes nos félicitations, {winners} ! Vous gagnez **{prize}** !",
            embedFooter: "Giveaways",
            noWinner: "Giveaway annulé, aucune participation valide.",
            hostedBy: "Lancé par : {user}",
            winners: "vainqueur(s)",
            endedAt: "Terminé à",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false
            }
        }
    });

    message.channel.send(`:tada: Giveaway lancé sur le salon suivant : ${giveawayChannel}!`);

};