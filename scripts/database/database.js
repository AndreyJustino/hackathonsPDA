class ComplaintsDatabase {
  #complaints;

  /**
   * Construtor da classe
   * @description Rrecupera os dados salvos no storage. Executado sempre que é criada uma nova instancia da classe (ou ao importar uma instancia)
   */
  constructor() {
    this.#complaints = this.#loadStorageComplaints(); //carrega os dados salvos do storage
  }

  /**
   * Função para gerar ID
   * @description Função que gera um ID único com base no timestamp atual e o retorna
   * @returns {number} ID único baseado no timestamp
   */
  #getUniqueId() {
    return Date.now();
  }

  /**
   * Função que salva as denúncias no localStorage
   * @description Função que salva as denuncias com string no localStorage para persistencia de dados
   */
  #saveComplaintsInStorage() {
    const strComplaints = JSON.stringify(this.#complaints);
    localStorage.setItem("complaints", strComplaints);
  }

  /**
   * Função que recupera as denúncias do localStorage
   * @description Função que recupea as denuncias e as retorna já como objeto
   * @returns {object} As denuncias salvas ou um objeto vazio caso nao exista dados salvos
   */
  #loadStorageComplaints() {
    const storageComplaints = localStorage.getItem("complaints");

    if (storageComplaints) return JSON.parse(storageComplaints);
    return {};
  }

  /**
   * Função para salvar denuncia
   * @description Função salva um objeto "denúncia" no database
   * @param {object} complaint Denúncia que será salva
   */
  registerComplaint(complaint) {
    const complaintId = this.#getUniqueId();

    this.#complaints[complaintId] = complaint;

    localStorage.setItem("complaints", JSON.stringify(this.#complaints));
  }

  /**
   * Função para obter denuncias
   * @description Função que retorna todas as denúncias salvas
   * @returns {object} Lista de denúncias
   */
  getComplaints() {
    return this.#complaints;
  }

  /**
   * Função para deletar denuncia
   * @description Função que deleta uma denuncia com base no id
   * @param {number} complaintId Id da denúncia que será apagada
   */
  deleteComplaint(complaintId) {
    this.#complaints[complaintId] = {};
    this.#saveComplaintsInStorage();
  }
}

const complaintsDatabase = new ComplaintsDatabase();
export default complaintsDatabase;
