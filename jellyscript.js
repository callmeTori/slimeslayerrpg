// Javascript
let playerXP = 0;
let playerCC = 50;
let playerHP = 100;
let currentEquip = 0;
let inventory = ["dagger"];
let fighting;
let hostileHealth;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const playerXPText = document.querySelector("#playerXPText");
const playerCCText = document.querySelector("#playerCCText");
const playerHPText = document.querySelector("#playerHPText");

const hostileStats = document.querySelector("#hostileStats");
const hostileName = document.querySelector("#hostileName");
const hostileHealthText = document.querySelector("#hostileHealth");
const equipment = [
	{ name: 'dagger', power: 3 },
 	{ name: 'shortsword', power: 6 },
 	{ name: 'sword', power: 10 },
 	{ name: 'slimeslicer', power: 100 }
];
const hostiles = [
	{ name: 'slime', level: 1, health: 15 },
	{ name: "slimier", level: 3, health: 33 },
	{ name: "slimiest", level: 6, health: 60 },
	{ name: "slimo", level: 10, health: 300}
];
const locations = [
	{ 
	name: "town square",
	"button text": ["Smithy", "Gate", "Inn"],
	"button functions": [goSmithy, goGate, goInn],
	text: "You are in the town square. You hear loud banging from the Smithy and watch as the heat bellows into the air. Just a few yards away is a Bar with an \“Open\” sign. Further ahead, the Town Gate leads straight into the forest.",
	},
	{
	name: "smithy",
	"button text": ["Upgrade Weapon", "Talk", "Back"],
	"button functions": [upgradeWeapon, talkSmithy, goTown],
	text: "You enter the store."
	},
	{
	name: "gate",
	"button text": ["Continue", "Breathe", "Back"],
	"button functions": [goForest1, takeBreath, goTown],
	text: "You walk through the gate and a cool breeze hits your face. You still have a chance to turn back now… But maybe it's time to face the slimes in the forest."
	},
	{
	name: "inn",
	"button text": ["Talk", "Rest", "Back"],
	"button functions": [talkAndroid, goRest, goTown],
	text: "You enter the Inn. Behind the front desk is an android with frosty green hair."
	},
{
	name: "start",
	"button text": ["Start", "Start", "Start"],
	"button functions": [goTown, goTown, goTown],
	text: "Welcome to the Jelly Slayer Task Force! Our forest is infested with slimes and we need your help to eradicate the source.<br>Here, take this dagger… You're gonna need it."
	}
];
const battleresults = [
	{
    name: "lose",
    "button text": ["try again?", "again?", "again?"],
    "button functions": [reset, reset, reset],
    text: "The Slime Slayer fainted."
    },{
    name: "kill slime",
    "button text": ["Continue", "Breathe", "Return"],
    "button functions": [goForest2, takeBreath, goGate],
    text: "You survived the slime!"
	},{
	name: "kill slimier slime",
	"button text": ["Continue", "Breathe", "Return"],
	"button functions": [goForest3, takeBreath, goGate],
	text: "You survived the slimier slime!"
	},{
	name: "kill slimiest slime",
	"button text": ["Continue", "Breathe", "Return"],
	"button functions": [goForest4, takeBreath, goGate],
	text: "You survived the slimiest slime!"
	},{
	name: "win game",
	"button text": ["Play again?", "again?", "again?"],
    "button functions": [reset, reset, reset],
	text: "You defeated Slimo and saved the village!"
	}
];
const forestMap = [
	{
	name: "stage 1",
	"button text": ["attack", "dodge", "run"],
	"button functions": [attack, dodge, goGate],
	text: "You reach a small clearing and a slime attacks you!",
	},{
	name: "stage 2",
	"button text": ["attack", "dodge", "run"],
	"button functions": [attack, dodge, goGate],
	text: "You continue deeper into the forest and a slimier slime attacks you!",
	},{
	name: "stage 3",
	"button text": ["attack", "dodge", "run"],
	"button functions": [attack, dodge, goGate],
	text: "You continue deeper into the forest and a slimiest slime attacks you!",
	},{
	name: "stage 4",
	"button text": ["attack", "dodge", "run"],
	"button functions": [attack, dodge, goGate],
	text: "This must be it... Slimo.",
	}
];
//initialize buttons
button1.onclick = goTown;
button2.onclick = goTown;
button3.onclick = goTown;

function update(location) {
	hostileStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
	text.innerHTML = location.text;
};

function goTown() {
	console.log("player located in town square.");
	update(locations[0]);
};

function goSmithy() {
	console.log("player located at the smithy.");
	update(locations[1]);
};

