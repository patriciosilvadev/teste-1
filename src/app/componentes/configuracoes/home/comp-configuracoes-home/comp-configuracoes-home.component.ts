import { Component, OnInit } from '@angular/core';
import { ProvEmitterEventService } from 'src/app/provider/prov-emitter-event.service';

@Component({
  selector: 'app-comp-configuracoes-home',
  templateUrl: './comp-configuracoes-home.component.html',
  styleUrls: ['./comp-configuracoes-home.component.scss'],
})
export class CompConfiguracoesHomeComponent implements OnInit {

  constructor(
    private eventEmitterService: ProvEmitterEventService
  ) { }

  ngOnInit() {}

  functionExecute(functionName:string,params:any) {
    const param = {
      function:functionName,
      data:params
    }
    this.eventEmitterService.onFirstComponentButtonClick(param); 
  }
  
}
