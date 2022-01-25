module.exports.findGEID = (data) =>{
  
    return{
        GEID: data.__EMPTY_4,
        SOEID:data.__EMPTY_5,
        ...getNombre(data.__EMPTY_3),
        Empresa: 'Stefanini',
   }
}


getNombre=(nombre)=>{
    if(nombre){
        const nombreArray = nombre.split(',');
        const apellidos = getNameAndLastName(nombreArray[0]);
        return { Apellido_Paterno: apellidos.Apellido_Paterno , Apellido_Materno:apellidos.Apellido_Materno, Nombre: capitalizeName(nombreArray[1])}
    }
    
}


const capitalizeName = (name) => {
    if(name){
        const nameArray = name.trim().split(' ')
        
        let finalNombre = ''
        if(nameArray.length > 1){
             for (const iterator of nameArray) {
                  finalNombre =finalNombre +' '+firstLetterUpperCase(iterator.toLowerCase().trim())
             }
        }else{
            finalNombre = firstLetterUpperCase(nameArray[0].toLowerCase().trim())
        }
    
        return finalNombre.trim()
    }
}

const getNameAndLastName = (str) => {
  var tokens = str.split(' ');
  // Arreglo donde se guardan las palabras del nombre.
  var names = [];
  // Palabras de apellidos y nombres compuestos
  const special_tokens = ['da','de','del','la', 'las','los','mac','mc','van','von','y','i','san','santa'];
  var prev = "";
  tokens.forEach(token =>{
    var _token = token.toLowerCase();
    if(special_tokens.includes(_token)){
      prev = `${prev}${firstLetterUpperCase(_token)} `;
    }else{
      names.push(`${prev}${firstLetterUpperCase(_token)}`);
      prev = "";
    }
  });

  var num_nombres = names.length;

  var nombres = "",
      apellidos = "";

  switch (num_nombres){
    case 0:
      nombres = '';
      break;
    case 1:
      nombres = names[0];
      break;
    case 2:
      nombres = names[0];
      apellidos = names[1];
      break;
    case 3:
      nombres = names[0];
      apellidos = `${names[1]} ${names[2]}`;
      break;
    case 4:
      nombres = `${names[0]} ${names[1]}`;
      apellidos = `${names[2]} ${names[3]}`;
      break;
    default:
      nombres = `${names[0]} ${names[1]}`;
      names.splice(0,2);
      apellidos = names.join(" ");
      break;
  }

  return ({
      Apellido_Paterno:nombres,
      Apellido_Materno:apellidos
  })
}

/* Funciones auxiliares */
const firstLetterUpperCase = (str) =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}