function goGate() {
	console.log("player located at the gate.");
	update(locations[2]);
};

function goInn() {
	console.log("player located at the inn.");
	update(locations[3]);
};

// function goForestRound(x) {
// update(forestMap[x]);
// fighting = x;
// startFight();
// }

function goForest1() {
	update(forestMap[0]);
	fighting = 0;
	startFight();

};

function goForest2() {
	update(forestMap[1]);
	fighting = 1;
	startFight();

};

function goForest3() {
	update(forestMap[2]);
	fighting = 2;
	startFight();

};

function goForest4() {
	update(forestMap[3]);
	fighting = 3;
	startFight();

};

function startFight() {
    hostileHealth = hostiles[fighting].health;
    hostileStats.style.display = "block";
    hostileName.innerText = hostiles[fighting].name;
    hostileHealthText.innerText = hostileHealth;
}

function talkSmithy() {
	text.innerText = "I'll upgrade your weapon... if you've got the coin."
}

function upgradeWeapon() {
	// add new weapon to inventory
	console.log("player requests weapon upgrade.")
	if (currentEquip < equipment.length) {
		if (currentEquip === 3) {
			text.innerText = "\"Use my masterpiece to slay Slimo. That is all that I have lived for.\"";
		} else if (playerCC >= 30) {
			playerCC -= 30;
			currentEquip++;
			playerCCText.innerText = playerCC;
			let newEquipment = equipment[currentEquip].name;
			text.innerText = "You upgraded to the " + equipment[currentEquip].name + "!";
			equipment.push(newEquipment);
		} else {
			text.innerText = "\"I need 30 gold to upgrade your weapon. Come back when you have more...\""
		}
	} else {
			text.innerText = "\"hmm... something went wrong.\""
	}
};

/*
function playRPS() { 
	console.log("player bets 10 cc on rock, paper, scissors game.");
};
*/
function talkAndroid() {
	text.innerText = "Your room is taken care of! Enjoy your stay."
}

function goRest() {
    hostileStats.style.display = "none";
    console.log("player rests in tent.");
    if (playerHP < 100) {
        playerHP = 100;
        playerHPText.innerText = playerHP;
        text.innerHTML = "You feel well rested. Health is replenished!"
    } else {
        text.innerHTML = "No time to rest, it's time to slay some slimes!"
    }
};

function attack() {
    let hostileAttackDMG = getHostileAttackValue(hostiles[fighting].level);
	playerHP -= hostileAttackDMG;
    text.innerText = hostiles[fighting].name + " attacks and deals " + hostileAttackDMG + " damage.";
	text.innerText = "You swing your " + equipment[currentEquip].name + ".";
	if (isHostileHit()) {
        hostileHealth -= equipment[currentEquip].power + Math.floor(Math.random() * playerXP);
        text.innerText += ".. and hit the " + hostiles[fighting].name + "! ";
    } else {
        text.innerText += ".. and miss. ";
    };
    playerHPText.innerText = playerHP;
    hostileHealthText.innerText = hostileHealth;
    if (playerHP <= 0) {
        lose();
    } else if(hostileHealth <= 0) {
        defeatHostile();
    } else {
        text.innerText += " Next round";
    }
}

function getHostileAttackValue(level){
    const hit = (level * 4) - (Math.floor(Math.random() * playerXP));
    console.log("hostile deals " + hit);
    return hit > 0 ? hit : 0;
}

function isHostileHit() {
    return Math.random() > .2 || playerHP < 20;
}

function dodge() {
	text.innerText = "You dodge the attack from the " + hostiles[fighting].name;
}

function lose() {
    update(battleresults[0]);
}

function defeatHostile() {
	hostileStats.style.display = "none";
	if (fighting === 3) {
		update(battleresults[4]);
	} else {
		update(battleresults[fighting + 1]);
		playerCC += Math.floor(hostiles[fighting].level * 5.2);
		playerXP += hostiles[fighting].level;
		playerCCText.innerText = playerCC;
		playerXPText.innerText = playerXP;

	}
}

function reset() {
	update(locations[4]);
    playerXP = 0;
    playerCC = 50;
    playerHP = 100;
    playerXPText.innerText = playerHP;
    playerCCText.innerText = playerCC;
    playerHPText.innerText = playerHP;
	currentEquip = 0;

}

function flipCoin() {
	console.log(flipCoin());
	return Math.random() < 0.5 ? "Heads" : "Tails";

}
function rolld6() {
	return Math.floor((Math.random() * 6) + 1);
}

function takeBreath() {
	text.innerHTML = "You take a deep breath.";
	console.log("player takes a deep breath.")
};