TRADE.GameData.gamejson = {
	"problem_01" : {
		"switch": {

			//neutral
			"n1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			"line1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},

			//contacts
			"c2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},
			"c3": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			
			//switch
			"spst1": {"on": true},
			"s0": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"s1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//wires
			"w1": {"Amps": 1.2},
			"w2": {"Amps": 1.2},
			"w3": {"Amps": 1.2},
			"w4": {"Amps": 1.2},
			"w5": {"Amps": 1.2},

			//light
			"l1": {"on": true},
			"l2": {"on": true},
			"l3": {"on": true},
			"lc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"lc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//heater
			"heat1": {"on": true},
			"heat2": {"on": false},
			"heat3": {"on": false},
			"fan1": {"on": true}


		},
		"noswitch": {
			//neutral
			"n1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			"line1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},

			//contacts
			"c2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},
			"c3": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
						
			//switch
			"spst1": {"on": false},
			"sc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"sc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//wires
			"w1": {"Amps": 0},
			"w2": {"Amps": 0},
			"w3": {"Amps": 0},
			"w4": {"Amps": 0},
			"w5": {"Amps": 0},

			//light
			"l1": {"on": false},
			"l2": {"on": false},
			"lc1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"lc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//heater
			"heat1": {"on": false},
			"heat2": {"on": true},
			"heat3": {"on": true},
			"fan1": {"on": false}
		}
	}
};