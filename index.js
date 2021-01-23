const options = require('./config.json');
const { Client } = require("discord-rpc");
const client = new Client({
  transport: "ipc"
});

client.on("ready", () => {
  options.buttons.firstButton.name
    ? client.request("SET_ACTIVITY", {
      pid: process.pid,
      activity: {
				details: options.details,
				state: options.state,
				timestamps: {
					start: Date.now()
				},
				assets: {
					large_image: options.largeImageKey,
					large_text: options.largeImageText
				},
				buttons: [{ label: options.buttons.firstButton.name, url: options.buttons.firstButton.url }, { label: options.buttons.secondButton.name, url: options.buttons.secondButton.url }]
      }
    })
    : client.request("SET_ACTIVITY", {
      pid: process.pid,
      activity: {
        details: options.details,
        state: options.state,
        assets: {
          large_image: options.largeImageKey,
          large_text: options.largeImageText
        },
      }
		});

  console.log("Displaying presence for", client.user.username + "#" + client.user.discriminator);
});

client.login({
  clientId: options.clientId
}).catch(console.error);