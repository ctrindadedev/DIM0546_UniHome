export class ApiError extends Error {
  constructor(status, data) {
    super(data?.message || `Erro na requisição (status ${status})`);
    this.status = status;
    this.data = data;
  }
}
