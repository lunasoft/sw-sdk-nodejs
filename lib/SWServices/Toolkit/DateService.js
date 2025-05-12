const fs = require('fs');
const { DOMParser, XMLSerializer } = require('xmldom');
const xpath = require('xpath');

class DateService {
    /**
     * Actualiza la Fecha en el XML.
     * @param {string} xmlOrPath - XML o ruta al archivo XML
     * @param {(err: Error|null, updatedXml?: string)=>void} callback
     */
    static updateDate(xmlPath, callback) {
        process.nextTick(() => {
            try {
                if (!fs.existsSync(xmlPath)) {
                    throw new Error(`El archivo no existe: ${xmlPath}`);
                }
                const xmlString = fs.readFileSync(xmlPath, 'utf8');
                const doc = new DOMParser().parseFromString(xmlString, 'text/xml');
                const comprobante = xpath.select1("//*[local-name()='Comprobante']", doc);
                if (!comprobante) throw new Error('No se encontró el nodo Comprobante');

                const now = new Date();
                const pad = n => n.toString().padStart(2, '0');
                const fecha =
                    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
                    `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
                comprobante.setAttribute('Fecha', fecha);

                const updatedXml = new XMLSerializer().serializeToString(doc);
                callback(null, updatedXml);
            } catch (err) {
                callback(err);
            }
        });
    }
}

module.exports = DateService;
