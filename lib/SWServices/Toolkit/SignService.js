const fs = require('fs');
const { DOMParser, XMLSerializer } = require('xmldom');
const xpath = require('xpath');
const forge = require('node-forge');

class SignService {
    /**
     * Sella un XML haciendo uso del archivo .pfx y la cadena original
     * @param {Object} params
     * @param {string} params.xmlPath - xmlPath: Ruta al XML a sellar
     * @param {string} params.pfxPath - pfxPath: Ruta al archivo .pfx
     * @param {string} params.pfxPassword - pfxPassword: Contraseña del .pfx
     * @param {string} params.originalChain- originalChain: O bien el contenido de la cadena original, 
     * @param {(err: Error|null, result?: {status:string, sello:string, xmlSellado:string})=>void} callback
     */
    static obtenerSello(params, callback) {
        process.nextTick(() => {
            try {
                ['xmlPath', 'pfxPath'].forEach(k => {
                    if (!params[k]) throw new Error(`Falta el parámetro: ${k}`);
                    if (!fs.existsSync(params[k])) throw new Error(`El archivo no existe: ${params[k]}`);
                });
                if (!params.pfxPassword) throw new Error('Falta el parámetro: pfxPassword');

                const { privateKeyPem, certificatePem, noCertificado } =
                    SignService._extractKeyCertNoCertFromPfx(params.pfxPath, params.pfxPassword);

                const xmlString = fs.readFileSync(params.xmlPath, 'utf8');
                const doc = new DOMParser().parseFromString(xmlString, 'text/xml');
                const comprobante = xpath.select1("//*[local-name()='Comprobante']", doc);
                if (!comprobante) throw new Error('No se encontró el nodo Comprobante');

                const now = new Date();
                const pad = n => n.toString().padStart(2, '0');
                const fecha = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
                    `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
                comprobante.setAttribute('Fecha', fecha);

                let originalChain;
                if (params.originalChain && fs.existsSync(params.originalChain)) {
                    originalChain = fs.readFileSync(params.originalChain, 'utf8');
                } else if (params.originalChain) {
                    originalChain = params.originalChain;
                } else {
                    throw new Error('Falta el parámetro: originalChain');
                }

                const fechaRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
                const chainAct = originalChain.replace(fechaRegex, fecha);

                const signer = forge.pki.privateKeyFromPem(privateKeyPem);
                const md = forge.md.sha256.create();
                md.update(chainAct, 'utf8');
                const signature = forge.util.encode64(signer.sign(md));

                comprobante.setAttribute('Sello', signature);
                comprobante.setAttribute('Certificado', certificatePem.replace(/-----.*?-----|\r?\n|\r/g, ''));
                comprobante.setAttribute('NoCertificado', noCertificado);

                const xmlSellado = new XMLSerializer().serializeToString(doc);
                callback(null, { status: 'success', sello: signature, xmlSellado });
            } catch (err) {
                callback(err);
            }
        });
    }

    /**
     * Extrae llave privada, certificado y número de certificado del .pfx.
     */
    static _extractKeyCertNoCertFromPfx(pfxPath, password) {
        const pfxBuffer = fs.readFileSync(pfxPath);
        const pfxAsn1 = forge.asn1.fromDer(pfxBuffer.toString('binary'));
        const p12 = forge.pkcs12.pkcs12FromAsn1(pfxAsn1, password);

        let keyObj, certObj;
        for (const safeContent of p12.safeContents) {
            for (const safeBag of safeContent.safeBags) {
                if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
                    keyObj = safeBag.key;
                } else if (safeBag.type === forge.pki.oids.certBag) {
                    certObj = safeBag.cert;
                }
            }
        }
        if (!keyObj || !certObj) {
            throw new Error('No se pudo extraer la llave privada o el certificado del .pfx');
        }
        const noCertificado = certObj.tbsCertificate.value[1].value;
        return {
            privateKeyPem: forge.pki.privateKeyToPem(keyObj),
            certificatePem: forge.pki.certificateToPem(certObj),
            noCertificado
        };
    }
}

module.exports = SignService;
