		$(document).ready(function(){
			$('#sign_in').on('click', function(){
				$('#sign_in_form').fadeToggle();
			});

			$('#sign_up').on('click', function(){
				$('#sign_up_form').toggle();
				$('#shadow').toggle();
			});

			$('#shadow').on('click', function(){
				$('#sign_up_form').toggle();
				$('#shadow').toggle();
			});


			TRADE.CIRC.Create(720, 360);
			
		});