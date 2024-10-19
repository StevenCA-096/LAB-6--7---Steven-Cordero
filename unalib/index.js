// modulo de ejemplo.
module.exports = {

  // logica que valida si un telefono esta correcto...
  is_valid_phone: function (phone) {

    // inicializacion lazy
    var isValid = false;
    // expresion regular copiada de StackOverflow
    var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;

    // validacion Regex
    try {
      isValid = re.test(phone);
    } catch (e) {
      console.log(e);
    } finally {
      return isValid;
    }
    // fin del try-catch block
  },

  is_valid_phone: function (phone) {

    // inicializacion lazy
    var isValid = false;
    // expresion regular copiada de StackOverflow
    var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;

    // validacion Regex
    try {
      isValid = re.test(phone);
    } catch (e) {
      console.log(e);
    } finally {
      return isValid;
    }
    // fin del try-catch block
  },

  validateMessage: function (msg) {

    var obj = JSON.parse(msg);


    if (this.is_valid_phone(obj.mensaje)) {
      console.log("Es un telefono!")
      obj.mensaje = this.getEmbeddedCode(obj.mensaje);
    }
    else {
      console.log("Es un texto!")
    }

    return JSON.stringify(obj);
  },

  sanitizeMessage: function (input) {
    return input.replace(/[<>"']/g, function (match) {
      switch (match) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return match;
      }
    });
  },
  is_valid_image_url: function (url) {
    // inicialización lazy
    var isValid = false;
    // expresión regular para validar URLs de imágenes
    var re = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp))$/i;

    // validación Regex
    try {
      isValid = re.test(url);
    } catch (e) {
      console.log(e);
    } finally {
      return isValid;
    }
  },
  is_valid_video_url: function (url) {
    // inicialización lazy
    var isValid = false;
    // expresión regular para validar URLs de videos
    var re = /^(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|(?:youtu\.be\/|embed\/))([a-zA-Z0-9_-]{11}))$/i;

    // validación Regex
    try {
      isValid = re.test(url);
    } catch (e) {
      console.log(e);
    } finally {
      return isValid;
    }
  },

  // fin del modulo
};