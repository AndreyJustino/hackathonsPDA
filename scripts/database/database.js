class DatabaseDenuncias {
  _denuncias = {};

  /**
   * Função para gerar ID
   * @description Função que gera um ID único com base no timestamp atual e o retorna
   * @returns {number} ID único baseado no timestamp
   */
  _obterId() {
    return Date.now();
  }

  /**
   * Função para salvar denuncia
   * @description Função salva um objeto "denúncia" no database
   * @param {object} denuncia Denúncia que será salva
   */
  cadastrarDenuncia(denuncia) {
    const denunciaId = this._obterId();

    this._denuncias[denunciaId] = denuncia;
  }

  /**
   * Função para obter denuncias
   * @description Função que retorna todas as denúncias salvas
   * @returns {object} Lista de denúncias
   */
  obterDenuncias() {
    return this._denuncias;
  }

  /**
   * Função para obter denuncias
   * @description Função que retorna todas as denúncias salvas
   * @param {number} denunciaId Id da denúncia que será apagada
   */
  deletarDenuncia(denunciaId) {
    this._denuncias[denunciaId] = {};
  }
}

const databaseDenuncias = new DatabaseDenuncias();
export default databaseDenuncias;
