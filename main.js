(function(){
	var datepicker = window.datepicker;

	var monthData,
		$wrapper;

	datepicker.buildUI = function(year, month){
		monthData = datepicker.getMonthData(year, month);
		var html = '<div class="ui-datepicker-header">' +
			'<a href="#" class="ui-datepicker-btn ui-datepicker-prev">&lt;</a>' +
			'<a href="#" class="ui-datepicker-btn ui-datepicker-next">&gt;</a>' +
			'<span class="ui-datepicker-curr-month">'+ 
			monthData.year + '-' + 
			monthData.month +'</span>' +
		'</div>'+
		'<div class="ui-datepicker-body">' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<th>一</th>' +
						'<th>二</th>' +
						'<th>三</th>' +
						'<th>四</th>' +
						'<th>五</th>' +
						'<th>六</th>' +
						'<th>日</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>';
		for(var i = 0; i < monthData.days.length; i++){
			var date = monthData.days[i];
			if(i%7 === 0){
				html += '<tr>';
			}
			html += '<td data-date="'+  date.date +'">'+ date.showDate +'</td>'
			if(i%7 === 6){
				html += '</tr>';
			}
		}
		html += '</tbody>' +
			'</table>'+
		'</div>';

		return html;
	};

	datepicker.render = function(direction){

		var year ,
			month;
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}

		if(direction == 'prev') month--;
		if(direction == 'next') month++;
		
		var html = datepicker.buildUI(year, month);
		// document.body.innerHTML += html;
		// <div class="ui-datepicker-wrapper">
		
		if(!$wrapper){
			$wrapper = document.createElement('div');
			$wrapper.className = "ui-datepicker-wrapper";
		}
		$wrapper.innerHTML = html;
	}

	datepicker.init = function(input){
		datepicker.render();

		// document.body.appendChild($wrapper);
		var $input = document.querySelector(input);
		var isOpen = false;
		$input.addEventListener('click', function(e){
			if(isOpen){
				document.body.removeChild($wrapper);
				isOpen = false;
			}else{
				document.body.appendChild($wrapper);
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top + height + 2 + 'px';
				$wrapper.style.left = left + 'px';
				isOpen = true;
			}
		}, false);

		$input.addEventListener('blur', function(){
			if(isOpen){
				document.body.removeChild($wrapper);
				isOpen = false;
			}
		}, false);

		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if($target.classList.contains('ui-datepicker-btn')){
				if($target.classList.contains('ui-datepicker-prev')){
					datepicker.render('prev')
				}
				if($target.classList.contains('ui-datepicker-next')){
					datepicker.render('next')
				}
			}

			if($target.tagName.toLowerCase() === 'td'){
				var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
				
				$input.value = format(date);

				// $wrapper.classList.remove('ui-datepicker-wrapper-show');
				document.body.removeChild($wrapper);
				isOpen = false;
			}
		}, false);
	};

	function format(date){
		var ret = '';

		var padding = function(num){
			if(num <= 9){
				return '0' + num;
			}
			return num;
		}
		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate());
		return ret;
	}
})();