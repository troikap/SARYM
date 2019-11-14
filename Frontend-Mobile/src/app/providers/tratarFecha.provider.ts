export class TratarFechaProvider {

    public traerDate( fecha): String {
        let date = new Date(fecha);
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yy = date.getFullYear();
        let dia;
        let mes;
        if ((dd >= 0) && (dd < 10)) {  
            dia = "0" + String(dd);
        } else {
            dia = dd;
        }
        if ((mm >= 0) && (mm < 10)) {  
            mes = "0" + String(mm);
        } else {
            mes = mm;
        }
        let dateFormateada = `${yy}-${mes}-${dia}`;
        return dateFormateada;
    }

    public traerTime( fecha): String {
        let date = new Date(fecha);
        let horas = date.getHours();
        let minutes = date.getMinutes();
        let tratarMinuto;
        let tratarHora;
        if ((minutes >= 0) && (minutes < 10)) {  
            tratarMinuto = "0" + String(minutes);
        } else {
            tratarMinuto = minutes;
        }
        if ((horas >= 0) && (horas < 10)) {  
            tratarHora = "0" + String(horas);
        } else {
            tratarHora = horas;
        }
        let timeFormateado = `${tratarHora}:${tratarMinuto}`;
        return timeFormateado;
    }

    // si viene "15:30" lo deja pasar si viene como Date lo trata
    public verificarTime( time ): String {
        let tiempo;
        if ( time.length == 5) {
            tiempo = time
          } else {
            tiempo = this.traerTime( time );
          }
        return tiempo;
    }
}
