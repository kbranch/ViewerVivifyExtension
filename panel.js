let token = '';
let tuid = '';
let headers = null;
let actions = [];

const twitch = window.Twitch.ext;

function setAuth (token) {
    headers = { 'Authorization': 'Bearer ' + token };
}

twitch.onContext(function (context) {
  twitch.rig.log(context);
});

twitch.onAuthorized(function (auth) {
  // save our credentials
  token = auth.token;
  tuid = auth.userId;

  setAuth(token);
});

function logError(_, error, status) {
  twitch.rig.log('EBS request returned '+status+' ('+error+')');
}

function logSuccess(hex, status) {
  twitch.rig.log('EBS request returned '+hex+' ('+status+')');
}

function updateActions() {
    $('#actions').empty();

    for(const action of actions) {
        let dt = $('<dt>', {
            html: `!${action.name}:`,
        });
        let dd = $('<dd>', {
            html: `${action.description} (${action.cost})`,
        });

        $('#actions').append(dt);
        $('#actions').append(dd);
    }
}

function loadActions() {
    actions = JSON.parse(twitch.configuration.broadcaster.content);
}

function init() {
    loadActions();
    updateActions();
}

twitch.configuration.onChanged(function() {
    loadActions();
    updateActions();
});