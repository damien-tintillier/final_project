function load(name) {
	      // Create a search control
	
	      var searchControl = new google.search.SearchControl();
	      
	      searchControl.addSearcher(new google.search.ImageSearch());
			
	      // tell the searcher to draw itself and tell it where to attach
	      searchControl.draw(document.getElementById("searchcontrol"));
	
	      // execute an inital search
	      searchControl.execute(name);
	    }

$(function() {
	
	performAjaxRequest(
			'https://api.instagram.com/v1/tags/nature/media/recent?access_token=201217738.f59def8.93ecf70eb7674150b6131909ca167069',
			'photoGallery5');
	
	function googleImage(name){	
		load(name);
	//	google.setOnLoadCallback(OnLoad);
	    
		google.load('search', '1');


}
	
	jQuery(function() {
		$("p.reload").click(function() {
		var name = prompt("Type the Tag you want pictures of (without space)", "Tag");
		performAjaxRequest(
				'https://api.instagram.com/v1/tags/' + name + '/media/recent?client_id=1c97ad3ab4b74043ad281b346dabc1d8&callback=?',
				'photoGallery5');
	    googleImage(name);
		});
	});
	
	function performAjaxRequest(url, photoGallery, tagFilter) {
		$.ajax({
	        type: 'GET',
	        dataType: 'jsonp',
	        async: true,
	        cache: false,
	        url: url,
	        success: function (data) {
	        	if (data.meta.code != 200)
	        		return false;

	        	var content = new Array();

	        	for (var i = 0; i < data.data.length; ++i) {
	        		if (data.data[i] && inArray(data.data[i].tags, tagFilter))
	        			content.push(data.data[i]);
	        	}

				return displayResults(content, photoGallery);
	        }
	    });
	}

	function inArray(tags, tagFilter) {
		if (!tagFilter)
			return true;

		for (tag in tags) {
			for (filter in tagFilter) {
				if (tags[tag].indexOf(tagFilter[filter]) != -1)
					return true;
			}
		}

		return false;
	}

	function displayResults(content, photoGallery) {
		var table = "<table class='photoGallery'><tr>";

		for (var i = 0; i < content.length; ++i)
		{
			if (i && i % 4 == 0)
    			table += '</tr><tr>';

    		table += '<td>';
			table += "<a href='" + content[i].images.standard_resolution.url + "' rel='lightbox[" + photoGallery + "]' title='" + (content[i].caption ? content[i].caption.text : '') + "' >";
			table += "<img src='" + content[i].images.thumbnail.url + "' alt />";
	        table += '</a></td>';
		}

		table += '</tr></table>';
		
		document.getElementById(photoGallery).innerHTML = table;

		return true;
	}

	
	

});
