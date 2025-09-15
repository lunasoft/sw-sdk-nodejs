# SDK Node.js

[![SW sapien](https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/68712/SW_smarter-Servicios_web.png)](http://sw.com.mx/)

Librería **Node.js** para el consumo de los servicios de **SW sapien®**.

## Contenido

- [Compatibilidad](#Compatibilidad)
- [Dependencias](#Dependencias)
- [Documentación](#Documentación)
- [Instalación](#Instalación)
- [Implementación](#Implementación)

---

### Compatibilidad

- CFDI 4.0
- Node v6.11.0 o superior

---

### Dependencias

- [Chai](http://chaijs.com/) y [Mocha](https://mochajs.org/) para pruebas unitarias.
- [npm](https://www.npmjs.com/) para descargar nuestro SDK.

---

### Documentación

- [Documentación oficial de servicios](https://developers.sw.com.mx/)
- [API Reference](https://documenter.getpostman.com/view/15933150/2s9YXnyyKn)

---

### Instalación

Para usar el SDK y consumir los servicios **REST** que **SW sapien®** provee, primero es necesario tener instalado **Node.js®** y posteriormente instalar el manejador de paquetes **npm**.

#### Instalar Node

- Paso 1:
  Dirigirnos a la siguiente página web https://nodejs.org/en/download/current
- Paso 2:
  Seleccionar la versión más reciente acorde al sistema operativo que se tenga y hacer clic para comenzar la descarga
- Paso 3:
  Ejecutar el archivo descargado y seguir los pasos de instalación

#### Preparar nuestro ambiente de desarrollo

- Paso 1:
  Dentro de la carpeta de tu proyecto abrir **CMD** o **PowerShell** y escribir lo siguiente:

```pwsh
npm install --save sw-sdk-nodejs
```

De esta manera instala las dependencias necesarias para usar el **SDK**.

---

### Implementación

La librería cuenta con los servicios:

- [Autenticación](#Autenticación)
- [Timbrado](#Timbrado)
- [Timbrado Retenciones](#Timbrado-Retenciones)
- [Cancelación](#Cancelación)
- [Cancelación Retenciones](#Cancelación-Retenciones)
- [Saldo/Timbres](#Saldo/Timbres)

---

## Autenticación

<details>
<summary>
Autenticación 
</summary>

Método que permite obtener un **token de autenticación** indispensable para consumir los servicios de **SW sapien®**.

> [!IMPORTANT]
> Para utilizar este servicio es necesario contar con un **usuario** y **contraseña** válidos proporcionados por SW.

> [!NOTE]
> El token de autenticación generado tiene un vigencia de 2 hrs.

Este método recibe los siguientes parámetros:

- URL de servicios SW
- Usuario y Contraseña

**Obtener Token**

```js
const Authentication = require("sw-sdk-nodejs").Authentication;

const params = {
  url: "https://services.test.sw.com.mx",
  user: "demo",
  password: "123456789"
};

const auth = Authentication.auth(params);

auth.Token((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

## Timbrado

<details>
<summary>
Timbrado CFDI
</summary>

Método que recibe el contenido de un **XML** previamente sellado en formato **string** o **base64**, si la factura y las credenciales del usuario son correctos devuelve el complemento timbre en un string (**TFD**), en caso contrario lanza una excepción.

> [!IMPORTANT]
> El envío en formato **base64** es opcional, para utilizarlo se debe indicar con _true_, por defecto se tomará el valor _false_.

Este método recibe los siguientes parámetros:

- Archivo en formato **string** o **base64**
- Usuario y Contraseña o Token
- URL de servicios SW

**Ejemplo de consumo de la librería para Timbrado CFDI en formato string utilizando usuario y contraseña**

```js
const fs = require("fs");
const path = require("path");
const StampService = require("sw-sdk-nodejs").StampService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "fileSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

StampService.Set(params).StampV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Timbrado CFDI en formato string utilizando token**

```js
const fs = require("fs");
const path = require("path");
const StampService = require("sw-sdk-nodejs").StampService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "fileSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

StampService.Set(params).StampV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Timbrado CFDI en base64 utilizando token**

```js
const fs = require("fs");
const path = require("path");
const StampService = require("sw-sdk-nodejs").StampService;

const isBase64 = true;
const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "fileSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");
const xmlB64 = Buffer.from(xml, "utf8").toString("base64");

StampService.Set(params).StampV1(xmlB64, (err, res) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log(res);
    }
  }, isBase64);
```

**Funciones disponibles**
- StampV1(xml, base64)
- StampV2(xml, base64)
- StampV3(xml, base64)
- StampV4(xml, base64)

</details>

<details>
<summary>
Emisión Timbrado
</summary>

Método que realiza el sellado y timbrado de un comprobante CFDI 4.0, recibe el contenido de un **XML** en formato **string** o **base64**, si la factura y las credenciales del usuario son correctos devuelve el complemento timbre en un string (**TFD**), en caso contrario lanza una excepción.

> [!IMPORTANT]
> El envío en formato **base64** es opcional, para utilizarlo se debe indicar con _true_, por defecto se tomará el valor _false_.

Este método recibe los siguientes parámetros:

- Archivo en formato **string** o **base64**
- Usuario y Contraseña o Token
- URL de servicios SW

**Ejemplo de consumo de la librería para Emisión Timbrado en formato string utilizando usuario y contraseña**

```js
const fs = require("fs");
const path = require("path");
const IssueService = require("sw-sdk-nodejs").IssueService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "file.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

IssueService.Set(params).IssueV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Emisión Timbrado en formato string utilizando token**

```js
const fs = require("fs");
const path = require("path");
const IssueService = require("sw-sdk-nodejs").IssueService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "file.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

IssueService.Set(params).IssueV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Emisión Timbrado en base64 utilizando token**

```js
const fs = require("fs");
const path = require("path");
const IssueService = require("sw-sdk-nodejs").IssueService;

const isBase64 = true;
const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "file.xml");
const xml = fs.readFileSync(xmlPath, "utf8");
const xmlB64 = Buffer.from(xml, "utf8").toString("base64");

IssueService.Set(params).IssueV1(xmlB64, (err, res) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log(res);
    }
  }, isBase64);
```

**Funciones disponibles**
- IssueV1(xml, base64)
- IssueV2(xml, base64)
- IssueV3(xml, base64)
- IssueV4(xml, base64)

</details>

<details>
<summary>
Emisión Timbrado JSON
</summary>

Método que realiza el sellado y timbrado de un comprobante CFDI desde JSON.

Este método recibe los siguientes parámetros:

- Archivo JSON con la estructura del CFDI
- Usuario y Contraseña o Token
- URL de servicios SW

**Ejemplo de consumo de la librería para Timbrado JSON utilizando usuario y contraseña**

```js
const IssueJsonService = require("sw-sdk-nodejs").IssueJsonService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx"
};

const json = {
  "version": "4.0",
  "fecha": "2024-01-01T12:00:00",
  "emisor": {
    "rfc": "EKU9003173C9",
    "nombre": "ESCUELA KEMPER URGATE",
    "regimenFiscal": "601"
  },
  "receptor": {
    "rfc": "URE180429TM6",
    "nombre": "UNIVERSIDAD REGIOMONTANA",
    "usoCFDI": "G03"
  },
  "conceptos": [
    {
      "claveProdServ": "01010101",
      "cantidad": 1,
      "claveUnidad": "H87",
      "unidad": "Pieza",
      "descripcion": "Producto de prueba",
      "valorUnitario": 100.00,
      "importe": 100.00
    }
  ],
  "subTotal": 100.00,
  "moneda": "MXN",
  "total": 116.00,
  "tipoDeComprobante": "I",
  "formaPago": "01",
  "metodoPago": "PUE",
  "lugarExpedicion": "06400"
};

IssueJsonService.Set(params).IssueJsonV1(json, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Timbrado JSON utilizando token**

```js
const IssueJsonService = require("sw-sdk-nodejs").IssueJsonService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const json = {
  "version": "4.0",
  "fecha": "2024-01-01T12:00:00",
  "emisor": {
    "rfc": "EKU9003173C9",
    "nombre": "ESCUELA KEMPER URGATE",
    "regimenFiscal": "601"
  },
  "receptor": {
    "rfc": "URE180429TM6",
    "nombre": "UNIVERSIDAD REGIOMONTANA",
    "usoCFDI": "G03"
  },
  "conceptos": [
    {
      "claveProdServ": "01010101",
      "cantidad": 1,
      "claveUnidad": "H87",
      "unidad": "Pieza",
      "descripcion": "Producto de prueba",
      "valorUnitario": 100.00,
      "importe": 100.00
    }
  ],
  "subTotal": 100.00,
  "moneda": "MXN",
  "total": 116.00,
  "tipoDeComprobante": "I",
  "formaPago": "01",
  "metodoPago": "PUE",
  "lugarExpedicion": "06400"
};

IssueJsonService.Set(params).IssueJsonV1(json, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Funciones disponibles**
- IssueJsonV1(json)
- IssueJsonV2(json)
- IssueJsonV3(json)
- IssueJsonV4(json)

</details>

## Timbrado V4

<details>
<summary>
Timbrado CFDI V4
</summary>

Método que recibe el contenido de un **XML** previamente sellado en formato **string** o **base64** con funcionalidades adicionales como customId, PDF y envio por email.

> [!IMPORTANT]
> El envío en formato **base64** es opcional, para utilizarlo se debe indicar con _true_, por defecto se tomará el valor _false_.

Este método recibe los siguientes parámetros:

- Archivo en formato **string** o **base64**
- Usuario y Contraseña o Token
- URL de servicios SW
- Opciones adicionales (customId, pdf, email)

**Ejemplo de consumo de la librería para Timbrado CFDI V4 con todas las opciones**

```js
const fs = require("fs");
const path = require("path");
const StampServiceV4 = require("sw-sdk-nodejs").StampServiceV4;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "fileSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

const customServiceV4 = {
  customId: "FACT-2024-001",
  pdf: true,
  email: ["test@example.com", "admin@example.com"]
};

StampServiceV4.Set(params).ServiceV4StampV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
}, false, customServiceV4);
```

**Funciones disponibles**
- ServiceV4StampV1(xml, base64, customServiceV4)
- ServiceV4StampV2(xml, base64, customServiceV4)
- ServiceV4StampV3(xml, base64, customServiceV4)
- ServiceV4StampV4(xml, base64, customServiceV4)

**Opciones de customServiceV4**
- `customId`: Identificador personalizado (máximo 100 caracteres)
- `pdf`: Generar PDF del documento timbrado 
- `email`: Array de correos (máximo 10 correos)
</details>

<details>
<summary>
Emisión Timbrado V4
</summary>

Método que realiza el sellado y timbrado de un comprobante CFDI con funcionalidades adicionales como customId, PDF y notificaciones por email.

> [!IMPORTANT]
> El envío en formato **base64** es opcional, para utilizarlo se debe indicar con _true_, por defecto se tomará el valor _false_.

Este método recibe los siguientes parámetros:

- Archivo en formato **string** o **base64**
- Usuario y Contraseña o Token
- URL de servicios SW
- Opciones adicionales (customId, pdf, email)

**Ejemplo de consumo de la librería para Emisión Timbrado V4 con todas las opciones**

```js
const fs = require("fs");
const path = require("path");
const IssueServiceV4 = require("sw-sdk-nodejs").IssueServiceV4;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "file.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

const customServiceV4 = {
  customId: "FACT-2024-001",
  pdf: true,
  email: ["test@example.com", "admin@example.com"]
};

IssueServiceV4.Set(params).ServiceV4IssueV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
}, false, customServiceV4);
```

**Funciones disponibles**
- ServiceV4IssueV1(xml, base64, customServiceV4)
- ServiceV4IssueV2(xml, base64, customServiceV4)
- ServiceV4IssueV3(xml, base64, customServiceV4)
- ServiceV4IssueV4(xml, base64, customServiceV4)

**Opciones de customServiceV4**
- `customId`: Identificador personalizado (máximo 100 caracteres)
- `pdf`: Generar PDF del documento timbrado
- `email`: Array de correos (máximo 10 correos)

</details>

<details>
<summary>
Emisión Timbrado JSON V4
</summary>

Método que realiza el sellado y timbrado de un comprobante CFDI desde JSON con funcionalidades adicionales como customId, PDF y notificaciones por email.

Este método recibe los siguientes parámetros:

- Archivo JSON con la estructura del CFDI
- Usuario y Contraseña o Token
- URL de servicios SW
- Opciones adicionales (customId, pdf, email)

**Ejemplo de consumo de la librería para Timbrado JSON V4 con todas las opciones**

```js
const IssueJsonServiceV4 = require("sw-sdk-nodejs").IssueJsonServiceV4;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const json = {
  "version": "4.0",
  "fecha": "2024-01-01T12:00:00",
  "emisor": {
    "rfc": "EKU9003173C9",
    "nombre": "ESCUELA KEMPER URGATE",
    "regimenFiscal": "601"
  },
  "receptor": {
    "rfc": "URE180429TM6",
    "nombre": "UNIVERSIDAD REGIOMONTANA",
    "usoCFDI": "G03"
  },
  "conceptos": [
    {
      "claveProdServ": "01010101",
      "cantidad": 1,
      "claveUnidad": "H87",
      "unidad": "Pieza",
      "descripcion": "Producto de prueba",
      "valorUnitario": 100.00,
      "importe": 100.00
    }
  ],
  "subTotal": 100.00,
  "moneda": "MXN",
  "total": 116.00,
  "tipoDeComprobante": "I",
  "formaPago": "01",
  "metodoPago": "PUE",
  "lugarExpedicion": "06400"
};

const customServiceV4 = {
  customId: "FACT-2024-001",
  pdf: true,
  email: ["test@example.com", "admin@example.com"]
};

IssueJsonServiceV4.Set(params).ServiceV4IssueJsonV1(json, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
}, customServiceV4);
```

**Funciones disponibles**
- ServiceV4IssueJsonV1(json, customServiceV4)
- ServiceV4IssueJsonV2(json, customServiceV4)
- ServiceV4IssueJsonV3(json, customServiceV4)
- ServiceV4IssueJsonV4(json, customServiceV4)

**Opciones de customServiceV4**
- `customId`: Identificador personalizado (máximo 100 caracteres)
- `pdf`: Generar PDF del documento timbrado
- `email`: Array de correos (máximo 10 correos)

</details>

> [!NOTE]
> Existen varias versiones de respuesta, las cuales son las siguientes:

| Versión | Respuesta                                            |
| ------- | ---------------------------------------------------- |
| V1      | Devuelve el timbre fiscal digital                    |
| V2      | Devuelve el timbre fiscal digital y el CFDI timbrado |
| V3      | Devuelve el CFDI timbrado                            |
| V4      | Devuelve todos los datos del timbrado                |

> [!TIP]
> Para mayor referencia de estas versiones de respuesta, favor de visitar el siguiente [link](https://developers.sw.com.mx/knowledge-base/versiones-de-respuesta-timbrado/).

---

## Timbrado Retenciones

<details>
<summary>
Timbrado Retenciones
</summary>

Método que recibe el contenido de un **XML de retenciones** previamente sellado en formato **string**, si la retención y las credenciales del usuario son correctos devuelve el complemento timbre en un string (**TFD**), en caso contrario lanza una excepción.


Este método recibe los siguientes parámetros:

- Archivo en formato **string** o **base64**
- Usuario y Contraseña o Token
- URL de servicios SW

**Ejemplo de consumo de la librería para Timbrado Retenciones en formato string utilizando usuario y contraseña**

```js
const fs = require("fs");
const path = require("path");
const StampRetentionService = require("sw-sdk-nodejs").StampRetentionService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "fileRetentionSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

StampRetentionService.Set(params).StampV3(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Timbrado Retenciones en formato string utilizando token**

```js
const fs = require("fs");
const path = require("path");
const StampRetentionService = require("sw-sdk-nodejs").StampRetentionService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "fileRetentionSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

StampRetentionService.Set(params).StampV3(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Timbrado Retenciones en base64 utilizando token**

```js
const fs = require("fs");
const path = require("path");
const StampRetentionService = require("sw-sdk-nodejs").StampRetentionService;

const isBase64 = true;
const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx"
};

const xmlPath = path.join(__dirname, "fileRetentionSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");
const xmlB64 = Buffer.from(xml, "utf8").toString("base64");

StampRetentionService.Set(params).StampV3(xmlB64, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
}, isBase64);
```

</details>

---

## Cancelación

Método que realiza la cancelación de un documento XML, se puede realizar por varios métodos:

<details>
<summary>
Cancelación por CSD
</summary>

Método que realiza la cancelación mediante los CSD.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW
- UUID
- Password (CSD)
- RFC emisor
- Archivo CSD en **base64**
- Archivo KEY en **base64**
- Motivo
- Folio Sustitución (`null` si el motivo de cancelación es diferente de `01`)

**Ejemplo de consumo de la librería para Cancelación por CSD utilizando usuario y contraseña**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordCer: "123456789",
  rfc: "LAN7008173R5",
  b64Cer: "MIIFxTCCA62...",
  b64Key: "MIIFDjBABgk...",
  motivo: "02",
  folioSustitucion: null
};

CancelationService.Set(params).CancelationByCSD((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Cancelación por CSD utilizando token**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordCer: "123456789",
  rfc: "LAN7008173R5",
  b64Cer: "MIIFxTCCA62...",
  b64Key: "MIIFDjBABgk...",
  motivo: "02",
  folioSustitucion: null
};

CancelationService.Set(params).CancelationByCSD((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

<details>
<summary>
Cancelación por PFX
</summary>

Método para realizar la cancelación mediante el PFX.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW
- Archivo PFX en **base64**
- RFC emisor
- Password (PFX)
- UUID
- Motivo
- Folio Sustitución (`null` si el motivo de cancelación es diferente de `01`)

**Ejemplo de consumo de la librería para Cancelación por PFX utilizando usuario y contraseña**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordPfx: "123456789",
  rfc: "LAN7008173R5",
  b64Pfx: "MIIL8QIBAzCCC...",
  motivo: "02",
  folioSustitucion: null
};

CancelationService.Set(params).CancelationByPFX((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Cancelación por PFX utilizando token**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordPfx: "123456789",
  rfc: "LAN7008173R5",
  b64Pfx: "MIIL8QIBAzCCC...",
  motivo: "02",
  folioSustitucion: null
};

CancelationService.Set(params).CancelationByPFX((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

<details>
<summary>
Cancelación por XML
</summary>

Método para realizar la cancelación mediante un XML de cancelación sellado con los UUID a cancelar.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW
- XML sellado con los UUID a cancelar.

**Ejemplo de un XML de cancelación**

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
> [!IMPORTANT]
> De utilizar el motivo de cancelación `01` se debe añadir el atributo `FolioSustitucion` dentro del Nodo `<Folio>` del xml de cancelación.

**Ejemplo del nodo `<Folio>` con motivo de cancelación `01`:**

```xml
<Folios>
	<Folio UUID="b374db50-a0a3-4028-9d01-32b93e2b925a" Motivo="01" FolioSustitucion="b3641a4b-7177-4323-aaa0-29bd34bf1ff8" />
</Folios>
```

**Ejemplo de consumo de la librería para Cancelación por XML con usuario y contraseña**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  xml: '<?xml version="1.0" encoding="utf-8"?><Cancelacion xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"...'
};

CancelationService.Set(params).CancelationByXML((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Cancelación por XML con token**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  xml: '<?xml version="1.0" encoding="utf-8"?><Cancelacion xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"...'
};

CancelationService.Set(params).CancelationByXML((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

<details>
<summary>
Cancelación por UUID
</summary>

Método para realizar la cancelación mediante el UUID del comprobante a cancelar.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW
- RFC emisor
- UUID
- Motivo
- Folio Sustitución (`null` si el motivo de cancelación es diferente de `01`)

**Ejemplo de consumo de la librería para Cancelación por UUID con usuario y contraseña**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  rfc: "EKU9003173C9",
  uuid: "478569b5-c323-4dc4-91cf-b6e9f6979527",
  motivo: "02",
  folioSustitucion: null
};

CancelationService.Set(params).CancelationByUUID((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Cancelación por UUID con token**

```js
const CancelationService = require("sw-sdk-nodejs").CancelationService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  rfc: "EKU9003173C9",
  uuid: "478569b5-c323-4dc4-91cf-b6e9f6979527",
  motivo: "02",
  folioSustitucion: null
};

CancelationService.Set(params).CancelationByUUID((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

#### Códigos de respuesta de folios de cancelación

| Código | Mensaje                                   | Descripción                                                                                                                                                                                                                                                  |
| ------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 201    | Solicitud de cancelación exitosa          | Se considera una solicitud de cancelación exitosa, sin embargo esto no asegura su cancelación                                                                                                                                                                |
| 202    | Folio Fiscal Previamente Cancelado        | Se considera solicitud de cancelación previamente enviada. Estatus Cancelado ante el SAT                                                                                                                                                                     |
| 203    | Folio Fiscal No Correspondiente al Emisor |                                                                                                                                                                                                                                                              |
| 204    | Folio Fiscal No Aplicable a Cancelación   |                                                                                                                                                                                                                                                              |
| 205    | Folio Fiscal No Existente                 | El SAT da una prórroga de 48 hrs para que el comprobante aparezca con estatus Vigente posterior al envío por parte del Proveedor de Certificación de CFDI. Puede que algunos comprobantes no aparezcan al momento, es necesario esperar por lo menos 48 hrs. |

> [!TIP]
> Para mayor referencia de estas respuestas, puedes visitar el siguiente [link](https://developers.sw.com.mx/knowledge-base/cancelacion-retenciones-cfdi-rest/).

---

## Cancelación Retenciones

Método que realiza la cancelación de un documento XML de retenciones, se puede realizar por varios métodos:

<details>
<summary>
Cancelación Retenciones por CSD
</summary>

Método que realiza la cancelación de retenciones mediante los CSD.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW
- UUID
- Password (CSD)
- RFC emisor
- Archivo CSD en **base64**
- Archivo KEY en **base64**
- Motivo
- Folio Sustitución (`null` si el motivo de cancelación es diferente de `01`)

**Ejemplo de consumo de la librería para Cancelación Retenciones por CSD utilizando usuario y contraseña**

```js
const CancelationRetentionService = require("sw-sdk-nodejs").CancelationRetentionService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordCer: "123456789",
  rfc: "LAN7008173R5",
  b64Cer: "MIIFxTCCA62...",
  b64Key: "MIIFDjBABgk...",
  motivo: "02",
  folioSustitucion: null
};

CancelationRetentionService.Set(params).CancelationByCSD((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Cancelación Retenciones por CSD utilizando token**

```js
const CancelationRetentionService = require("sw-sdk-nodejs").CancelationRetentionService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordCer: "123456789",
  rfc: "LAN7008173R5",
  b64Cer: "MIIFxTCCA62...",
  b64Key: "MIIFDjBABgk...",
  motivo: "02",
  folioSustitucion: null
};

CancelationRetentionService.Set(params).CancelationByCSD((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

<details>
<summary>
Cancelación Retenciones por PFX
</summary>

Método para realizar la cancelación de retenciones mediante el PFX.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW
- Archivo PFX en **base64**
- RFC emisor
- Password (PFX)
- UUID
- Motivo
- Folio Sustitución (`null` si el motivo de cancelación es diferente de `01`)

**Ejemplo de consumo de la librería para Cancelación Retenciones por PFX utilizando usuario y contraseña**

```js
const CancelationRetentionService = require("sw-sdk-nodejs").CancelationRetentionService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordPfx: "123456789",
  rfc: "LAN7008173R5",
  b64Pfx: "MIIL8QIBAzCCC...",
  motivo: "02",
  folioSustitucion: null
};

CancelationRetentionService.Set(params).CancelationByPFX((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Cancelación Retenciones por PFX utilizando token**

```js
const CancelationRetentionService = require("sw-sdk-nodejs").CancelationRetentionService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  uuid: "06a46e4b-b154-4c12-bb77-f9a63ed55ff2",
  passwordPfx: "123456789",
  rfc: "LAN7008173R5",
  b64Pfx: "MIIL8QIBAzCCC...",
  motivo: "02",
  folioSustitucion: null
};

CancelationRetentionService.Set(params).CancelationByPFX((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

<details>
<summary>
Cancelación Retenciones por XML
</summary>

Método para realizar la cancelación de retenciones mediante un XML de cancelación sellado con los UUID a cancelar.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW
- XML sellado con los UUID a cancelar.

**Ejemplo de consumo de la librería para Cancelación Retenciones por XML utilizando usuario y contraseña**

```js
const CancelationRetentionService = require("sw-sdk-nodejs").CancelationRetentionService;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  xml: "<?xml version=\"1.0\" encoding=\"utf-8\"?><Cancelacion xmlns=\"http://cancelacfd.sat.gob.mx\"...>"
};

CancelationRetentionService.Set(params).CancelationByXML((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Cancelación Retenciones por XML utilizando token**

```js
const CancelationRetentionService = require("sw-sdk-nodejs").CancelationRetentionService;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  xml: "<?xml version=\"1.0\" encoding=\"utf-8\"?><Cancelacion xmlns=\"http://cancelacfd.sat.gob.mx\"...>"
};

CancelationRetentionService.Set(params).CancelationByXML((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

</details>

---

## Saldo/Timbres

<details>
<summary>
Consulta de Timbres
</summary>

Método mediante el cual puedes realizar la consulta de tu saldo para consumir los servicios de SW.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW (Para autenticación por usuario y contraseña)
- URL de servicios API 

**Ejemplo de consumo de la librería para Consulta de Timbres con usuario y contraseña**

```js
const AccountBalanceService = require("sw-sdk-nodejs").AccountBalance;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  urlApi: "https://api.test.sw.com.mx"
};

AccountBalanceService.Set(params).GetAccountBalance((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Consulta de Timbres con token**

```js
const AccountBalanceService = require("sw-sdk-nodejs").AccountBalance;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  urlApi: "https://api.test.sw.com.mx"
};

AccountBalanceService.Set(params).GetAccountBalance((err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```
</details>

<details>
<summary>
Agregar Timbres
</summary>

Método para agregar timbres a una cuenta hija o subcuenta.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW (Para autenticación por usuario y contraseña)
- URL de servicios API 
- ID del usuario al que se le agregarán los timbres
- Número de timbres a agregar
- Comentario del movimiento (opcional)

**Ejemplo de consumo de la librería para Agregar Timbres con usuario y contraseña**

```js
const AccountBalanceService = require("sw-sdk-nodejs").AccountBalance;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  urlApi: "https://api.test.sw.com.mx"
};

const idUser = "fafb2ac2-62ca-49f8-91de-14cea73b01eb";
const stampsToAdd = 1;
const comment = "Prueba JS";

AccountBalanceService.Set(params).AddStamps(idUser, stampsToAdd, comment, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Agregar Timbres con token**

```js
const AccountBalanceService = require("sw-sdk-nodejs").AccountBalance;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  urlApi: "https://api.test.sw.com.mx"
};

const idUser = "fafb2ac2-62ca-49f8-91de-14cea73b01eb";
const stampsToAdd = 1;
const comment = "Prueba JS";

AccountBalanceService.Set(params).AddStamps(idUser, stampsToAdd, comment, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```
</details>

<details>
<summary>
Eliminar Timbres
</summary>

Método para remover timbres a una cuenta hija o subcuenta.

Este método recibe los siguientes parámetros:

- Usuario y Contraseña o Token
- URL de servicios SW (Para autenticación por Usuario y Contraseña)
- URL de servicios API 
- ID del usuario al que se le eliminarán los timbres
- Número de timbres a eliminar
- Comentario del movimiento (opcional)

**Ejemplo de consumo de la librería para Eliminar Timbres con usuario y contraseña**

```js
const AccountBalanceService = require("sw-sdk-nodejs").AccountBalance;

const params = {
  user: "demo",
  password: "123456789",
  url: "https://services.test.sw.com.mx",
  urlApi: "https://api.test.sw.com.mx"
};

const idUser = "fafb2ac2-62ca-49f8-91de-14cea73b01eb";
const stampsToRemove = 1;
const comment = "Prueba JS";

AccountBalanceService.Set(params).RemoveStamps(idUser, stampsToRemove, comment, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```

**Ejemplo de consumo de la librería para Eliminar Timbres con token**

```js
const AccountBalanceService = require("sw-sdk-nodejs").AccountBalance;

const params = {
  token: "T2lYQ0t4L0R...",
  url: "https://services.test.sw.com.mx",
  urlApi: "https://api.test.sw.com.mx"
};

const idUser = "fafb2ac2-62ca-49f8-91de-14cea73b01eb";
const stampsToRemove = 1;
const comment = "Prueba JS";

AccountBalanceService.Set(params).RemoveStamps(idUser, stampsToRemove, comment, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});
```
</details>