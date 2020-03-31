export interface Answer {
    txtNum : string ; // 'a' ou 'b' ou ... 
    text : string ; // texte d'une bonne ou mauvaise reponse
    ok? : boolean; //during edition (upload/post but not download/get)
  }

//real class for instanciation ,  with constructor .
export class AnswerObject implements Answer {
  constructor(
       public txtNum : string  = null,
       public text : string =null){
       }
}

export interface Question {
    num: number ; // 1 or .. 
    question: string ; // texte de la question 
    image : string; // null ou chemin image  
    nbGoodAnswers : number; // 1 (exclusif) ou plus 
    answers : Answer[];//tableau des réponses (à choisir)
}

//real class for instanciation ,  with constructor .
export class QuestionObject implements Question {
  constructor(
       public num: number  = null,
       public question: string =null,
       public image: string  = null,
       public nbGoodAnswers: number =null,
       public answers : Answer[] = []){
       }
}

export interface Solution {
    num : number ; // numero d'une question ( 1 ou plus) 
    goodAnswerNums : string[]; // liste des bonnes réponses ['c'] ou ['a' , b']
}

//real class for instanciation ,  with constructor .
export class SolutionObject implements Solution {
  constructor(
       public num : number  = null,
       public goodAnswerNums : string[] =[]){
       }
}

export interface Qcm {
    _id : string ;
    title : string;
    purpose? : string; //"training" or "eval" or null/undefined (filter)
    keywords : string[]; // categorie ou ...
    visibility : string; //"public" or ...
    ownerId : string; // ...
    authorId : string; // null or ...
    nbQuestions : number;
    questions : Question[];
    solutions : Solution[];
    choices? : ResponseChoices[]; //during session only (not in QcmObject)
}

//real class for instanciation ,  with constructor .
export class QcmObject implements Qcm {
  constructor(
       public  _id :string = null , 
       public title : string  = null,
       public keywords : string[] =[],
       public visibility: string  = null,
       public ownerId : string = null,
       public authorId : string = null,
       public nbQuestions: number =0,
       public questions : Question[] = [],
       public solutions : Solution[] = [],
       public purpose="training"){
       }
}

export interface QcmResults{
  _id : string ;  
  performer : QcmPerformer;
  qcmId : string;
  choices : ResponseChoices[];
  globalResults : QcmGlobalResults;
}

export class QcmResultsObject implements QcmResults {
  constructor(
    public _id : string =null, 
    public performer : QcmPerformer=null,
    public qcmId : string=null,
    public choices : ResponseChoices[]=[],
    public globalResults : QcmGlobalResults=null){
  }
} 

export interface ResponseChoices {
  num : number ; // numero d'une question ( 1 ou plus) 
  selectedAnswerNums : string[]; // liste des réponses sélectionnée ['c'] ou ['a' , b']
}

export class ResponseChoicesObject implements ResponseChoices{
  constructor(public num :number = null,
              public selectedAnswerNums : string[]=[]){}
}

export interface QcmPerformer{
  fullName : string;
  email:string;
  org:string;
}
export class QcmPerformerObject implements QcmPerformer{
  constructor(public fullName : string = null,
              public email:string=null,
              public org:string){}
}

export interface QcmGlobalResults{
    percentageScore : number;
    nbGoodResponses : number;
}

export class QcmGlobalResultsObject implements QcmGlobalResults {
  constructor(public percentageScore : number = null,
              public nbGoodResponses : number =0){}
}

/*
{
_id:1,
title : 'qcm a',
keywords : 'java or js or ...',
visibility : 'public' ,
owner-id : '?com.xx.yy' ou bien 'didier@d-defrance.fr'
author-id : null or 'jean.Bon?com.xx.yy',
nbQuestions : 2 ,
questions : [
  { num: 1 , question: 'quel est le plus grand ?' , image : null , nbGoodAnswers : 1,
    answers : [
	  { txtNum : 'a' , text : '12' }, { txtNum : 'b' , text : '12.01' }, 
      { txtNum : 'c' , text : '12.1' }, { txtNum : 'd' , text : '12.001' }, 	  
    ]
  },
   { num: 2 , question: 'qui est bleu ?' , image : null , nbGoodAnswers : 2,
    answers : [
	  { txtNum : 'a' , text : 'ciel' }, { txtNum : 'b' , text : 'arbre' }, 
      { txtNum : 'c' , text : 'stroumpf' }, { txtNum : 'd' , text : 'soleil' }, 	  
    ]
  }
],
solutions : [ 
  { num : 1 , goodAnswerNums : ['c'] } , { num : 2 , goodAnswerNums : ['a','c'] } 
]
}
*/