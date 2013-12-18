		$(document).ready(function(){
			$('#sign_in').on('click', function(){
				$('#sign_in_inputs').fadeToggle();
				$('#sign_in').addClass('sign-in-active');
				$('#sign_in').off('click');
				$('#sign_in').on('click', function () {
					// $(this).parent().form.submit();
					$('#sign_in_form').submit();
					console.dir($(this).parent().form);
					// this.form.submit();
				});
			});

			$('#sign_up').on('click', function(){
				$('#sign_up_form').toggle();
				$('#shadow').toggle();
			});

			$('#shadow').on('click', function(){
				$('#sign_up_form').toggle();
				$('#shadow').toggle();
			});


			TRADE.CIRC.Create(720, 260);
			
		});