module.exports = {
    errorHandler: function(gulp, plugins, config, err, nonStopTheParty) {
        plugins.beepbeep(); //activa sonido
        console.error(plugins.chalk.red('\n' + err + '\n')); //muestra mensaje por consola
   		nonStopTheParty.emit("end"); //el emit previene que se cuelgue el proceso
    }
};
