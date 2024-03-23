class DatabaseDenuncias {
  _denuncias = {};

  _obterId() {
    return Date.now();
  }

  cadastrarDenuncia(denuncia) {
    const denunciaId = this._obterId();

    this._denuncias[denunciaId] = denuncia;
  }

  obterDenuncias() {
    console.log(this._denuncias);
    return this._denuncias;
  }
}

const databaseDenuncias = new DatabaseDenuncias();
export default databaseDenuncias;
