import { Component, OnInit } from '@angular/core';
import { QcmService } from 'src/qcm/common/service/qcm.service';
import { Router } from '@angular/router';
import { QcmSession } from 'src/qcm/common/session/qcm-session';
import { Question, ResponseChoices, Qcm } from 'src/qcm/common/data/qcm';
import { PostChoicesResponse } from 'src/qcm/common/data/postChoicesData';

@Component({
  selector: 'app-perform-qcm',
  templateUrl: './perform-qcm.component.html',
  styleUrls: ['./perform-qcm.component.scss']
})
export class PerformQcmComponent implements OnInit {

  public selections : boolean[]=[];
  public qcmSession : QcmSession;
  public currentQuestion : Question ;
  public numQuestion : number;
  public currentRandomIndice : number;
  public nbQuestions: number;
  public ramdomDeltaIndice :number = 0;

  constructor(public qcmService : QcmService,
              private router: Router) { 
                this.initBeginingBeforeQcmLoading();
                this.loadQcmQuestions();
              }

  loadQcmQuestions(){
    //NB: after qcm choice , this.qcmService.qcmSession.qcm
    //contains no details (no questions)
    let choosedQcmId = this.qcmService.qcmSession.qcm._id;
    this.qcmService.getEntityObjectById(choosedQcmId)
         .subscribe(
           (qcm:Qcm)=>{this.qcmService.qcmSession.qcm=qcm;
                       this.initBeginingAfterQcmLoading();},
           (error)=>{console.log(error);}
         );
  }

  initBeginingBeforeQcmLoading(){
    this.qcmSession = this.qcmService.qcmSession;
    this.numQuestion=1;
  }
  initBeginingAfterQcmLoading(){
    this.nbQuestions = this.qcmSession.qcm.nbQuestions;
    this.ramdomDeltaIndice = Math.floor(Math.random() *  this.nbQuestions);
    //console.log("ramdomDeltaIndice="+this.ramdomDeltaIndice);
    this.qcmSession.qcm.choices = [];
    this.initCurrentQuestion();
  }

  indiceWithRandomDelta(normalIndice : number):number{
    let new_indice = normalIndice + this.ramdomDeltaIndice;
    if(new_indice >= this.nbQuestions){
      new_indice -= this.nbQuestions;
    }
    //console.log("new_indice="+new_indice);
    return new_indice;
  }

  initCurrentQuestion(){
    if(this.numQuestion <= this.qcmSession.qcm.nbQuestions){
      this.qcmSession.currentQuestionNum=this.numQuestion;
      this.currentRandomIndice = this.indiceWithRandomDelta(this.numQuestion-1);
      this.currentQuestion=this.qcmSession.qcm.questions[this.currentRandomIndice/*this.numQuestion-1*/];
      this.selections=[];
      for(let a of this.currentQuestion.answers){
        this.selections[a.txtNum]=false;
      }
    }
  }         
  
  public onNext() : void {
     this.onValiderCurrentQuestion();//valider(enregister) choix question courante
     if(this.numQuestion <this.nbQuestions){
      this.numQuestion++;
      this.initCurrentQuestion();
     }
     else{
       this.qcmSession.qcm.choices = this.qcmSession.qcm.choices.sort((ca, cb) => ca.num < cb.num ? -1 : 1);
       this.qcmService.postQcmChoices(this.qcmSession.qcm._id,
                                      this.qcmSession.qcm.choices, 
                                      this.qcmSession.performer,
                                      this.qcmSession.mode)
       .subscribe(
         (resp:PostChoicesResponse)=>{ 
                  console.log("resultsId="+resp.qcmResultsId);
                  this.qcmService.qcmSession.qcm=resp.qcm;//with .solutions 
                  this.qcmSession.results=resp.globalResults;
                  let link = ['/ngr/qcm/results']; 
                  this.router.navigate( link );
                  },
         (error)=>{console.log(error);}
       );
      
     }
  }

  public onValiderCurrentQuestion(): void {
    let responseChoices = new  ResponseChoices();
    responseChoices.num=this.currentRandomIndice+1;//this.numQuestion;
    responseChoices.selectedAnswerNums=[];
    for(let a of this.currentQuestion.answers){
      //console.log(a.txtNum + ' ' + this.selections[a.txtNum]);
      if(this.selections[a.txtNum]){
        responseChoices.selectedAnswerNums.push(a.txtNum)
      }
    }
    this.qcmSession.qcm.choices.push(responseChoices);
  }


  ngOnInit() {
  }

}
