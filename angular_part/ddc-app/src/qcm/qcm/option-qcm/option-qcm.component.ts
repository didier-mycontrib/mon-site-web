import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter , flatMap , toArray} from 'rxjs/operators';
import { Qcm } from '../../common/data/qcm';
import { QcmService } from '../../common/service/qcm.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-option-qcm',
  templateUrl: './option-qcm.component.html',
  styleUrls: ['./option-qcm.component.scss']
})
export class OptionQcmComponent implements OnInit {

  @ViewChild('formOptions', {static: true}) 
  private formOptions : NgForm;

  //specifications for qcm options ("default" or ...)
  public specif : string = null;
  public mode : string ="training" ; //or "eval"

  constructor(public route: ActivatedRoute,
              private router: Router,
              public qcmService : QcmService) { 
    this.specif = route.snapshot.params['specif'];
    console.log("specif="+this.specif);
  }
  public filtre : string ="";
  public msgFiltrage = "";

  public listeQcm :Qcm[] = [];
  public selectedQcm :Qcm = null;

  public onListeQcmAvecFiltrage():void {
      //pré-version pas encore optimisée:
      this.qcmService.findQcmFromCriteria(this.mode)
      .pipe(
        flatMap(itemInTab=>itemInTab) ,
        filter((qcm: Qcm)=> qcm.title.toLowerCase().includes(this.filtre.toLowerCase()) ),
        toArray()
      ).subscribe(plans=>{this.listeQcm=plans; console.log(JSON.stringify(plans));});

  }

  public reinit(){
    this.listeQcm  = [];
    this.selectedQcm = null;
  }

  public onSelectQcm(q:Qcm){
    this.selectedQcm=q;
  }

  public isReadyForPerform() : boolean{
    if(this.selectedQcm==null) return false;
    if(this.mode=="eval" && !this.formOptions.form.valid)return false;
    return true;
  }


  public onEffectuerQcm():void {
    this.qcmService.qcmSession.mode=this.mode;
    this.qcmService.qcmSession.qcm=this.selectedQcm;
    let link = ['/ngr/qcm/perform']; 
    this.router.navigate( link );
  }


  ngOnInit() {
  }


}
