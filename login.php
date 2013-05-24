<?php
//ens connectem a la base de dades 
include 'conect.php';
mysql_query("SET NAMES 'utf8'");

//es fa la consulta a la BD amb les dades rebudes del formulari
$sql = "SELECT idUsuari, nomUsuari, cognomsUsuari from usuaris WHERE nomUsuari= '".$_GET["Usuari"]."' and passUsuari = '".$_GET["Password"]."' ";
	//error al realitzar la petició, retorna success=false i  missatge d'error
	if (!$result = mysql_query($sql)) {
		echo '{success:false, msg: "Error al realizar la petició"}';
	}
	//si la petició es fa correctament
	else{
		$row = mysql_fetch_object($result);
		//si s'han trobat resultats, success=true, retornem les dades de l'usuari i missatge de benvinguda
		if ($row){
			echo '{success:true, nom:"'.$row->nomUsuari.'", cognoms:"'.$row->cognomsUsuari.'", idUsuari:"'.$row->idUsuari.'", msg: "Benvingut:   '.$row->nomUsuari.'"}';
		}
		//si no es troben resultats, success=false i missatge error
		else{
			echo '{"success": false, "errors":{"reason": "Usuari o Clau Incorrecta!!!"}}';
		}
	}	
?>