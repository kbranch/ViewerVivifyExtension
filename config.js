const twitch = window.Twitch.ext;

let defaultActions = [
    { name: 'addbombs', description: 'Give 10 bombs', cost: '120', },
    { name: 'bomb', description: 'Bomb rain!', cost: '300', },
    { name: 'cucco', description: 'Cucco party!', cost: '450', },
    { name: 'damage', description: 'Do 1 heart of damage', cost: '100', },
    { name: 'power', description: 'Piece of power', cost: '50', },
    { name: 'regen', description: 'Regenerate health', cost: '150', },
    { name: 'rng', description: 'Randomize inventory', cost: '120', },
    { name: 'tele', description: 'Teleport!', cost: '150', },
    { name: 'warp', description: 'Warp!', cost: '3600', },
    { name: 'zol', description: 'Zol storm!', cost: '1200', },
    { name: 'blue', description: 'Blue link (color only)', cost: '100', },
    { name: 'disco', description: 'Disco link (30 seconds, color only)', cost: '50', },
    { name: 'green', description: 'Green link (color only)', cost: '100', },
    { name: 'red', description: 'Red link (color only)', cost: '100', },
    { name: 'yellow', description: 'Yellow link (color only)', cost: '100', },
    { name: 'gfxages', description: 'AgesGirl graphics', cost: '250', },
    { name: 'gfxalpha', description: 'MarinAlpha graphics', cost: '250', },
    { name: 'gfxbowwow', description: 'Bowwow graphics', cost: '250', },
    { name: 'gfxbunny', description: 'Bunny graphics', cost: '250', },
    { name: 'gfxgrandma', description: 'GrandmaUlrira graphics', cost: '250', },
    { name: 'gfxkirby', description: 'Kirby graphics', cost: '250', },
    { name: 'gfxluigi', description: 'Luigi graphics', cost: '250', },
    { name: 'gfxmarin', description: 'Marin graphics', cost: '250', },
    { name: 'gfxmario', description: 'Mario graphics', cost: '250', },
    { name: 'gfxmartha', description: 'Martha graphics', cost: '150', },
    { name: 'gfxmatty', description: 'Matty_LA graphics', cost: '50', },
    { name: 'gfxmeme', description: 'Meme graphics', cost: '500', },
    { name: 'gfxnes', description: 'NESLink graphics', cost: '500', },
    { name: 'gfxrandom', description: 'Random graphics', cost: '200', },
    { name: 'gfxrichard', description: 'Richard graphics', cost: '250', },
    { name: 'gfxrooster', description: 'Rooster graphics', cost: '250', },
    { name: 'gfxrosa', description: 'Rosa graphics', cost: '250', },
    { name: 'gfxsubrosian', description: 'Subrosian graphics', cost: '250', },
    { name: 'gfxtarin', description: 'Tarin graphics', cost: '250', },
    { name: 'invisilink', description: 'Make link invisible', cost: '1000', },
    { name: 'disablebombs', description: 'Disable bombs (60 seconds)', cost: '900', },
    { name: 'disableboots', description: 'Disable boots (60 seconds)', cost: '600', },
    { name: 'disablebow', description: 'Disable bow (60 seconds)', cost: '600', },
    { name: 'disablefeather', description: 'Disable feather (60 seconds)', cost: '1200', },
    { name: 'disableflippers', description: 'Disable flippers (60 seconds)', cost: '900', },
    { name: 'disablehook', description: 'Disable hookshot (60 seconds)', cost: '600', },
    { name: 'disableocarina', description: 'Disable ocarina (60 seconds)', cost: '300', },
    { name: 'disablepowder', description: 'Disable magic powder (60 seconds)', cost: '300', },
    { name: 'disablerang', description: 'Disable boomerang (60 seconds)', cost: '600', },
    { name: 'disablerod', description: 'Disable magic rod (60 seconds)', cost: '600', },
    { name: 'disableshovel', description: 'Disable shovel (60 seconds)', cost: '300', },
    { name: 'disablesword', description: 'Disable sword (60 seconds)', cost: '1200', },
    { name: 'invert', description: 'Invert buttons (60 seconds)', cost: '500', },
    { name: 'runrunrun', description: 'Constant boots power (60 seconds)', cost: '250', },
    { name: 'slow', description: 'Slow (30 seconds)', cost: '300', },
];

let actions = [];

function loadActions() {
    try {
        actions = JSON.parse(twitch.configuration.broadcaster.content);
        if (actions.length == 0) {
            actions = [...defaultActions];
        }
    }
    catch {
        actions = [...defaultActions];
    }
}

function getRow(action, index) {
    let row = $('<div>', {
        class: "action-row",
        id: `${index}`,
    });

    $(row).append($('<input>', {
        type: "text",
        class: 'name',
        id: `${index}-name`,
        value: action.name ?? '',
    }));

    $(row).append($('<input>', {
        type: "text",
        class: 'description',
        id: `${index}-description`,
        value: action.description ?? '',
    }));

    $(row).append($('<input>', {
        type: "text",
        class: 'cost',
        id: `${index}-cost`,
        value: action.cost ?? '',
    }));

    let button = $('<button>', {
        type: "button",
        class: 'delete',
        id: `${index}-delete`,
        html: 'Delete',
    });

    $(row).append(button);

    $(button).click(deleteRowButton);

    return row;
}

function deleteRowButton() {
    $(this).parent().remove();
}

function addNewAction() {
    let newAction = { name: '', description: '', cost: 0 };
    let index = Math.max.apply(Math, ($('.action-row').map(x => x))) + 1

    $('#actions').append(getRow(newAction, index));
}

function updateActions() {
    $('#actions').empty();
    let i = 0;

    for(const action of actions) {
        $('#actions').append(getRow(action, i));

        i++;
    }
}

function saveActions() {
    actions = [];

    $('.action-row').each(function() {
        let action = {
            name: $(this).children('.name')[0].value,
            description: $(this).children('.description')[0].value,
            cost: Number($(this).children('.cost')[0].value),
        };

        if (action.name != '' && action.cost != 0) {
            actions.push(action);
        }
    })

    twitch.configuration.set('broadcaster', '1', JSON.stringify(actions));
}

function init() {
    document.getElementById("addButton").addEventListener("click", addNewAction);
    document.getElementById("saveButton").addEventListener("click", saveActions);

    loadActions();
    updateActions();
}

twitch.configuration.onChanged(init);
