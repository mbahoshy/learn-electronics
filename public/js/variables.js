TRADE.GameData.gamejson = {
	"problem_01" : {
		"Heat": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24h", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": true},
			"f1": {"Volts": "l1", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l1", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l2", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq4": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24h", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": true},
			"heat2": {"on": true},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l1", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l1", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 42.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 20.5},
			"w8": {"Amps": 20.5},
			"w9": {"Amps": 20.5},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 42.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 20.5},
			"w15": {"Amps": 20.5},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": .2},
			"w21": {"Amps": .2}

		},
		"Cool": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24h", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": true},
			"f1": {"Volts": "l1", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l1", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l2", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 12.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 12.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": 0},
			"w21": {"Amps": .2}
			

		},
		"Fan": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24h", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": true},
			"f1": {"Volts": "l1", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l1", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l2", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 12.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 12.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": 0},
			"w21": {"Amps": .2}

		},
		"Off": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": false},
			"f1": {"Volts": "l2", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l2", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l2", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 12.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 12.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": 0},
			"w21": {"Amps": .2}


		},
		"noswitch": {
			//breaker
			"break1": {"on": false},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l2", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": false},
			"f1": {"Volts": "l2", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l2", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l2", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 0},
			"w2": {"Amps": 0},
			"w3": {"Amps": 0},
			"w4": {"Amps": 0},
			"w5": {"Amps": 0},
			"w6": {"Amps": 0},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 0},

			"w11": {"Amps": 0},
			"w12": {"Amps": 0},
			"w13": {"Amps": 0},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": 0},
			"w17": {"Amps": 0},
			"w18": {"Amps": 0},
			"w19": {"Amps": 0},
			"w20": {"Amps": 0},
			"w21": {"Amps": 0}
		}
	}
};