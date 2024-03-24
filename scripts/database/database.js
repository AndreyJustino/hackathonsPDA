class DatabaseDenuncias {
  _denuncias = {};

  /**
   * Construtor da classe
   * @description Rrecupera os dados salvos no storage. Executado sempre que é criada uma nova instancia da classe (ou ao importar uma instancia)
   */
  constructor() {
    this._denuncias = this._carregarDenunciasDoStorage(); //carrega os dados salvos do storage
  }

  /**
   * Função para gerar ID
   * @description Função que gera um ID único com base no timestamp atual e o retorna
   * @returns {number} ID único baseado no timestamp
   */
  _obterId() {
    return Date.now();
  }

  /**
   * Função que salva as denúncias no localStorage
   * @description Função que salva as denuncias com string no localStorage para persistencia de dados
   */
  _salvarDenunciasNoStorage() {
    const strDenuncias = JSON.stringify(this._denuncias);
    localStorage.setItem("denuncias", JSON.stringify(this._denuncias));
  }

  /**
   * Função que recupera as denúncias do localStorage
   * @description Função que recupea as denuncias e as retorna já como objeto
   * @returns {object} As denuncias salvas ou um objeto vazio caso nao exista dados salvos
   */
  _carregarDenunciasDoStorage() {
    const denuciasStorage = localStorage.getItem("denuncias");

    if (denuciasStorage) return JSON.parse(denuciasStorage);
    return {};
  }

  /**
   * Função para salvar denuncia
   * @description Função salva um objeto "denúncia" no database
   * @param {object} denuncia Denúncia que será salva
   */
  cadastrarDenuncia(denuncia) {
    const denunciaId = this._obterId();

    this._denuncias[denunciaId] = denuncia;

    localStorage.setItem("denuncias", JSON.stringify(this._denuncias));
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
   * Função para deletar denuncia
   * @description Função que deleta uma denuncia com base no id
   * @param {number} denunciaId Id da denúncia que será apagada
   */
  deletarDenuncia(denunciaId) {
    this._denuncias[denunciaId] = {};
    this._salvarDenunciasNoStorage();
  }
}

const databaseDenuncias = new DatabaseDenuncias();
export default databaseDenuncias;
