import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase: string = 'https://proyecto-final-pysw-backend.vercel.app';
  constructor(private _http: HttpClient) {}

  // Crear Usuario
  public createUser(usuario:Usuario):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(usuario);
    return this._http.post(this.urlBase + "/api/usuario/", body, httpOptions);
  }


  public updateUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(usuario);
    return this._http.put(this.urlBase + "/api/usuario/" + usuario._id, body, httpOptions);
  }

  public eliminarUsuario(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase + "/api/usuario/" + id, httpOptions);
  }

  public getUsuarios():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
    }
    return this._http.get(this.urlBase + "/api/usuario/", httpOptions);
  }

  // Obtener alumno segun el ID

  public getUsuarioById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "/api/usuario/detalle/" + id, httpOptions);
  }


  //crear usuario y alumno
  public createAlumnoYUsuario(alumno: any): Observable<any> {
    console.log("DATOS EN EL SERVICE:", alumno);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(alumno);
    return this._http.post(this.urlBase + "/api/usuario/create", body, httpOptions);
  }

  public ingresarUser = (user: Usuario) => {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    const nombreUsuario = user.nombreUsuario
    const password = user.password
    let body = {
      nombreUsuario, password
    }
    return this._http.post(this.urlBase + "/api/usuario/login", body);
  };

  //cuando resetea o se loguea la pagina obtiene los datos del usuario que se legeuo yo lo hice para alumnos
  //en el edpoint del back api/usuario/getuser esta el codigo pero solo para obtener la info del alumno
  //se puede hacer con los demas roles
  public getData = (token: string) =>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${token}`
      }),

      params: new HttpParams()
    };
    console.log("TOKEN EN GET DATA SERVICE: ", token)
    return this._http.get(this.urlBase + "/api/usuario/getUser", httpOptions);
  }

  //cuando resetea la pagina se llama a ese evento para verificar el token y dependiendo del token redirige ala pagina segun su rol
  //se usa en alumno perfil. se puede usar para los diferenes roles
  public userOnly = (token: string) =>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${token}`
      }),
      params: new HttpParams()
    };
    return this._http.get(this.urlBase + "/api/usuario/verify", httpOptions);
  }
}
