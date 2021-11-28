export interface IElectronAPI {
    send: any,
    on: any
  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }