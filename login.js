//variables globals
var finestraLogin;
var idUsuari;
var finestraRegistre;

function login(){
	//si la finestra login no està declarada
	if (!finestraLogin)
	{
		   //es declaren els botons 
		   var btnValidar = new Ext.Button({ 
	            text: 'Validar',
	            icon: 'img/icones/accept.png', 
				width: 75,
				//quan es premi cridarà la funció validarAcceso
				handler:function(){
					formulari.validarAcceso();
				} 
		    });	 
		    //quna es premi borrarà les dades del formulari
		    var btnEsborrar = new Ext.Button({ 
	            text: 'Esborrar',
	            icon: 'img/icones/delete.png',
				width: 75,
				handler:function(){
					var frm = formulari.getForm();
					frm.reset();
					frm.clearInvalid();
				} 
		    });	 	
		    var btnLogOut = new Ext.Button({ 
				text: 'Log Out',
				icon: 'img/icones/decline.png',
				width: 75,
				//quan es premi borrarà les dades del formulari, cridarà la funció surt i es tancarà la finestra
				handler:function(){
					var frm = formulari.getForm();
					frm.reset();
					frm.clearInvalid();
					surt();
					finestraLogin.hide();
				} 
		    });		    	    		
		
		    //es crea una toolbar amb els tres botons
			var tlbBottomLogin= new Ext.Toolbar({
				id:"tlbPrincipal",
		        height: 30,
		        items:
		        [
					,'->'
					,btnValidar
					,'|'
					,btnEsborrar
					,'|'
					,btnLogOut
					
		        ]
		    });  		
			//es crea el formulari per validar l'accés
			var formulari = new Ext.FormPanel({
				labelWidth: 100, 
				frame:true,
				bodyStyle:'padding:5px 5px 0',
				width: 500,
				defaults: {width: 200},
				defaultType: 'textfield',
				//elements del formulari
				items: [
					
					{
						fieldLabel:  'Usuari',
						name: 'Usuari',
						allowBlank:false
					},{
						fieldLabel: 'Password',
						name: 'Password',
						inputType: 'password',
						allowBlank:false
					},
				],
					validarAcceso: function(){
						//es valida el formulari
						if (this.getForm().isValid()) {
							this.getForm().submit({
								//s'envien les dades a un fitxer php
								url: 'php/login.php',
								method: 'GET',
								waitTitle: 'Conectant',
								waitMsg: 'Validant les dades. Per favor esperi..',
								//si les dades son correctes
								success: function(form, action){
									//es mostra el missatge de benvinguda del php
									Ext.Msg.alert('Login', action.result.msg, function(){
										//aquí dintre es poden activar botons només per registrats etc...
										//mostrar seccions privades etc...
										//tancam la finestra de login
										finestraLogin.hide()
										//ex: es mostra un botó
										Ext.getCmp('capesPrivades').setVisible(true);
									});
								},
								//si les dades son incorrectes
								failure: function(form, action){
									if (action.failureType == 'server') {
										var data = Ext.util.JSON.decode(action.response.responseText);
										//es mostra el missatge d'error del php
										Ext.Msg.alert('Errada', data.errors.reason, function(){
										});
									}
									//si no es pot establir la connexió
									else {
										Ext.Msg.alert('Error!', 'El servidor no pot establir la connexió ' );
									}
									//es borra el formulari
									formulari.getForm().reset();
								}
							});
						}
					}
			
			});
		//es crea la finestra del login
		finestraLogin = new Ext.Window({
			layout: 'fit',
			id:'finestraLogin',
			name:'finestraLogin',
			title: 'Login',
			closeAction: 'hide',
			modal: true,
			closable: true,
			width:400,
			height:200,
			x: ((screen.width-0)-500)/2,
			y: 150,
			//s'afegeix sa toolbar i el formulari
			bbar:tlbBottomLogin,
			items:[formulari]
		});	
	}
	//es mostra la finestra
	finestraLogin.show()
}
