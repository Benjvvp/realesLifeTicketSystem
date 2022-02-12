function getParentChannel(idInteraction){
  switch (idInteraction) {
    case 'duda':
      return '940091781360529416';
    case 'reporte':
      return '940091781360529417';
    case 'apelacion':
      return '940091781515730944';
    case 'donacion':
      return '940091781515730945';
    case 'otro':
      return '940091781515730946';
  }
}

module.exports = {getParentChannel};