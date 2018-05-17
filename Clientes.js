/*jshint esversion: 6 */ 
$(document).ready(function() {
	$("#div_respuesta").on("click", "#btn_mod_date", function() {
		var id = $("#cte_selected").val();

		if ($("#baja_cliente").val() == "BAJA") {
			swal({
				title: "Estas seguro?",
				text: "Se dara de Baja al cliente!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, Dar de baja!"
			}).then((result) => {
				if (result.value) {
					$.ajax({
						url: base_url+"CRM/baja_cte",
						type: "POST",
						data: "id_cte=" + id,
						error: function(XMLHttpRequest, textStatus, errorThrown) {},
						success: function(r) {
							swal("BAJA!", "Tu cliente fue dado de baja.", "success");
							$("#div_respuesta").empty();
							$("#items" + id).fadeOut();
							$("#titleResp").empty();
						}
					});
				}
			});
		}
	});

	$(".tab-pane").on("click", ".items", function() {
		$("#div_respuesta").empty();
		var id = $(this).data("id");
		var nom = $(this).data("nom");
		$("#cte_selected").val(id);
		$("#titleResp").empty();
		$("#titleResp").html('<i class="fa fa-user"></i> ' + nom);
		$.ajax({
			url: base_url+"CRM/get_cte_search_id",
			type: "POST",
			data: "id=" + id
		}).done(function(r) {
			$("#div_respuesta").html(r);
			$("#on_div_respuesta").fadeIn();
		});
	});
	$(".block-options").on("click", "#btn_reports", function() {
		$("#div_respuesta").empty();
		$("#titleResp").empty();
		$("#titleResp").html('<i class="fa fa-list"></i> Lista de clientes');
		$.ajax({
			url: base_url+"CRM/cte_list",
			type: "POST"
		}).done(function(r) {
			$("#div_respuesta").html(r);
			$("#on_div_respuesta").fadeIn();
		});
	});

	$("#div_respuesta").on("click", ".btn_ver", function() {
		$("#modal_respuesta").empty();
		var id = $(this).data("id");
		var nom = $(this).data("nombre");

		$("#titulo_modal").empty();
		$("#titulo_modal").html("<i class='fa fa-user'></i> " + nom);
		$.ajax({
			url: base_url+"CRM/get_ctecto_search_id",
			type: "POST",
			data: "id=" + id
		}).done(function(r) {
			$("#modal_respuesta").append(r);
			$("#ctecteo_modal").modal("show");
		});
	});

	$("#btn_buscar").click(function() {
		$("#div_busqueda").fadeIn();
		$("#input_busqueda").focus();
	});

	$("#input_busqueda").keyup(function() {
		if (
			$("#input_busqueda").val() != "" &&
			$("#input_busqueda").val().length >= 3
		) {
			$.ajax({
				url: base_url+"CRM/get_cte_search",
				type: "POST",
				dataType: "json",
				data: "text=" + $("#input_busqueda").val(),
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("cte");
					alert("Error: " + errorThrown);
				}
			}).done(search_cte);
			$.ajax({
				url: base_url+"CRM/get_cte_search_municipio",
				type: "POST",
				dataType: "json",
				data: "text=" + $("#input_busqueda").val(),
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("estado que es municipio :v ");
					alert("Error: " + errorThrown);
				}
			}).done(search_cte_estado);
			$.ajax({
				url: base_url+"CRM/get_cte_search_direccion",
				type: "POST",
				dataType: "json",
				data: "text=" + $("#input_busqueda").val(),
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("dir");
					alert("Error: " + errorThrown);
				}
			}).done(search_cte_direccion);
			$.ajax({
				url: base_url+"CRM/get_cte_search_tipo",
				type: "POST",
				dataType: "json",
				data: "text=" + $("#input_busqueda").val(),
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("tipo");
					alert("Error: " + errorThrown);
				}
			}).done(search_cte_tipo);
		} else if ($("#input_busqueda").val() == "") {
			$.ajax({
				url: base_url+"CRM/get_cte_search_all",
				type: "POST",
				dataType: "json",
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("wtf");
					alert("Error: " + errorThrown);
				}
			}).done(search_cte);
		}
	});

	function search_cte(data) {
		var resultado = data;
		var cte = "";

		result = data;

		if (data.status) {
			cte = '<ul class="nav push" id="div_ctes">';
			for (var i = 0; i < data.data.length; i++) {
				if (data.data[i].tipB == "cte") {
					cte +=
						"<li class='items' id='items" +
						data.data[i].id_registro +
						"' data-id='" +
						data.data[i].id_registro +
						"' data-nom='" +
						data.data[i].nombre +
						"'> <a style='cursor:pointer;' > <i class='fa fa-users'></i> " +
						data.data[i].nombre.substr(0, 29) +
						"<div class='font-w400 text-muted'><small>" +
						data.data[i].tipo_cliente +
						"</small></div></a></li>";
				}
			}
			$("#div_ctes").empty();
			$("#div_ctes").append(cte + "</ul>");
		}
	}

	function search_cte_tipo(data) {
		var resultado = data;

		var tip = "";

		result = data;

		if (data.status) {
			tip = '<ul class="nav push" id="div_ctes">';
			for (var i = 0; i < data.data.length; i++) {
				if (data.data[i].tipB == "tipo") {
					tip +=
						"<li class='items' id='items" +
						data.data[i].id_registro +
						"' data-id='" +
						data.data[i].id_registro +
						"' data-nom='" +
						data.data[i].nombre +
						"'> <a style='cursor:pointer;' > <i class='fa fa-users'></i> " +
						data.data[i].nombre.substr(0, 29) +
						"<div class='font-w400 text-muted'><small>" +
						data.data[i].tipo_cliente +
						"</small></div></a></li>";
				}
			}

			$("#tab_tipo").html("");
			$("#tab_tipo").append(tip + "</ul>");
		}
	}

	function search_cte_direccion(data) {
		var resultado = data;
		var cte = "";
		var estado = "";
		var tip = "";
		var municipio = "";
		result = data;

		if (data.status) {
			municipio = '<ul class="nav push" id="div_ctes">';
			for (var i = 0; i < data.data.length; i++) {
				if (data.data[i].tipB == "municipio") {
					municipio +=
						"<li class='items' id='items" +
						data.data[i].id_registro +
						"' data-id='" +
						data.data[i].id_registro +
						"' data-nom='" +
						data.data[i].nombre +
						"'> <a style='cursor:pointer;' > <i class='fa fa-users'></i> " +
						data.data[i].nombre.substr(0, 29) +
						"<div class='font-w400 text-muted'><small>" +
						data.data[i].tipo_cliente +
						"</small></div></a></li>";
				}
			}

			$("#tab_dir").html("");
			$("#tab_dir").append(municipio + "</ul>");
		}
	}

	function search_cte_estado(data) {
		var resultado = data;
		var estado = "";
		result = data;

		if (data.status) {
			estado = '<ul class="nav push" id="div_ctes">';
			for (var i = 0; i < data.data.length; i++) {
				if (data.data[i].tipB == "estado") {
					estado +=
						"<li class='items' id='items" +
						data.data[i].id_registro +
						"' data-id='" +
						data.data[i].id_registro +
						"' data-nom='" +
						data.data[i].nombre +
						"'> <a style='cursor:pointer;' > <i class='fa fa-users'></i> " +
						data.data[i].nombre.substr(0, 29) +
						"<div class='font-w400 text-muted'><small>" +
						data.data[i].tipo_cliente +
						"</small></div></a></li>";
				}
			}

			$("#tab_estado").html("");
			$("#tab_estado").append(estado + "</ul>");
		}
	}

	$("#nuevo_cte").on("click", "#guardar_new", function() {
		var rfc = $("#rfc_new").val();
		var nombre_c = $("#nombre_new").val();
		var reg_fed = $("#reg_fed_new").val();
		var tipo_c = $("#tipo_cliente_new").val();
		var dir = $("#dir_new").val();
		var estado = $("#estado_new").val();
		var municipio = $("#municipio_new").val();
		var lat = $("#lat_new").val();
		var long = $("#long_new").val();

		if (rfc == "") {
			swal("Atencion!", "Ingresa Nombre o Razón Social!", "warning");
			return;
		}
		if (nombre_c == "") {
			swal("Atencion!", "Ingresa Nombre corto!", "warning");
			return;
		}

		if (tipo_c == "Elige una Opción") {
			swal("Atencion!", "Elige una Opción de tipo de cliente!", "warning");
			return;
		}
		if (dir == "") {
			swal("Atencion!", "Ingresa Dirección del cliente!", "warning");
			return;
		}
		if (estado == "") {
			swal("Atencion!", "Ingresa Estado del cliente!", "warning");
			return;
		}
		if (municipio == "") {
			swal("Atencion!", "Ingresa municipio del cliente!", "warning");
			return;
		}

		$.ajax({
			url: base_url+"CRM/add_new_cte",
			type: "POST",
			data:
				"rfc=" +
				rfc +
				"&nombre_c=" +
				nombre_c +
				"&reg_fed=" +
				reg_fed +
				"&tipocnew=" +
				tipo_c +
				"&dir=" +
				dir +
				"&estado=" +
				estado +
				"&municipio=" +
				municipio +
				"&lati=" +
				lat +
				"&longi=" +
				long,
			error: function(XMLHttpRequest, textStatus, errorThrown) {},
			success: function(r) {
				r = JSON.parse(r);
				console.log(r);

				var li =
					"<li id='items" +
					r.data[0].id_registro +
					"' data-id=" +
					r.data[0].id_registro +
					" data-nom='" +
					r.data[0].nombre +
					"' class='items'>" +
					"<a style='cursor:pointer;' > <i class='fa fa-users'></i>" +
					r.data[0].nombre +
					"<div class='font-w400 text-muted'><small>" +
					r.data[0].tipo_cliente +
					"</small></div></a></li>";
				$("#div_ctes").prepend(li);
				swal("Buen trabajo!", "Cliente registrado con éxito!", "success");
			}
		});
	});

	$(".titulo_cto").click(function() {
		$("#cto_nombre_new").val($(this).text() + " ");
		$("#cto_nombre_new").focus();
	});

	$("#new_contact").on("click", "#guardar_new_cto", function() {
		var nombre = $("#cto_nombre_new").val();
		var apellido = $("#cto_apellido_new").val();
		var nombre_corto = $("#cto_nombrec_new").val();
		var color = $("#cto_color_new").val();
		var tipo_c = $("#cto_tipoc_new").val();
		var tel_e = $("#cto_tel_new").val();
		var celular = $("#cto_cel_new").val();
		var tel_extra = $("#cto_extra_new").val();
		var email = $("#cto_email_new").val();
		var dir = $("#cto_dir_new").val();
		var estado = $("#cto_estado_new").val();
		var municipio = $("#cto_municipio_new").val();
		var lat = $("#cto_lat_new").val();
		var long = $("#cto_long_new").val();
		var puesto = $("#cto_puesto_new").val();

		if (nombre == "") {
			swal("Atencion!", "Ingresa Nombre !", "warning");
			return;
		}
		if (apellido == "") {
			swal("Atencion!", "Ingresa apellido!", "warning");
			return;
		}
		if (nombre_corto == "") {
			swal("Atencion!", "Ingresa Registro federal!", "warning");
			return;
		}
		if (color == "") {
			swal("Atencion!", "Ingresa el color!", "warning");
			return;
		}
		if (celular == "") {
			swal("Atencion!", "Ingresa celular!", "warning");
			return;
		}
		if (tel_e == "") {
			swal("Atencion!", "Ingresa ingresar telefono !", "warning");
			return;
		}

		if (tipo_c == "Elige una Opción") {
			swal("Atencion!", "Elige una Opción de tipo de cliente!", "warning");
			return;
		}
		if (dir == "") {
			swal("Atencion!", "Ingresa Dirección del cliente!", "warning");
			return;
		}
		if (estado == "") {
			swal("Atencion!", "Ingresa Estado del cliente!", "warning");
			return;
		}
		if (municipio == "") {
			swal("Atencion!", "Ingresa municipio del cliente!", "warning");
			return;
		}

		$.ajax({
			url: base_url+"CRM/add_new_cto",
			type: "POST",
			data:
				"id_cte=" +
				$("#cte_selected").val() +
				"&nombre=" +
				nombre +
				"&apellido=" +
				apellido +
				"&nombre_c=" +
				nombre_corto +
				"&puesto=" +
				puesto +
				"&color=" +
				color +
				"&tipo_c=" +
				tipo_c +
				"&tel_ofi=" +
				tel_e +
				"&tel_movil=" +
				celular +
				"&tel_extra=" +
				tel_extra +
				"&correo=" +
				email +
				"&dir=" +
				dir +
				"&estado=" +
				estado +
				"&municipio=" +
				municipio +
				"&lat=" +
				lat +
				"&lon=" +
				long,
			error: function(XMLHttpRequest, textStatus, errorThrown) {},
			success: function(r) {
				r = JSON.parse(r);

				var dat;

				dat =
					'<div class="col-sm-6 col-lg-3">' +
					'<div class="block block-themed">' +
					'<div class="block-header bg-primary">' +
					'<ul class="block-options">' +
					"<li>" +
					'<button type="button" class="btn_ver" data-toggle="modal" data-nombre="' +
					r.data[0].nombres +
					'" data-id="' +
					r.data[0].id_registro +
					'">' +
					'<i class="material-icons " data-toggle="tooltip" title="Ver detalles">visibility</i></button>' +
					"</li>" +
					"</ul>" +
					'<h3 class="block-title">' +
					r.data[0].nombre_corto +
					"</h3>" +
					"</div>" +
					'<div class="block-content block-content-full text-center">' +
					"<div>" +
					'<img class="img-avatar img-avatar96" src="<?=base_url()."assets/img/avatars/avatar3.jpg";?>";?>" alt="">' +
					"</div>" +
					'<div class="text-muted push-15-t">' +
					r.data[0].puesto +
					"</div>" +
					"</div>" +
					"</div>" +
					"</div>";

				$("#tab_contactos").append(dat);
				swal("Buen trabajo!", "Cliente registrado con éxito!", "success");
			}
		});
	});

	function openInfoWindow2(marker, ilat, ilon) {
		var markerLatLng = marker.getPosition();
		$("#" + ilat).val(markerLatLng.lat());
		$("#" + ilon).val(markerLatLng.lng());
		infoWindow.setContent(["Arrastra para actualizar la posicion."].join(""));
		infoWindow.open(mapa, marker);
	}

	window.drawmap = function(div, latr, lonr, ilat, ilon) {
		coordenadas = new google.maps.LatLng(latr, lonr);
		var ta = 15;
		infoWindow = new google.maps.InfoWindow();
		tipo = google.maps.MapTypeId.ROADMAP;
		opciones = { center: coordenadas, zoom: ta, mapTypeId: tipo };
		mapa = new google.maps.Map(div, opciones);
		var marker = new google.maps.Marker({
			position: coordenadas,
			draggable: true,
			map: mapa,
			title: "Mapa"
		});
		google.maps.event.addListener(marker, "drag", function() {
			openInfoWindow2(marker, ilat, ilon);
		});
	};

	drawmap(
		$("#js-map-street")[0],
		"20.632744087711874",
		"-103.36613416671753",
		"lat_new",
		"long_new"
	);
	drawmap(
		$("#js-map-street-cto")[0],
		"20.632744087711874",
		"-103.36613416671753",
		"cto_lat_new",
		"cto_long_new"
	);

	function geocodeResult(results, status) {
		// Verificamos el estatus
		if (status == "OK") {
			// Si hay resultados encontrados, centramos y repintamos el mapa
			// esto para eliminar cualquier pin antes puesto
			var mapOptions = {
				center: results[0].geometry.location,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map($("#js-map-street").get(0), mapOptions);
			// fitBounds acercará el mapa con el zoom adecuado de acuerdo a lo buscado
			map.fitBounds(results[0].geometry.viewport);
			// Dibujamos un marcador con la ubicación del primer resultado obtenido
			var markerOptions = {
				position: results[0].geometry.location,
				draggable: true,
				map: mapa,
				title: "Mapa"
			};
			var marker = new google.maps.Marker(markerOptions);
			var ll = marker.getPosition();
			$("#lat_new").val(ll.lat());
			$("#long_new").val(ll.lng());
			marker.setMap(map);
			google.maps.event.addListener(marker, "drag", function() {
				openInfoWindow2(marker, "lat_new", "long_new");
			});
		} else {
			swal("Error!", "No se encontro la dirección!", "warning");
		}
	}
	function geocodeResultcto(results, status) {
		// Verificamos el estatus
		if (status == "OK") {
			// Si hay resultados encontrados, centramos y repintamos el mapa
			// esto para eliminar cualquier pin antes puesto
			var mapOptions = {
				center: results[0].geometry.location,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map($("#js-map-street-cto").get(0), mapOptions);
			// fitBounds acercará el mapa con el zoom adecuado de acuerdo a lo buscado
			map.fitBounds(results[0].geometry.viewport);
			// Dibujamos un marcador con la ubicación del primer resultado obtenido
			var markerOptions = {
				position: results[0].geometry.location,
				draggable: true,
				map: mapa,
				title: "Mapa"
			};
			var marker = new google.maps.Marker(markerOptions);
			var ll = marker.getPosition();
			$("#cto_lat_new").val(ll.lat());
			$("#cto_long_new").val(ll.lng());
			marker.setMap(map);
			google.maps.event.addListener(marker, "drag", function() {
				openInfoWindow2(marker, "cto_lat_new", "cto_long_new");
			});
		} else {
			swal("Alerta!", "No se encontro la dirección!", "warning");
		}
	}
	function geocodeResultctomodal(results, status) {
		// Verificamos el estatus
		if (status == "OK") {
			// Si hay resultados encontrados, centramos y repintamos el mapa
			// esto para eliminar cualquier pin antes puesto
			var mapOptions = {
				center: results[0].geometry.location,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(
				$("#js-map-street-cto-modal").get(0),
				mapOptions
			);
			// fitBounds acercará el mapa con el zoom adecuado de acuerdo a lo buscado
			map.fitBounds(results[0].geometry.viewport);
			// Dibujamos un marcador con la ubicación del primer resultado obtenido
			var markerOptions = {
				position: results[0].geometry.location,
				draggable: true,
				map: mapa,
				title: "Mapa"
			};
			var marker = new google.maps.Marker(markerOptions);
			var ll = marker.getPosition();
			$("#cto_lat_new").val(ll.lat());
			$("#cto_long_new").val(ll.lng());
			marker.setMap(map);
			google.maps.event.addListener(marker, "drag", function() {
				openInfoWindow2(marker, "cto_lat_new", "cto_long_new");
			});
		} else {
			swal("Error!", "No se encontro la dirección!", "warning");
		}
	}

	$("#mostrar_map").click(function() {
		let dir = $("#dir_new").val();
		let estado = $("#estado_new").val();
		let muni = $("#municipio_new").val();

		if (!dir) {
			swal("Atencion!", "Ingresa la Dirección del cliente!", "warning");
			return;
		}
		if (!estado) {
			swal("Atencion!", "Ingresa el estado del cliente!", "warning");
			return;
		}
			if (!muni) {
				swal("Atencion!", "Ingresa el municipio del cliente!", "warning");
				return;
			}
		
		let geocoders = new google.maps.Geocoder();
		geocoders.geocode(
			{ address: dir + " " + estado + " " + muni },
			geocodeResult
		);
	});

	$("#mostrar_map_cto").click(function() {
		let dir = $("#cto_dir_new").val();
		let estado = $("#cto_estado_new").val();
		let municipio = $("#cto_municipio_new").val();

		if (!dir) {
			swal("Atencion!", "Ingresa la Dirección del cliente!", "warning");
			return;
		}
		if (!estado) {
			swal("Atencion!", "Ingresa el estado del cliente!", "warning");
			return;
		}
			if (!municipio) {
				swal("Atencion!", "Ingresa el municipio del cliente!", "warning");
				return;
			}
	
		let geocoders = new google.maps.Geocoder();
		geocoders.geocode(
			{ address: dir + " " + estado + " " + municipio },
			geocodeResultcto
		);
	});

	$("#modal_respuesta").on("click", "#buscar_dir_cto", function() {
		let dir = $("#dir_cto").val();
		let estado = $("#estado_cto").val();
		let municipio = $("#municipio_cto").val();

		if (!dir) {
			swal("Atencion!", "Ingresa la Dirección del cliente!", "warning");
			return;
		}
		if (!estado) {
			swal("Atencion!", "Ingresa el estado del cliente!", "warning");
			return;
		}
			if (!municipio) {
				swal("Atencion!", "Ingresa el municipio del cliente!", "warning");
				return;
			}
		
		let geocoders = new google.maps.Geocoder();
		geocoders.geocode(
			{ address: dir + " " + estado + " " + municipio },
			geocodeResultctomodal
		);
	});

	$("#cto_btn_titna").click(function() {
		var nombre = $("#cto_nombre_new").val();
		var apellido = $("#cto_apellido_new").val();
		if (nombre == "") {
			swal("Atencion!", "Ingresa Nombre !", "warning");
			return;
		}
		if (apellido == "") {
			swal("Atencion!", "Ingresa apellido!", "warning");
			return;
		}

		$("#cto_nombrec_new").val(nombre + " " + apellido);
		$("#cto_btn_titna").fadeOut();
	});

	$("#ctecteo_modal").on("click", "#btn_save_cto", function() {
		var id = $("#id_cto_modal").val();
		var dir = $("#dir_cto").val();
		var tel = $("#tel_id_cto").val();
		var cel = $("#cel_cto").val();
		var tel_e = $("#tel_extra_cto").val();
		var email = $("#email_cto").val();
		var estado = $("#estado_cto").val();
		var municipio = $("#municipio_cto").val();

		var lat = $("#lat_modal").val();
		var lon = $("#lon_modal").val();
		if (tel_e == "") {
			tel_e = 0;
		}
		$.ajax({
			url: base_url+"CRM/actualizar_cto",
			type: "POST",
			data:
				"id_cto=" +
				id +
				"&dir=" +
				dir +
				"&estado=" +
				estado +
				"&municipio=" +
				municipio +
				"&tel=" +
				tel +
				"&cel=" +
				cel +
				"&tel_extra=" +
				tel_e +
				"&lat=" +
				lat +
				"&lon=" +
				lon +
				"&email=" +
				email,
			error: function(XMLHttpRequest, textStatus, errorThrown) {},
			success: function(r) {
				swal("Buen trabajo!", "Contacto actualizado!", "success");
			}
		});
	});
});