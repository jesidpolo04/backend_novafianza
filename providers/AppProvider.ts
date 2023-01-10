import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { IocContract } from '@adonisjs/fold'

export default class AppProvider {
  constructor (protected app: ApplicationContract, protected $container: IocContract) {
  }

  public register () {
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
