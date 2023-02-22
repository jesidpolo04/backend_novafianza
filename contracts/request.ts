import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";

declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {
        getJWTPayload(): PayloadJWT
    }
  }