	<script type="text/html" id='slide1b'>
		<p>This is slide 1b. </p>
		<%  HVAC.Create(700, 350);
			HVAC.Set('problem_01', 'switch');
			HVAC.Line1('line1', 50, 40);

			HVAC.Contact('c2', 50, 120);
			HVAC.Contact('c3', 625, 212);
		
			HVAC.Neutral('n1', 625, 40);

			HVAC.SPSTSwitch('spst1', 'sc1', 'sc2', 120, 120, 'noswitch');
			HVAC.LightBulb('l1', 'lc1', 'lc2', 290, 60);

			HVAC.DrawWire('w1', 'blue', 3, [50, 40, 50, 120]);
			HVAC.DrawWire('w2', 'blue', 3, [50, 120, 120, 120]);
			HVAC.DrawWire('w3', 'blue', 3, [160, 210, 290, 210]);
			HVAC.DrawWire('w4', 'blue', 3, [360, 210, 625, 210]);
			HVAC.DrawWire('w5', 'blue', 3, [625, 210, 625, 40]);
		%>
	</script>