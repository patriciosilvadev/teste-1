import { Injectable } from '@angular/core';
import { Ittipoimpostos } from 'src/app/interface/financeiro/configuracoes/ittipoimpostos';
import { iCategorias } from 'src/app/interface/financeiro/configuracoes/categorias';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../seguranca/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../global/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private itemsCollection: AngularFirestoreCollection<iCategorias>;
  private currentUser:any;
  private idCliente:string;

  constructor(
    private auth:AuthService,
    private DB:AngularFirestore,
    private global:UserService,
    private afa:AngularFireAuth

  ) { 

    this.idCliente = this.global.dadosLogado.idCliente;
    
    this.itemsCollection = DB.collection<iCategorias>(this.idCliente);
  }
  categoriaAdd(dados:any)
  {
    dados.createAt    = new Date().getTime()
    dados.usuarioUid  = this.afa.auth.currentUser.uid
    dados.usuarioNome = this.afa.auth.currentUser.displayName

    this.idCliente = this.global.dadosLogado.idCliente
    return this.DB.collection(this.idCliente).doc('dados').collection('financeiro').doc('configuracoes').collection('categorias').add(dados);
  }
  categoriaGetAll()
  {
    this.idCliente = this.global.dadosLogado.idCliente
    return this.DB.collection(this.idCliente).doc('dados').collection('financeiro').doc('configuracoes').collection('categorias',ref => ref.orderBy('dre','asc')).get()
  }
  add(categoria:iCategorias)
  {
    categoria.createAt = new Date().getTime();
    categoria.dreFiltro = 4;
    return this.itemsCollection.doc('dados').collection('financeiro').doc('configuracoes').collection('categorias').add(categoria);
  }

  update(categoriaId: string, categoria: iCategorias) {
    return this.itemsCollection.doc('dados').collection('financeiro').doc('configuracoes').collection('categorias').doc<iCategorias>(categoriaId).update(categoria);
  }

  getAll()
  {
    return this.itemsCollection.doc('dados').collection('financeiro').doc('configuracoes').collection('categorias').snapshotChanges().pipe(
      map(action => action.map(a=>{
        const data = a.payload.doc.data() as iCategorias;
        const id = a.payload.doc.id;
        return {id, ... data}
      }))
    );
  }

  get(categoriaId: string) {
    return this.itemsCollection.doc('dados').collection('financeiro').doc('configuracoes').collection('categorias').doc<iCategorias>(categoriaId).valueChanges();
  }

  delete(categoriaId: string) {
    return this.itemsCollection.doc('dados').collection('financeiro').doc('configuracoes').collection('categorias').doc(categoriaId).delete();
  }

}
