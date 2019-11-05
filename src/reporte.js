/*// You'll need to make your image into a Data URL
// Use http://dataurl.net/#dataurlmaker

var imgData = ''
var doc = new jsPDF()

//////// HEADER
// doc.addImage(imgData, 'JPEG', 3, 3, 95, 30)
doc.rect(130, 3, 70, 30)
doc.setFontSize(13)
doc.text(158, 10, 'FECHA')
doc.line(200, 13, 130, 13)
doc.setFontSize(18)
doc.setTextColor(95, 125, 250)
doc.text(145, 25, ' dd -mm - yyyy')
    ////////// TITULO
doc.setTextColor(0, 0, 0)
doc.setFontSize(18)
doc.text(5, 45, 'CALLE PINO SUAREZ #221 B OTE. PASANDO DONATO GUERRA')
doc.text(40, 55, 'DURANGO, DURANGO. CEL: (618)164-74-74')

///////// FORMULARIO CLIENTE
doc.setDrawColor(0)
doc.setFillColor(255, 255, 255)

doc.roundedRect(10, 65, 190, 30, 3, 3, 'FD')
doc.setFontSize(12)
doc.text(15, 75, 'NOMBRE:')
doc.line(40, 78, 190, 78)
doc.text(15, 88, 'TEL. CASA:')
doc.line(40, 91, 100, 91)
doc.text(108, 88, 'CEL:')
doc.line(120, 91, 190, 91)

doc.text(15, 105, 'MARCA:')
doc.line(33, 107, 100, 107)
doc.text(15, 118, 'MODELO:')
doc.line(35, 120, 100, 120)

doc.setDrawColor(0)
doc.setFillColor(255, 255, 255)
doc.roundedRect(115, 98, 85, 30, 3, 3, 'FD')
doc.text(118, 105, 'ACCESORIOS:')
doc.setTextColor(95, 125, 250)
var accesorios = 'Hola que tal estos son mis accesor kdjfn knf ajf n aksd nas ask jadnk ak jfnakjfn dakios'
var splitTitle = doc.splitTextToSize(accesorios, 80);
doc.text(118, 113, splitTitle);

doc.setTextColor(0)
doc.text(15, 135, 'IMEI O (S/N):')
doc.line(43, 138, 200, 138)
doc.text(15, 148, 'CONDICIONES DE EQUIPO:')
doc.line(73, 150, 200, 150)


doc.setDrawColor(0)
doc.setFillColor(255, 255, 255)
doc.roundedRect(15, 156, 185, 25, 3, 3, 'FD')
doc.text(20, 163, 'FALLA(S):')
doc.setTextColor(95, 125, 250)
var accesorios = 'Hola que tal estas fallas de los dispositivos moviles se presentan en esta area y estaran encerradas con un cuadro con bordes redondos, en caso de tener una larga descripcion se posicionara de esta manera'
var fallas = doc.splitTextToSize(accesorios, 180);
doc.text(20, 169, fallas)

doc.setDrawColor(0)
doc.setFillColor(255, 255, 255)
doc.roundedRect(15, 183, 185, 20, 3, 3, 'FD')
doc.setTextColor(0)
doc.text(20, 190, 'REPARACIÓN Y OBSERVACIONES:')
doc.setTextColor(95, 125, 250)
var obs = 'Hola que tal estas fallas de los dispositivos moviles se presentan en esta area y estaran encerradas con un cuadro con bordes redondos'
var observacion = doc.splitTextToSize(obs, 180);
doc.text(20, 195, observacion);
doc.setTextColor(0)

doc.setDrawColor(0)
doc.setFillColor(255, 255, 255)
doc.roundedRect(15, 205, 95, 10, 3, 3, 'FD')
    //doc.setTextColor(0)
doc.text(20, 212, 'FECHA DE ENTREGA:')
doc.setTextColor(95, 125, 250)
doc.text(70, 212, ' dd -mm - yyyy')
doc.setDrawColor(0)
doc.setFillColor(255, 255, 255)
doc.roundedRect(135, 205, 65, 10, 3, 3, 'FD')
doc.setTextColor(0)
doc.text(140, 212, 'TOTAL:')
doc.setTextColor(95, 125, 250)
doc.setFontSize(15)
doc.text(158, 212, '$ 65123.21')


doc.setDrawColor(0)
doc.setFillColor(255, 255, 255)
doc.roundedRect(15, 218, 185, 38, 3, 3, 'FD')
doc.setTextColor(0)
doc.setFontSize(10)
doc.text(18, 223, '1.- SIN ORDEN DE SERVICIO NO SE ENTREGA EQUIPO.')
doc.text(18, 228, '2.- DESPUÉS DE 15 DIAS DE ENTREGADO SU EQUIPO PERDERA LA GARANTÍA.')
doc.text(18, 233, '3.- SOLO SE HARÁ GARANTÍA SOBRE LA MISMA FALLA DEL EQUIPO.')
doc.text(18, 238, '4.- DESPUÉS DE 45 DÍAS DE NO RECOGER SU EQUIPO NO NOS HACEMOS RESPONSABLES DE EL.')
doc.text(18, 243, '5.- AL EXTRAVIAR SU NOTA SOLO PODRA RECOGER EL EQUIPO EL TITULAR CON PREVIA ')
doc.text(18, 248, ' IDENTIFICACIÓN.')
doc.text(18, 253, '6.- EQUIPOS MOJADOS NO CUENTAN CON GARANTÍA.')
doc.text(25, 283, 'FIRMA DE RECIBIDO DE CONFORMIDAD')
doc.text(125, 283, 'FIRMA DE ENTREGA A SERVICIO')
doc.line(18, 278, 100, 278)
doc.line(115, 278, 195, 278)*/
export function fun(params) {
    alert("Bienvenido " + params);
}