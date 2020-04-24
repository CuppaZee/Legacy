var munzee = require('./Munzee');

module.exports = class Activity {
    constructor(pin,type) {
        this.pin = pin;
        this.type = type;
    }

    pinIsAny(array) {
        if(typeof array === "string") array = array.split(';');
        return array.filter(i=>i).map(i=>this.pin.replace(/_/g,'').includes(`/${i}.png`)).includes(true);
    }

    get is_evolution () {
        return this.pinIsAny(
            "tomatoseed;tomatoplant;tomato;cornseed;cornstalk;earofcorn;carrotseed;carrotplant;carrot;peasseed;peasplant;peas;goldencarrotseed;goldencarrotplant;goldencarrot;calf;cow;milk;piglet;pig;bacon;colt;racehorse;championshiphorse;chick;chicken;eggs;lean-toshed;gardenshed;barn;hoe;plow;tractor;farmer;farmerandwife;family;pottedplant;garden;field;"+

            "seaweed;fish;shark;canoe;motorboat;submarine;dinosauregg;dinosaur;bones;firstwheel;penny-farthingbike;musclecar;lioncub;lion;kingofthejungle;safaritruck;safarivan;safaribus;"+
            
            "coin;bagofcoins;treasurechest;"+

            "tulipseed;tulipgermination;tulipgrowth;tulipbud;pinktulipblossom;bluetulipblossom;whitetulipblossom;roseseed;rosegermination;rosegrowth;rosebud;redroseblossom;violetroseblossom;whiteroseblossom;yellowroseblossom;lilyseed;lilygermination;lilygrowth;lilybud;pinklilyblossom;violetlilyblossom;whitelilyblossom;carnationseed;carnationgermination;carnationgrowth;carnationbud;pinkcarnationblossom;redcarnationblossom;violetcarnationblossom;whitecarnationblossom;yellowcarnationblossom;"+

            "butterflyegg;caterpillar;chrysalis;hatchedchrysalis;morphobutterfly;monarchbutterfly;limebutterfly;"+

            "frogegg;tadpole;pollywog;froglet;treefrog;poisondartfrog;tomatofrog;"
        )
    }

    get is_gaming () {
        return this.pinIsAny(
            "prizewheel;rockpaperscissors;bowlingball;bowling-1stroll;bowling-2ndroll;urbanfit;sirprizewheel;surprise;"+
            "joystick;joystickvirtual;runzeerob;goldcoinz;coinz;munchman;munch-man;ghostzee;ghostzees;leapfrog;fly;flyz;"
        )
    }

    get is_personal () {
        return this.pinIsAny("personal;premiumpersonal;")
    }

    get is_poi () {
        return this.pin.match(/\/pins\/poi/)
    }

    get is_weapon () {
        return this.pinIsAny("mace;longsword;battleaxe;thehammer;crossbow;catapult;")
    }

    get is_flat_friend () {
        return this.pinIsAny("flatrob;flatlou;flatmatt;flathammock;")
    }
    
    get is_bouncer () {
        return this.pinIsAny(
            "theunicorn;battleunicorn;hippocampunicorn;leprechaun;goblinleprechaun;dwarfleprechaun;dragon;chinesedragon;wyverndragon;yeti;lycanthropeyeti;reptoidyeti;pegasus;griffinpegasus;alicornpegasus;hydra;cerberushydra;cthulhuhydra;faun;centaurfaun;krampusfaun;cyclops;mermaid;hotspringmermaid;melusinemermaid;fairy;dryadfairy;wildfirefairy;banshee;harpybanshee;witchbanshee;nymph;"+

            "tuli;tulimber;tuliferno;vesi;vesial;vesisaur;muru;muruchi;murutain;mitmegu;jootmegu;lokemegu;rohimegu;pimedus;puffle;pufrain;puflawn;magnetus;ametust;topaas;oniks;elekter;elekjoud;elektrivool;"+

            "tuxflatrob;beachflatrob;coldflatrob;footyflatmatt;matt'erupflatmatt;face-offflatmatt;"+
            "morphobutterfly;monarchbutterly;limebutterfly;treefrog;poisondartfrog;tomatofrog;koalaaussieanimal;kangarooaussieanimal;redheartbreaker;pinkheartbreaker;yellowheartbreaker;greenheartbreaker;"+

            "retiredunicorn;retiredleprechaun;retireddragon;retiredyeti;retiredpegasus;retiredhydra;retiredfaun;retiredcyclops;retiredmermaid;retiredmermaid;retiredfairy;retiredbanshee;"+

            "zombietuli;zombievesi;zombiemuru;"+

            "nomad;nomadvirtual;nomadmystery;jewelthiefnomad;bellhopnomad;piratenomad;warriornomad;travelernomad;seasonalnomad;virtualflatnomad;"+

            "coupechampions%231;coupechampions%232;coupechampions%233;coupechampions%234;coupechampions%235;coupechampions%236;coupechampions%237;coupechampions%238;coupechampions%239;coupechampions%2310;coupechampions%2311;coupechampions%2312;coupechampions%2313;coupechampions%2314;coupechampions%2315;coupechampions%2316;coupechampions%2317;coupechampions%2318;coupechampions%2319;coupechampions%2320;coupechampions%2321;coupechampions%2322;coupechampions%2323;"+

            "spectacularspectacles2020vision;theking'ssunglasses2020vision;weldinggoggles2020vision;flipglasses2020vision;skigoggles2020vision;theatrebinoculars2020vision;"+

            "rainbowtrail;redzed;orangezed;yellowzed;greenzed;bluezed;indigozed;violetzed;louroll;"+

            "babyfawn;babylamb;babybunny;babytiger;babychick;"+

            "rainbowunicorn;gnomeleprechaun;icedragon;sasquatchyeti;firepegasus;chimera;cherub;ogre;siren;fairygodmother;gorgon;motherearth;"+

            "hadavale;"
        )
    }

    get is_jewel () {
        return this.pinIsAny("diamond;ruby;aquamarine;pinkdiamond;topaz;virtualamethyst;virtualsapphire;virtualemerald;virtualcitrine;virtualonyx;")
    }

    get is_renovation () {
        return this.pinIsAny("renovation;destination;")
    }
}