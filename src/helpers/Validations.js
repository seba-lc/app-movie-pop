export const validationLogin = (values) => {
  let errors = {};
  if (!values.user) {
    errors.user = 'El usuario es obligatorio';
  } else if (values.user.trim().split(" ").length > 1) {
    errors.user = 'No estan permitidos los espacios en el usuario';
  } else if (values.user.trim().length > 20) {
    errors.user = 'Datos Incorrectos';
  } else if (values.user.trim().length < 3) {
    errors.user = 'Datos Incorrectos';
  }

  if (!values.password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (values.password.length < 8) {
    errors.password = 'Datos Incorrectos'
  } else if (values.password.length > 30) {
    errors.password = 'Datos Incorrectos'
  }
  return errors;
};

export const validationRegister = (values) => {
  let errors = {};
  if (!values.naim) {
    errors.naim = 'El nombre es obligatorio'
  } else if (values.naim.trim().length > 30){
    errors.naim = 'El nombre no puede poseer más de 30 caracteres'
  } else if (values.naim.trim().length < 3){
    errors.naim = 'El nombre no puede poseer menos de 3 caracteres'
  }

  if (!values.user) {
    errors.user = 'El usuario es obligatorio';
  } else if (values.user.trim().split(" ").length > 1) {
    errors.user = 'No estan permitidos los espacios en el usuario';
  } else if (values.user.trim().length > 20) {
    errors.user = 'El usuario no debe poseer más de 20 caracteres';
  } else if (values.user.trim().length < 3) {
    errors.user = 'El usuario no debe poseer menos de 3 caracteres';
  }

  if (!values.pass1 || !values.pass2) {
    errors.password = 'La contraseña es obligatoria'
  } else if (values.pass1 !== values.pass2) {
    errors.password = 'Las contraseñas no coinciden'
  } else if (values.pass1.length < 8){
    errors.password = 'La contraseña debe tener como mínimo 8 caracteres'
  } else if (values.pass1.length > 30) {
    errors.password = 'La contraseña no debe poseer más de 30 caracteres'
  }

  return errors;
};
