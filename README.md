# SDK Node.JS
[![SW sapien](https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/68712/SW_smarter-Servicios_web.png)](http://sw.com.mx/)

Librería Node.JS para el comsumo de los servicios de SW sapien®.

## Contenido 

- [Compatibilidad](#Compatibilidad)
- [Dependencias](#Dependencias)
- [Documentación](#Documentación)
- [Instalación](#Instalación)
- [Implementación](#Implementación)
---


### Compatibilidad
* CFDI 4.0
* Node v6.11.0 o superior
---

### Dependencias
* [Chai](http://chaijs.com/) y [Mocha](https://mochajs.org/) Para las pruebas Unitarias
* [NPM](https://www.npmjs.com/) Para descargar nuestro SDK
---

### Documentación
* [Inicio Rápido](https://developers.sw.com.mx/knowledge-base/conoce-el-proceso-de-integracion-en-solo-7-pasos/)
* [Documentacion Oficial Servicios](http://developers.sw.com.mx)
* [API Reference](https://documenter.getpostman.com/view/15933150/2s9YXnyyKn)
---

### Instalación
Para poder hacer uso de nuestro SDK para consumir el servicio **REST** que **SmarterWeb** le provee primero es necesario tener instalado Node.js® y posteriormente instalar el manejador de paquetes **npm**.

#### Instalar Node
* Paso 1:
Dirigirnos a la siguiente pagina web https://nodejs.org/en/download/current
* Paso 2:
Seleccionar la versión más reciente de acuerdo a el sistema operativo que se tenga y dar click para comenzar la descarga
* Paso 3:
Ejecutar el archivo descargado y seguir los pasos de instalacion

#### Preparar nuestro ambiente de Desarrollo


* Paso 1:
Dentro de tu carpeta de tu proyecto abrir **CMD** o **PowerShell** y escribir lo siguiente:
```
npm install --save sw-sdk-nodejs
```
De esta manera instala las dependencias necesarias para poder usar nuestro **SDK**.

---

### Implementación
La librería cuenta con los servicios principales, Timbrado CFDI, Cancelación, Autentición.

---
## Autenticación
El servicio de Autenticación es utilizado principalmente para obtener el **token** el cual será utilizado para poder timbrar nuestro CFDI (xml) ya emitido (sellado), para poder utilizar este servicio es necesario que cuente con un **usuario** y **contraseña** para posteriormente obtenga el token, usted puede utilizar los que están en este ejemplo para el ambiente de **Pruebas**.

**Obtener Token**
```js
const Authentication = require('sw-sdk-nodejs').Authentication;

let obj = {
	url : "http://services.test.sw.com.mx",
	user: "demo",
	password: "123456789",
}

let auth = Authentication.auth(obj);

let callback = (err, data) => {
	if(err) {
		console.log(err)
	} else{
		console.log(data)
	}
};

auth.Token(callback);
```
---

## Timbrado

<details>
<summary>
Timbrado CFDI V1
</summary>

**TimbrarV1** recibe el contenido de un **XML** ya emitido (sellado) en formato **String**  ó tambien puede ser en **Base64**, posteriormente si la factura y el token son correctos devuelve el complemento timbre en un string (**TFD**), en caso contrario lanza una excepción.

Este método recibe los siguientes parámetros:
* Archivo en formato **String** ó **Base64**
* Usuario y contraseña ó Token
* Url Servicios SW

**Ejemplo de consumo de la librería para timbrar XML en formato string utilizando usuario y contraseña**
```js
const fs = require('fs');
const StampService = require('sw-sdk-nodejs').StampService;

var params = {
	user: "demo",
	password: "123456789",
	url: 'http://services.test.sw.com.mx',
};
 
fs.readFile('./file.xml', 'utf8', function(err, contents) {
	if(err) {
		let errRes = {
			status: 'error',
			message: err.message,
			messageDetail: err.message
		}
		console.log(errRes);
	} else {
		var callback = (error, data) => {
			if(error)
				console.log(error);
			else
				console.log(data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
    	stamp.StampV1(xml, callback);
	}
});
```

**Ejemplo de consumo de la librería para timbrar XML en formato string utilizando token** [¿Como obtener token?](http://developers.sw.com.mx/knowledge-base/generar-un-token-infinito/)
```js
const fs = require('fs');
const StampService = require('sw-sdk-nodejs').StampService;

var params = {
	url: 'http://services.test.sw.com.mx',
	token: 'T2lYQ0t4L...'
};

fs.readFile('./file.xml', 'utf8', function(err, contents) {
	if(err) {
		let errRes = {
			status: 'error',
			message: err.message,
			messageDetail: err.message
		}
		console.log(errRes);
	} else {
		var callback = (error, data) => {
			if(error)
				console.log(error);
			else
				console.log(data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
    	stamp.StampV2(xml, callback);
	}
});
```

**Ejemplo de consumo de la librería para timbrar XML en Base64 utilizando token**
```js
const fs = require('fs');
const StampService = require('sw-sdk-nodejs').StampService;

var params = {
	url: 'http://services.test.sw.com.mx',
	token: 'T2lYQ0t4L...'
};

fs.readFile('./file.txt', 'utf8', function(err, contents) {
	if(err) {
		let errRes = {
			status: 'error',
			message: err.message,
			messageDetail: err.message
		}
		console.log(errRes);
	} else {
		var callback = (error, data) => {
			if(error)
				console.log(error);
			else
				console.log(data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
		//Se agrega el parametro "true" para indicar que es Base64
    	stamp.StampV2(xml, callback, true);
	}
});
```
</details>

<details>
<summary>
Emisión Timbrado V1
</summary>

**Emisión Timbrado** realiza el sellado y timbrado de un comprobante CFDI 4.0. Recibe el contenido de un **XML** en formato **String**  ó tambien puede ser en **Base64**, posteriormente si la factura y el token son correctos devuelve el complemento timbre en un string (**TFD**), en caso contrario lanza una excepción.


**Ejemplo de consumo de la librería para la Emisión Timbrado XML en formato string utilizando usuario y contraseña**
```js
const fs = require('fs');
const StampService = require('sw-sdk-nodejs').StampService;

var params = {
	user: "demo",
	password: "123456789",
	url: 'http://services.test.sw.com.mx',
};
 
fs.readFile('./file.xml', 'utf8', function(err, contents) {
	if(err) {
		let errRes = {
			status: 'error',
			message: err.message,
			messageDetail: err.message
		}
		console.log(errRes);
	} else {
		var callback = (error, data) => {
			if(error)
				console.log(error);
			else
				console.log(data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
    	stamp.StampV1(xml, callback);
	}
});
```

**Ejemplo de consumo de la librería para la Emisión Timbrado XML en formato string utilizando token**
```js
const fs = require('fs');
const StampService = require('sw-sdk-nodejs').StampService;

var params = {
	url: 'http://services.test.sw.com.mx',
	token: 'T2lYQ0t4L...'
};
fs.readFile('./file.xml', 'utf8', function(err, contents) {
	if(err) {
		let errRes = {
			status: 'error',
			message: err.message,
			messageDetail: err.message
		}
		console.log(errRes);
	} else {
		var callback = (error, data) => {
			if(error)
				console.log(error);
			else
				console.log(data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
    	stamp.StampV1(xml, callback);
	}
});
```

**Ejemplo de consumo de la librería para la Emisión Timbrado XML en Base64 utilizando token**
```js
const fs = require('fs');
const StampService = require('sw-sdk-nodejs').StampService;

var params = {
	url: 'http://services.test.sw.com.mx',
	token: 'T2lYQ0t4L...'
};

fs.readFile('./file.txt', 'utf8', function(err, contents) {
	if(err) {
		let errRes = {
			status: 'error',
			message: err.message,
			messageDetail: err.message
		}
		console.log(errRes);
	} else {
		var callback = (error, data) => {
			if(error)
				console.log(error);
			else
				console.log(data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
		//Se agrega el parametro "true" para indicar que es Base64
    	stamp.StampV1(xml, callback, true);
	}
});
```

</details>

:pushpin: ***NOTA:*** Existen varias versiones de respuesta, las cuales son las siguientes:

| Version |                         Respuesta                             | 
|---------|---------------------------------------------------------------|
|  V1     | Devuelve el timbre fiscal digital                             | 
|  V2     | Devuelve el timbre fiscal digital y el CFDI timbrado          | 
|  V3     | Devuelve el CFDI timbrado                                     | 
|  V4     | Devuelve todos los datos del timbrado                         |

Para mayor referencia de estas versiones de respuesta, favor de visitar el siguiente [link](https://developers.sw.com.mx/knowledge-base/versiones-de-respuesta-timbrado/).

---

## Cancelación
Este servicio se utiliza para cancelar documentos xml y se puede hacer mediante varios métodos **Cancelación CSD**, **Cancelación PFX**, **Cancelacion por XML** y **Cancelación UUID**.

<details>
<summary>
Cancelación por CSD
</summary>

Como su nombre lo indica, este método realiza la cancelacion mediante los CSD.

Este método recibe los siguientes parámetros:
* Token
* Url Servicios SW
* Archivo CSD en **Base64**
* Archivo KEY en **Base64**
* RFC emisor
* Password (CSD)
* UUID
* Motivo
* Folio Sustitución

**Ejemplo de consumo de la librería para cancelar con CSD"**
```js
const CancelationService = require('sw-sdk-nodejs').CancelationService;
var params = {
    url: 'http://services.test.sw.com.mx',  
	token: 'T2lYQ0t4L...',
    uuid: '06a46e4b-b154-4c12-bb77-f9a63ed55ff2',
    password: '123456789',
    rfc: 'LAN7008173R5',
    b64Cer: 'MIIFxTCCA62...',
    b64Key: 'MIIFDjBABgk...',
	motivo: '02'
};

var callback = (err, data) => {
	if(err) {
		console.log("error", err)
	} else {
		console.log(data)
	}
};

var cancelation = CancelationService.Set(params);
cancelation.CancelationByCSD(callback);
```
</details>

<details>
<summary>
Cancelación por PFX
</summary>

Como su nombre lo indica, este método realiza la cancelacion mediante el PFX.

Este método recibe los siguientes parámetros:
* Token
* Url Servicios SW
* Archivo PFX en **Base64**
* RFC emisor
* Password (CSD)
* UUID
* Motivo
* Folio Sustitución

**Ejemplo de consumo de la libreria para cancelar con PFX**
```js
var params = {
		url: 'http://services.test.sw.com.mx',
		token: 'T2lYQ0t4L...',
    	uuid: '06a46e4b-b154-4c12-bb77-f9a63ed55ff2',
		password: '123456789',
    	rfc: 'LAN7008173R5',
		b64Pfx: 'MIIL8QIBAzCCC...',
		motivo: '02'
};

	var callback = (err, data) => {
		if(err) {
			console.log("error", err)
		} else {
			console.log(data)
		}
	};

	var cancelation = CancelationService.Set(params);
	cancelation.CancelationByPFX(callback);
```
</details>

<details>
<summary>
Cancelación por XML
</summary>

Como su nombre lo indica, este método realiza la cancelación mediante el XML sellado con los UUID a cancelar.

Este método recibe los siguientes parámetros:
* Token 
* Url Servicios SW
* XML sellado con los UUID a cancelar.

**Ejemplo de XML para Cancelar**
```xml
<Cancelacion xmlns="http://cancelacfd.sat.gob.mx"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" Fecha="2023-11-27T18:15:28" RfcEmisor="EKU9003173C9">
    <Folios>
        <Folio UUID="fe4e71b0-8959-4fb9-8091-f5ac4fb0fef8" Motivo="02" FolioSustitucion=""/>
    </Folios>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
            <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />
            <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
            <Reference URI="">
                <Transforms>
                    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                </Transforms>
                <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
                <DigestValue>XEdUtCptjdlz9DsYAP7nnU6MytU=</DigestValue>
            </Reference>
        </SignedInfo>
        <SignatureValue>ZnWh91e5tUc4/t1ZWnb3yOgB8zuCXNPioND+rv6aLOEwIw26/8sYYb+GT4wgyqlc09wOs32XTUwWoGQwtWMG8Euqq+4xJyobWvPCsX6CiURvD/Pd33xgkH92A0AGQxEMYGVT7wK+GFS2gDTYEYAXvZqzCe6+rXnlQvHML0TOOmhVu/wc8YrCbGt4z/F5sRxhjpa0eqwFEq4RmB4nkWjcD3Pnudn3XAI5NHIiOd8KVGVcDR+LvYvKj7h+18WxZgujpggYjbFN79i1jEsAEPDfgryUdTvjDw+KC7Mg+/ge6pssH42buEMIwVE4VX9Y3NtWSGTwdIK/8pxXk+Y5wyR6Gg==</SignatureValue>
        <KeyInfo>
            <X509Data>
                <X509IssuerSerial>
                    <X509IssuerName>OID.1.2.840.113549.1.9.2=responsable: ACDMA-SAT, OID.2.5.4.45=2.5.4.45, L=COYOACAN, S=CIUDAD DE MEXICO, C=MX, PostalCode=06370, STREET=3ra cerrada de cadiz, E=oscar.martinez@sat.gob.mx, OU=SAT-IES Authority, O=SERVICIO DE ADMINISTRACION TRIBUTARIA, CN=AC UAT</X509IssuerName>
                    <X509SerialNumber>292233162870206001759766198444326234574038512436</X509SerialNumber>
                </X509IssuerSerial>
                <X509Certificate>MIIFuzCCA6OgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0MzQwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MTk0NDE0WhcNMjMwNjE3MTk0NDE0WjCB4jEnMCUGA1UEAxMeRVNDVUVMQSBLRU1QRVIgVVJHQVRFIFNBIERFIENWMScwJQYDVQQpEx5FU0NVRUxBIEtFTVBFUiBVUkdBVEUgU0EgREUgQ1YxJzAlBgNVBAoTHkVTQ1VFTEEgS0VNUEVSIFVSR0FURSBTQSBERSBDVjElMCMGA1UELRMcRUtVOTAwMzE3M0M5IC8gWElRQjg5MTExNlFFNDEeMBwGA1UEBRMVIC8gWElRQjg5MTExNk1HUk1aUjA1MR4wHAYDVQQLExVFc2N1ZWxhIEtlbXBlciBVcmdhdGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCN0peKpgfOL75iYRv1fqq+oVYsLPVUR/GibYmGKc9InHFy5lYF6OTYjnIIvmkOdRobbGlCUxORX/tLsl8Ya9gm6Yo7hHnODRBIDup3GISFzB/96R9K/MzYQOcscMIoBDARaycnLvy7FlMvO7/rlVnsSARxZRO8Kz8Zkksj2zpeYpjZIya/369+oGqQk1cTRkHo59JvJ4Tfbk/3iIyf4H/Ini9nBe9cYWo0MnKob7DDt/vsdi5tA8mMtA953LapNyCZIDCRQQlUGNgDqY9/8F5mUvVgkcczsIgGdvf9vMQPSf3jjCiKj7j6ucxl1+FwJWmbvgNmiaUR/0q4m2rm78lFAgMBAAGjHTAbMAwGA1UdEwEB/wQCMAAwCwYDVR0PBAQDAgbAMA0GCSqGSIb3DQEBCwUAA4ICAQBcpj1TjT4jiinIujIdAlFzE6kRwYJCnDG08zSp4kSnShjxADGEXH2chehKMV0FY7c4njA5eDGdA/G2OCTPvF5rpeCZP5Dw504RZkYDl2suRz+wa1sNBVpbnBJEK0fQcN3IftBwsgNFdFhUtCyw3lus1SSJbPxjLHS6FcZZ51YSeIfcNXOAuTqdimusaXq15GrSrCOkM6n2jfj2sMJYM2HXaXJ6rGTEgYmhYdwxWtil6RfZB+fGQ/H9I9WLnl4KTZUS6C9+NLHh4FPDhSk19fpS2S/56aqgFoGAkXAYt9Fy5ECaPcULIfJ1DEbsXKyRdCv3JY89+0MNkOdaDnsemS2o5Gl08zI4iYtt3L40gAZ60NPh31kVLnYNsmvfNxYyKp+AeJtDHyW9w7ftM0Hoi+BuRmcAQSKFV3pk8j51la+jrRBrAUv8blbRcQ5BiZUwJzHFEKIwTsRGoRyEx96sNnB03n6GTwjIGz92SmLdNl95r9rkvp+2m4S6q1lPuXaFg7DGBrXWC8iyqeWE2iobdwIIuXPTMVqQb12m1dAkJVRO5NdHnP/MpqOvOgLqoZBNHGyBg4Gqm4sCJHCxA1c8Elfa2RQTCk0tAzllL4vOnI1GHkGJn65xokGsaU4B4D36xh7eWrfj4/pgWHmtoDAYa8wzSwo2GVCZOs+mtEgOQB91/g==</X509Certificate>
            </X509Data>
        </KeyInfo>
    </Signature>
</Cancelacion>
```
Para caso de motivo 01 deberá añadir el atributo "FolioSustitucion" dentro del Nodo <Folio>

Ejemplo de nodo Folio: 
```xml
<Folios>
	<Folio UUID="b374db50-a0a3-4028-9d01-32b93e2b925a" Motivo="01" FolioSustitucion="b3641a4b-7177-4323-aaa0-29bd34bf1ff8" />
</Folios>
```

**Ejemplo de consumo de la librería para cancelar con XML**
```js
var params = {
	url: 'http://services.test.sw.com.mx',
	token: 'T2lYQ0t4L...',
	xml: '<?xml version="1.0" encoding="utf-8"?><Cancelacion xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"...'
};

var callback = (err, data) => {
	if(err) {
		console.log("error", err)
	} else {
		console.log(data)
	}
};

var cancelation = CancelationService.Set(params);
cancelation.CancelationByXML(callback);
```

</details>

<details>
<summary>
Cancelación por UUID
</summary>

Como su nombre lo indica, este método realiza la cancelacion mediante el UUID a cancelar.

Este método recibe los siguientes parámetros:
* Token
* Url Servicios SW
* RFC emisor
* UUID
* Motivo
* Folio Sustitución

**Ejemplo de consumo de la libreria para cancelar con UUID**
```js
var params = {
	url: 'http://services.test.sw.com.mx',
	token: 'T2lYQ0t4L...',
	rfc: 'EKU9003173C9',
	uuid: '478569b5-c323-4dc4-91cf-b6e9f6979527',
	motivo: '02',
	folioSustitucion: null
};

var callback = (err, data) => {
	if(err) {
		console.log("error", err)
	} else {
		console.log(data)
	}
};

var cancelation = CancelationService.Set(params);
cancelation.CancelationByXML(callback);
```
</details>


#### Códigos de respuesta de folios de cancelación ####
| Código  | Mensaje | Descripcion |
| ------------- | ------------- | ------------- |
| 201  | Solicitud de cancelación exitosa | Se considera una solicitud de cancelación exitosa, sin embargo esto no asegura su cancelación |
| 202 |  Folio Fiscal Previamente Cancelado | Se considera solicitud de cancelación previamente enviada. Estatus Cancelado ante el SAT |
| 203 | Folio Fiscal No Correspondiente al Emisor | |
| 204 | Folio Fiscal No Aplicable a Cancelación  | |
| 205 | Folio Fiscal No Existente | El SAT da una prorroga de 48 hrs para que el comprobante aparezca con estatus Vigente posterior al envió por parte del Proveedor de Certificación de CFDI. Puede que algunos comprobantes no aparezcan al momento, es necesario esperar por lo menos 48 hrs.|

Para mayor referencia de estas respuesta, favor de visitar el siguiente [link](https://developers.sw.com.mx/knowledge-base/cancelacion-cfdi/).

---
## Consulta de Saldos ##

Método mediante el cual puedes realizar la consulta de tu saldo para consumir los servicios de SW.

Este método recibe los siguientes parametros:
* Token
* Url Servicios SW

Este servicio recibe el token y genera los elementos que componen la consulta de saldos:

* ID saldo cliente
* ID cliente usuario
* Saldo timbres
* Timbres utilizados
* Fecha de expiracion
* Ilimitado
* Timbres asignados

**Ejemplo de consumo de la libreria para consultar el saldo**
```js
const AccountBalanceService = require('sw-sdk-nodejs').AccountBalance;

var params = {
	url: 'http://services.test.sw.com.mx',
	token: 'T2lYQ0t4L...',
};

var callback = (err, data) => {
	if(err) {
		console.log(err)
	} else {
		console.log(data);
	}
};

var accountBalance = AccountBalanceService.Set(params);
accountBalance.GetAccountBalance(callback);
```


