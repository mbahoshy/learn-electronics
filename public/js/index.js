		$(document).ready(function(){
			// $('#submit_button').on('click', function (e) {
				
			// })
			$('#submit_button').on('click', function(e){
				e.preventDefault();
				$('#sign_in_inputs').fadeToggle();
				$('#sign_in').addClass('sign-in-active');
				$('#submit_button').off('click');
				$('#submit_button').on('click', function () {
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