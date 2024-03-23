class DatabaseDenuncias {
  _denuncias = {};

  _obterId() {
    return Date.now();
  }

  cadastrarDenuncia(denuncia) {
    const denunciaId = this._obterId;

    this._denuncias[denunciaId] = denuncia;
  }

  obterDenuncias() {
    return this._denuncias;
  }
}
